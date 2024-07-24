import { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { Alert } from '@mui/material';
import { getShipmentRoute } from './shipmentApi';

function MapComponent({ origin, destination }) {
  const mapRef = useRef(null);
  const [route, setRoute] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getRoute = async () => {
      try {
        const data = {
          origin,
          destination,
        };
        const response = await getShipmentRoute(data);
        setRoute(response);
      } catch (error) {
        setError('Error fetching route details');
      }
    };
    getRoute();
  }, [origin, destination]);

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <MapContainer
        center={origin}
        zoom={10}
        ref={mapRef}
        style={{ height: '40vh', width: '100%' }}
      >
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={origin}>
          <Popup>Origin: Bhubaneswar</Popup>
        </Marker>
        <Marker position={destination}>
          <Popup>Destination: Cuttack</Popup>
        </Marker>
        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
    </>
  );
}

export default MapComponent;
