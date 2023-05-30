const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const axios = require('axios');

// /api/route
router.post('/', async (req, res) => {
  try {
    const selectedAddresses = req.body.addresses; // Array of selected addresses from the client
    const routeData = await generateSequentialRoutes(selectedAddresses);
    res.send(routeData);
  } catch (error) {
    console.log('Route POST request failed', error);
    res.sendStatus(500);
  }
});

async function generateSequentialRoutes(addresses) {
  const routeData = [];
  let origin = ''; // Initialize the origin address

  for (let i = 0; i < addresses.length; i++) {
    const destination = addresses[i];
    const directionsResponse = await getDirections(origin, destination);
    const route = extractRouteData(directionsResponse.data);

    if (route) {
      routeData.push(route);
      origin = destination; // Set the current destination as the next origin
    }
  }

  return routeData;
}

async function getDirections(origin, destination) {
  return await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
    params: {
      origin: origin,
      destination: destination,
      key: '',
    },
  });
}

function extractRouteData(directionsData) {
  // Extract route data from the directions response
}

module.exports = router;
