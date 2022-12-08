const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const PORT = 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars enginde and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('/', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sebastian Saldana'
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Sebastian Saldana'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a very helpful message',
        title: 'Help',
        name: 'Sebastian Saldana'
    });
});

app.get('/weather', (req, res) => {
    const {address} = req.query;
    if (!address) {
        console.log('Error: No address provided');
        return res.send({
            error: 'An address must be provided',
        })
    }
    geocode(address, (err, {latitude, longitude}) => {
        if (err) {
            console.log(err);
            return res.send({
                error: err,
            })
        }
        forecast(latitude, longitude, 
            (err, {temperature, tempSensation, weatherDescription} = {}) => {
                if (err) {
                    console.log(err);
                    return res.send({
                        error: err,
                    })
                }
                return res.send({
                    temperature,
                    tempSensation,
                    weatherDescription
                });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Sebastian Saldana',
        title: '404 - Not found',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Sebastian Saldana',
        title: '404 - Not found',
        errorMessage: 'Page not found'
    });
});

app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
