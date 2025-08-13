const express = require('express');
const axios = require('axios');
const router = express.Router();

// ORS API Key (decoded from your base64 string)
const ORS_API_KEY = "5b3ce3597851110001cf6248-73408f3137e44817be993e9b3f6d69c6";

const EMISSION_FACTORS = {
  driving: 0.192,    // kg CO2e per km (average car)
  cycling: 0.0,      // cycling is nearly zero
  walking: 0.0,      // walking is zero
  transit: 0.068     // public transit avg per km
};

// Geocode address to coordinates
async function geocode(address) {
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${ORS_API_KEY}&text=${encodeURIComponent(address)}`;
  const res = await axios.get(url);
  const coords = res.data.features[0]?.geometry?.coordinates;
  return coords; // [lng, lat]
}

async function getRoutes(start, end) {
  // Get coordinates if addresses
  const startCoords = typeof start === 'string' ? await geocode(start) : start;
  const endCoords = typeof end === 'string' ? await geocode(end) : end;

  // Supported travel modes
  const modes = [
    { mode: "driving-car", label: "Car" },
    { mode: "cycling-regular", label: "Bike" },
    { mode: "foot-walking", label: "Walking" },
    { mode: "driving-hgv", label: "Truck" },
    // Add 'transit' mode if ORS supports it for your region
  ];

  // Get routes for each mode
  const routes = [];
  for (const { mode, label } of modes) {
    try {
      const url = `https://api.openrouteservice.org/v2/directions/${mode}`;
      const body = {
        coordinates: [startCoords, endCoords]
      };
      const res = await axios.post(url, body, {
        headers: { 'Authorization': ORS_API_KEY, 'Content-Type': 'application/json' }
      });
      const distanceKm = res.data.routes[0].summary.distance / 1000;
      const emission = EMISSION_FACTORS[mode.split('-')[0]] * distanceKm;
      routes.push({
        mode: label,
        distance: distanceKm,
        emission: emission,
        geometry: res.data.routes[0].geometry
      });
    } catch (err) {
      // If this mode not available for route, skip
      continue;
    }
  }
  return routes;
}

// POST /api/ecoride
router.post('/', async (req, res) => {
  const { start, end } = req.body;
  if (!start || !end) {
    return res.status(400).json({ error: "Missing start or end location" });
  }
  try {
    const routes = await getRoutes(start, end);
    res.json({ routes });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch routes", details: err.message });
  }
});

module.exports = router;