import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RegisterForm.css';
function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        city: city,
        state: stateName,
        address: address,
        zip: zip,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">City:</label>
        <input
          type="text"
          name="city"
          value={city}
          required
          onChange={(event) => setCity(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="state">State:</label>
        <input
          type="text"
          name="state"
          value={stateName}
          required
          onChange={(event) => setStateName(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Street Address:</label>
        <input
          type="text"
          name="address"
          value={address}
          required
          onChange={(event) => setAddress(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="zip">Zip Code:</label>
        <input
          type="number"
          name="Zip Code"
          value={zip}
          required
          onChange={(event) => setZip(event.target.value)}
        />
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
