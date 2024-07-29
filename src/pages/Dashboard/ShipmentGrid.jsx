import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  CircularProgress,
  Chip,
  Stack,
  IconButton,
  TableSortLabel,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
import { GetCustomDateString, getLoggedUserId } from '../../utils/Utils';
import { getShipmentStatusStyle } from './dashboardApi';

function ShipmentGrid({
  data,
  page,
  rowsPerPage,
  totalRows,
  onChangePage,
  onChangeRowsPerPage,
  handleModalType,
  handleSelectedShipment,
  sortData,
  handleSortData,
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
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={Boolean(sortData.createdAt)}
                      direction={sortData.createdAt === -1 ? 'desc' : 'asc'}
                      onClick={() => {
                        handleSortData({
                          createdAt: sortData.createdAt === -1 ? 1 : -1,
                        });
                      }}
                    >
                      Created at
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Updated at</TableCell>
                  <TableCell>Weight</TableCell>
                  <TableCell>Created by</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Status</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.length > 0 ? (
                  data.map((shipment) => (
                    <TableRow key={shipment._id}>
                      <TableCell>{shipment._id}</TableCell>
                      <TableCell>{shipment.source.location}</TableCell>
                      <TableCell>{shipment.destination.location}</TableCell>
                      <TableCell>
                        {GetCustomDateString(shipment.createdAt)}
                      </TableCell>
                      <TableCell>
                        {GetCustomDateString(shipment.updatedAt)}
                      </TableCell>
                      <TableCell>{shipment.weight}</TableCell>
                      <TableCell>{shipment.createdBy.name}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Chip
                          label={shipment.status}
                          variant="outlined"
                          sx={getShipmentStatusStyle(shipment.status)}
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Stack direction="row">
                          <IconButton
                            onClick={() => handleEdit(shipment)}
                            disabled={
                              !(getLoggedUserId() === shipment.createdBy._id)
                            }
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleView(shipment._id)}>
                            <RemoveRedEyeIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} sx={{ textAlign: 'center' }}>
                      No shipments found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
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

export default ShipmentGrid;
