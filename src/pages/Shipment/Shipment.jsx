import { useParams } from 'react-router-dom';
import {
  Alert,
  Box,
  Chip,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import MapComponent from './MapComponent';
import CircularLoader from '../../components/CircularLoader';
import { getShipmentDetails } from './shipmentApi';
import CustomGridCell from '../Dashboard/CustomGridCell';
import { StyledBox, StyledBreadcrumbs } from './styledComponents';
import { GetCustomDateString } from '../../utils/Utils';
import { getShipmentStatusStyle } from '../Dashboard/dashboardApi';

function Shipment() {
  const { shipmentId } = useParams();
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShipmentDetails = async () => {
      try {
        const response = await getShipmentDetails(shipmentId);
        setShipment(response);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    fetchShipmentDetails();
  }, [shipmentId]);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return shipment ? (
    <StyledBox>
      <StyledBreadcrumbs>
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
        <Typography sx={{ fontSize: '0.8rem' }}>
          Shipment - {shipment._id}
        </Typography>
      </StyledBreadcrumbs>
      <MapComponent
        origin={shipment.source}
        destination={shipment.destination}
      />
      <Stack direction="row" alignItems="center">
        <Typography variant="h6" m={2}>
          {shipment.source.location} - {shipment.destination.location}
        </Typography>
        <Chip
          label={shipment.status}
          variant="outlined"
          sx={getShipmentStatusStyle(shipment.status)}
        />
      </Stack>

      <Divider />
      <Stack direction={{ xs: 'column', sm: 'row' }}>
        <Box m={1} sx={{ width: '50%', minWidth: '300px' }}>
          <CustomGridCell title="ShipmentID" value={shipment._id} />
          <CustomGridCell title="Weight" value={shipment.weight} />
          <CustomGridCell title="Created By" value={shipment.createdBy.name} />
          <CustomGridCell
            title="Created At"
            value={GetCustomDateString(shipment.createdAt)}
          />
          <CustomGridCell
            title="Updated at"
            value={GetCustomDateString(shipment.updatedAt)}
          />
          <CustomGridCell title="Source" value={shipment.source.location} />
          <CustomGridCell
            title="Destination"
            value={shipment.destination.location}
          />
        </Box>
        <Box m={1} sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" color="textSecondary">
            Description
          </Typography>
          {shipment.description ? (
            <Typography variant="caption">{shipment.description}</Typography>
          ) : (
            <Typography color="textSecondary">
              <em>Not available</em>
            </Typography>
          )}
        </Box>
      </Stack>
    </StyledBox>
  ) : (
    <CircularLoader />
  );
}

export default Shipment;
