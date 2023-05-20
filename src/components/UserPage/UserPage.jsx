import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const address = useSelector((store)=> store.address)


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
