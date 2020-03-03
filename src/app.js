/* eslint-disable consistent-return */
const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

const app = express();
const port = 8080;


const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up template
app.set('view engine', 'hbs');
app.set('views', viewsPath);// Directory of views
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Son Nam',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Son Nam',

  });
});

app.get('/about/*', (req, res) => {
  res.render('404page', {
    title: 'Weather App',
    name: 'Son Nam',
    errorMessage: 'Page not found',
  });
});


app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    name: 'Son Nam',
    helpMessage: 'You need help about?',
  });
});

app.get('/help/*', (req, res) => {
  res.render('404page', {
    title: 'Weather App',
    name: 'Son Nam',
    errorMessage: 'Help article not found',
  });
});


app.get('/weather', (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.send({
      error: 'You must provide address to show the weather',
    });
  }
  geocode(address, (error, { latitude, longtitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longtitude, (err, forecastData) => {
      if (err) {
        return res.send({ error });
      }
      return res.send({
        location,
        forecast: forecastData,
        address,
      });
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',

    });
  }

  console.log(req.query.search);

  res.send({
    products: [],
  });
});

app.get('*', (req, res) => {
  res.render('404page', {
    title: 'Weather App',
    name: 'Son Nam',
    errorMessage: 'Page not found',
  });
});

app.listen(port, () => {
  console.log(`Work as ${port}`);
});
