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
 //import { ComboBox, ComboBoxInput, ComboBoxPopover, ComboboxList, ComboBoxOption} from "@reach/combobox/styles.css"

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const address = useSelector((store)=> store.address)
  const libraries = ["places"]
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  })
  
  useEffect(() => {
    dispatch({ type: 'FETCH_ADDRESS' });
  }, [dispatch]);

  const [city, setCity] = useState(null);
  const [stateName, setStateName] = useState(null)
  const [street, setStreet] = useState(null)
  const [zip, setZip] = useState(null)
  const mapContainerStyle = {
    width: '82.15vw',
    height: '85vh'
  }
  const center = {
    lat:44.152959 , 
    lng:-93.944348,
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
      <div className='MapContainer'><GoogleMap 
      mapContainerStyle={mapContainerStyle}
      zoom ={15}
      center= {center}
      options = {options}> </GoogleMap></div>
      
      <div> Test 
      <div>{JSON.stringify(address)}</div> 
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
