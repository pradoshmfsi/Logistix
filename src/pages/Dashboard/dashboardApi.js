import shipmentAxios from '../../api/shipmentAxios';
import userAxios from '../../api/userAxios';
import { getLoggedUserId } from '../../utils/Utils';

/**
Fetches the shipments based on the data provided on page, filters etc.
*/
export const getShipments = async (data) => {
  const userID = getLoggedUserId();
  const url = `/userId=${userID}`;
  const options = {
    method: 'POST',
    url,
    data,
  };
  const response = await shipmentAxios(options);
  return response.data;
};

/**
Adds a shipment to the database
*/
export const addShipments = async (data) => {
  const url = '/add';
  const options = {
    method: 'POST',
    url,
    data,
  };
  const response = await shipmentAxios(options);
  return response.data.summary.message;
};

/**
Udpates the shipments based on any change in the form.
*/
export const updateShipments = async (shipmentId, data) => {
  const url = `/update/${shipmentId}`;
  const options = {
    method: 'PUT',
    url,
    data,
  };
  const response = await shipmentAxios(options);
  return response.data.message;
};

/**
Fetches all the locations.
*/
export const getLocations = async () => {
  const url = 'locations';
  const options = {
    method: 'GET',
    url,
  };
  const response = await userAxios(options);
  return response.data.locations;
};

/**
  Gets the style object for the chip component based on the status.
  */
export const getShipmentStatusStyle = (status) => {
  let color;
  if (status === 'Delayed') {
    color = 'red';
  } else if (status === 'Delivered') {
    color = 'green';
  } else {
    color = 'orange';
  }
  return { color, borderColor: color };
};
