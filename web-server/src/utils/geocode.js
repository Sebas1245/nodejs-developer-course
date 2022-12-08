const request = require('request');
const API_KEY = require('../api_key')

const geocode = (query, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search. ', undefined);
        } else {
            callback(undefined, {
                location: body.location.name,
                latitude: body.location.lat,
                longitude: body.location.lon,
            });
        }
    }); 
}

module.exports = geocode;