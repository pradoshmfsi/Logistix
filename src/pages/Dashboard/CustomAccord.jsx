import {
  TablePagination,
  Paper,
  CircularProgress,
  Chip,
  Stack,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Button,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import CustomGridCell from './CustomGridCell';
import { GetCustomDateString, getLoggedUserId } from '../../utils/Utils';
import { getShipmentStatusStyle } from './dashboardApi';

function CustomAccord({
  data,
  page,
  rowsPerPage,
  totalRows,
  onChangePage,
  onChangeRowsPerPage,
  handleModalType,
  handleSelectedShipment,
}) {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/shipment/${id}`);
  };

  const handleEdit = (shipment) => {
    handleModalType('edit');
    handleSelectedShipment(shipment);
  };

  return (
    <Paper sx={{ m: 2 }} elevation={4}>
      {!data ? (
        <CircularProgress />
      ) : (
        <>
          <Box>
            {data.length > 0 ? (
              data.map((shipment) => (
                <Accordion key={shipment._id} sx={{ fontFamily: 'Roboto' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ alignItems: 'center' }}
                    >
                      <Typography>
                        {`${shipment.source.location} - ${shipment.destination.location}`}{' '}
                      </Typography>
                      <Chip
                        label={shipment.status}
                        variant="outlined"
                        sx={getShipmentStatusStyle(shipment.status)}
                      />
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <CustomGridCell title="ShipmentID" value={shipment._id} />
                    <CustomGridCell title="Weight" value={shipment.weight} />
                    <CustomGridCell
                      title="Created By"
                      value={shipment.createdBy.name}
                    />
                    <CustomGridCell
                      title="Created At"
                      value={GetCustomDateString(shipment.createdAt)}
                    />
                    <CustomGridCell
                      title="Updated at"
                      value={GetCustomDateString(shipment.updatedAt)}
                    />
                  </AccordionDetails>
                  <AccordionActions>
                    <Button
                      onClick={() => handleEdit(shipment)}
                      disabled={!(getLoggedUserId() === shipment.createdBy._id)}
                    >
                      Edit
                    </Button>
                    <Button onClick={() => handleView(shipment._id)}>
                      View
                    </Button>
                  </AccordionActions>
                </Accordion>
              ))
            ) : (
              <Typography sx={{ p: 2, textAlign: 'center' }}>
                No shipments found
              </Typography>
            )}
          </Box>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalRows}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  );
}

export default CustomAccord;
