const express = require('express');
const bodyParser = require('body-parser');
const ecoRideRouter = require('./ecoRide');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/ecoride', ecoRideRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Eco-Ride backend running on port ${PORT}`);
});