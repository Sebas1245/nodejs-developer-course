const request = require('request');
const API_KEY = require('../api_key')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${latitude},${longitude}`;
    request({url, json: true}, (err, res) => {
        if (err) {
            callback('Unable to connect to location services!', undefined);
        } else if (res.body.error) {
            callback('Unable to find location. Try another search. ', undefined);
        } else {
            callback(undefined, {
                temperature: res.body.current.temperature,
                tempSensation: res.body.current.feelslike,
                weatherDescription: res.body.current.weather_descriptions[0],
            });
        }
    }); 
}

module.exports = forecast;