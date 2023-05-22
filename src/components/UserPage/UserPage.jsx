import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const address = useSelector((store)=> store.address)

  useEffect(() => {
    dispatch({ type: 'FETCH_ADDRESS' });
  }, [dispatch]);

  const [city, setCity] = useState(null);
  const [stateName, setStateName] = useState(null)
  const [street, setStreet] = useState(null)
  const [zip, setZip] = useState(null)

  return (
    <div className="container">
      <h2>basemap goes here </h2>
      <div> Test 
      <div>{JSON.stringify(address)}</div> 
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
