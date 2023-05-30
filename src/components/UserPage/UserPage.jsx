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
    googleMapsApiKey: '',
    libraries,
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_ADDRESS' });
  }, [dispatch]);

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({ lat: 40.748817, lng: -73.985428 });
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [arrayOfItems, setArrayOfItems] = useState([]);

  useEffect(() => {
    if (isLoaded && addresses.length > 0) {
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

  const generateAndSendRoute = () => {
    // Generate the route using the selectedItems array
    // Use the Google Routing API

    // Send the route via email
    // Implement the email sending functionality
  };

  const removeFromArray = (id) => {
    const updatedItems = selectedItems.filter((item) => item.id !== id);
    setSelectedItems(updatedItems);
    
  
    // Check if the selectedMarker is removed and set it to null
    if (selectedMarker && selectedMarker.id === id) {
      setSelectedMarker(null);
    }
  };
  

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
              onMouseOver={() => {
                setSelectedMarker(marker);
                setOpenPopup(true);
              }}
              onClick={() => {
                if (!selectedItems.some((item) => item.id === marker.id)) {
                  const updatedItems = [...selectedItems, marker];
                  setSelectedItems(updatedItems);
                }
              }}
              icon={{
                url: marker.lat === center.lat ? '/images/house.png' : '/images/ls.png',
                scaledSize: new window.google.maps.Size(60, 60),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(18, 18),
              }}
              options={{
                label: selectedItems.some((item) => item.id === marker.id) ? {
                  text: 'Selected',
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  background: 'rgba(0, 0, 255, 0.3)',
                  borderRadius: '50%',
                  padding: '5px',
                } : null,
              }}
              
              
              
            />
          ))}
          {selectedMarker && openPopup && (
            <InfoWindow
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              onCloseClick={() => setOpenPopup(false)}
            >
              <div>
                <h2>{selectedMarker.street}, {selectedMarker.city}</h2>
                <p>Sales Dates: {selectedMarker.fromdate} - {selectedMarker.todate}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
      <div className='arrayof'>
        {selectedItems.map((item) => (
          <div key={item.id}>
            <span className='listof'>{`   ${item.street}, ${item.city}, ${item.state}`}     </span>
            <button onClick={() => removeFromArray(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={generateAndSendRoute}>Generate Route and Send Email</button>
    </div>
  );
}

export default UserPage;
