import { useEffect, useState } from 'react';
import { Alert, Badge, Box, Button, IconButton } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ShipmentGrid from './ShipmentGrid';
import ShipmentForm from './ShipmentForm';
import CustomSnackbar from '../../components/CustomSnackbar';
import FiltersForm from './FiltersForm';
import ShipmentAccordion from './ShipmentAccordion';
import CircularLoader from '../../components/CircularLoader';
import { getLocations, getShipments } from './dashboardApi';
import { useDashboardContext } from '../../store/DashboardContext';
import { MARGIN } from '../../constants/styles';

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locations, setLocations] = useState([]);
  const [data, setData] = useState([]);

  const dashboardContext = useDashboardContext();

  const {
    page,
    rowsPerPage,
    sortData,
    filters,
    flag,
    isXs,
    setPage,
    setTotalRows,
  } = dashboardContext;

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const response = await getLocations();
      setLocations(response);
      setLoading(false);
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const payload = {
        filters,
        pagination: {
          page: page + 1,
          limit: rowsPerPage,
        },
        sortData,
      };
      const response = await getShipments(payload);
      setData(response.shipments);
      setTotalRows(response.summary.totalcount);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, sortData, filters, flag]);

  useEffect(() => {
    fetchLocations();
  }, []);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
  return (
    <>
      <Box sx={{ textAlign: 'right', m: MARGIN.LARGE }}>
        <IconButton
          color="primary"
          onClick={() => dashboardContext.setFilterOpen(true)}
        >
          <Badge
            color="error"
            variant="dot"
            invisible={!Object.values(filters).some((value) => Boolean(value))}
          >
            <TuneIcon />
          </Badge>
        </IconButton>
        <IconButton
          onClick={dashboardContext.resetFilters}
          sx={{ ml: MARGIN.SMALL }}
        >
          <RestartAltIcon />
        </IconButton>

        <Button
          variant="contained"
          onClick={() => dashboardContext.setModalType('add')}
          sx={{ ml: MARGIN.LARGE }}
        >
          Add Shipment
        </Button>
      </Box>
      {loading && <CircularLoader />}
      {!isXs ? <ShipmentGrid data={data} /> : <ShipmentAccordion data={data} />}
      <ShipmentForm key={dashboardContext.modalType} locations={locations} />
      <FiltersForm locations={locations} />
      <CustomSnackbar
        message={{ type: 'success', message: dashboardContext.snackbar }}
        open={Boolean(dashboardContext.snackbar)}
        setOpen={dashboardContext.setSnackbar}
      />
    </>
  );
}

export default Dashboard;
