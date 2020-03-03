//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format a sfrom before)


const request = require('request');

const forecast = (latitude, longtitude, callback) => {
  const url = `https://api.darksky.net/forecast/a2316c5c8ac5fb0a5893b7e027284d6d/${latitude},${longtitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location!', undefined);
    } else {
      callback(undefined, `${body.daily.summary} It's currently ${body.currently.temperature} degress.There is a ${body.currently.precipProbability}% chance of rain.`);
    }
  });
};

module.exports = forecast;
