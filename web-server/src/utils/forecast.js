const request = require('request');
const API_KEY = require('../api_key')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${latitude},${longitude}`;
    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search. ', undefined);
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                tempSensation: body.current.feelslike,
                weatherDescription: body.current.weather_descriptions[0],
            });
        }
    }); 
}

module.exports = forecast;