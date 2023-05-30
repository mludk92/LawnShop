const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const axios = require('axios');
require('dotenv').config();
const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', async (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password) 
    VALUES ($1, $2) RETURNING id`;
  const queryText2 = `INSERT INTO address (user_id, city, state, street, zip, lat, lng) 
    VALUES ($1, $2, $3, $4, $5, $6, $7)`;

  try {
    const { rows } = await pool.query(queryText, [username, password]);
    const userId = rows[0].id;

    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      req.body.address
    )}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

    const geocodeResponse = await axios.get(geocodeUrl);
    const results = geocodeResponse.data.results;

    if (results.length > 0) {
      const { lat, lng } = results[0].geometry.location;

      await pool.query(queryText2, [
        userId,
        req.body.city,
        req.body.state,
        req.body.address,
        req.body.zip,
        lat,
        lng,
      ]);

      res.sendStatus(201);
    } else {
      throw new Error('No results found');
    }
  } catch (err) {
    console.log('User registration failed: ', err);
    res.sendStatus(500);
  }
});


// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
