import { useEffect, useState } from 'react';
import {
  Alert,
  Badge,
  Box,
  Button,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useTheme } from '@mui/material/styles';
import ShipmentGrid from './ShipmentGrid';
import ShipmentForm from './ShipmentForm';
import CustomSnackbar from '../../components/CustomSnackbar';
import FiltersForm from './FiltersForm';
import CustomAccord from './CustomAccord';
import CircularLoader from '../../components/CircularLoader';
import { getLocations, getShipments } from './dashboardApi';

function Dashboard() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [sortData, setSortData] = useState({ createdAt: -1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalType, setModalType] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    source: null,
    destination: null,
    createdFrom: null,
    createdTo: null,
    createdBy: null,
  });

  const [flag, setFlag] = useState(true);
  const [snackbar, setSnackbar] = useState('');

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('md'));

  const fetchLocations = async () => {
    try {
      const response = await getLocations();
      setLocations(response);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleSelectedShipment = (shipment) => {
    setSelectedShipment(shipment);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleModalType = (type) => {
    setModalType(type);
  };

  const handleSortData = (obj) => {
    setSortData(obj);
  };

  const resetFilters = () => {
    setFilters({
      status: '',
      source: null,
      destination: null,
      createdFrom: null,
      createdTo: null,
      createdBy: null,
    });
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
      <Box sx={{ textAlign: 'right', m: 2 }}>
        <IconButton color="primary" onClick={() => setFilterOpen(true)}>
          <Badge
            color="error"
            variant="dot"
            invisible={!Object.values(filters).some((value) => Boolean(value))}
          >
            <TuneIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={resetFilters} sx={{ ml: 1 }}>
          <RestartAltIcon />
        </IconButton>

        <Button
          variant="contained"
          onClick={() => handleModalType('add')}
          sx={{ ml: 2 }}
        >
          Add Shipment
        </Button>
      </Box>
      {loading && <CircularLoader />}
      {!isXs ? (
        <ShipmentGrid
          data={data}
          page={page}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          handleModalType={handleModalType}
          handleSelectedShipment={handleSelectedShipment}
          sortData={sortData}
          handleSortData={handleSortData}
        />
      ) : (
        <CustomAccord
          data={data}
          page={page}
          rowsPerPage={rowsPerPage}
          totalRows={totalRows}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          handleModalType={handleModalType}
          handleSelectedShipment={handleSelectedShipment}
          sortData={sortData}
          handleSortData={handleSortData}
        />
      )}
      <ShipmentForm
        type={modalType}
        handleType={handleModalType}
        locations={locations}
        shipment={selectedShipment}
        setSnackbar={setSnackbar}
        key={modalType}
        setFlag={setFlag}
      />
      <FiltersForm
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        locations={locations}
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
      />
      <CustomSnackbar
        message={{ type: 'success', message: snackbar }}
        open={Boolean(snackbar)}
        setOpen={setSnackbar}
      />
    </>
  );
}

export default Dashboard;
