import React, { useEffect } from 'react';
import "./UserPage.css"
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

import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'

function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const addresses = useSelector((store)=> store.address)
  const libraries = ["places"]
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  });
  
  useEffect(() => {
    dispatch({ type: 'FETCH_ADDRESS' });
  }, [dispatch]);

  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({ lat: 40.748817, lng: -73.985428 });

  useEffect(() => {
    const convertAddressToLatLng = async () => {
      const markersWithLatLng = await Promise.all(
        addresses.map(async (address) => {
          const geocodeResults = await getGeocode({ address: address.street + ", " + address.city + ", " + address.state + ", " + address.zip });
          const { lat, lng } = await getLatLng(geocodeResults[0]);
          return {
            ...address,
            lat,
            lng
          };
        })
      );
      setMarkers(markersWithLatLng);

      // Find the first marker with useraddress defined and update the center
      const firstMarkerWithAddress = markersWithLatLng.find(marker => marker.useraddress);
      if (firstMarkerWithAddress) {
        setCenter({ lat: firstMarkerWithAddress.lat, lng: firstMarkerWithAddress.lng });
      }
    };

    if (addresses.length > 0) {
      convertAddressToLatLng();
    }
  }, [addresses]);

  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  }

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  }

  if (loadError) return "Error loading maps"
  if (!isLoaded) return "Loading Maps"

  return (
    <div className="container">
      <h1>Active Sales</h1>
      <div className='MapContainer'>
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
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
}

export default UserPage;
