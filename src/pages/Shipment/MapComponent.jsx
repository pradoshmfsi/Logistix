import { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

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
          origin: [origin.latitude, origin.longitude],
          destination: [destination.latitude, destination.longitude],
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
        center={[origin.latitude, origin.longitude]}
        zoom={10}
        ref={mapRef}
        style={{ height: '40vh', width: '100%' }}
      >
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[origin.latitude, origin.longitude]}>
          <Popup>Origin: {origin.location}</Popup>
        </Marker>
        <Marker position={[destination.latitude, destination.longitude]}>
          <Popup>Destination: {destination.location}</Popup>
        </Marker>
        {route.length > 0 && <Polyline positions={route} color="blue" />}
      </MapContainer>
    </>
  );
}

export default MapComponent;
