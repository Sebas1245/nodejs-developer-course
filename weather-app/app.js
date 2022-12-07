const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');


const location = process.argv[2];

if (!location) {
    console.log('A location must be provided');
    process.exit();
}
else {
    geocode(location, (err, {latitude, longitude, location} = {}) => {
        if (err) {
            return console.log(err);
        }
        forecast(latitude, longitude, (err, {temperature, tempSensation, weatherDescription} = {}) => {
            if (err) {
                return console.log(err);
            }
            console.log(weatherDescription + ' today. Temprature is ' + temperature + ' it feels like ' + tempSensation);    
        });
    });   
}