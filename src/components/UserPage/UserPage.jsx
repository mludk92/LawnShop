import React, { useEffect } from 'react';
import './UserPage.css';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import mapStyles from './mapStyles';
const libraries = ['places'];

function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const addresses = useSelector((store) => store.address);
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: ,
    libraries,
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_ADDRESS' });
  }, [dispatch]);

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({ lat: 40.748817, lng: -73.985428 });

  useEffect(() => {
    if (isLoaded && addresses.length > 0) {
      console.log(addresses, 'address array')
      setMarkers(addresses);
      const firstMarkerWithAddress = addresses.find((marker) => marker.useraddress);
      if (firstMarkerWithAddress) {
        setCenter({ lat: Number(firstMarkerWithAddress.lat), lng: Number(firstMarkerWithAddress.lng) });
      }
    }
  }, [isLoaded, addresses]);

  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <div className="container">
      <h1>Active Sales</h1>
      <div className="MapContainer">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={center}
          options={options}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => setSelectedMarker(marker)}
              icon={{
                url: marker.lat == center.lat ?  
                '/images/house.png'
                : '/images/ls.png',
                scaledSize: marker.lat == center.lat ? new window.google.maps.Size(50, 50) 
                :new window.google.maps.Size(60, 60),
              }}
            />
          ))}
          {selectedMarker && (
            <InfoWindow 
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="popup" >
                <h2>{selectedMarker.street}, {selectedMarker.city}</h2>
                <p>Sales Dates: {selectedMarker.fromdate.slice(0,10)} - {selectedMarker.todate.slice(0,10)}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

export default UserPage;
