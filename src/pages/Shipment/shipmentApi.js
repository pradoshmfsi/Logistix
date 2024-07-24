import shipmentAxios from '../../api/shipmentAxios';
import { getLoggedUserId } from '../../utils/Utils';

/**
Fetches the shipment details based on the shipmentId provided.
*/
export const getShipmentDetails = async (shipmentId) => {
  const userID = getLoggedUserId();
  const options = {
    method: 'GET',
    url: `/shipmentId=${shipmentId}&userId=${userID}`,
  };
  const response = await shipmentAxios(options);
  return response.data.shipment;
};

/**
Fetches the route to render on the map based on origin and destination coords.
*/
export const getShipmentRoute = async (data) => {
  const options = {
    method: 'POST',
    url: '/route',
    data,
  };
  const response = await shipmentAxios(options);
  return response.data.route;
};
