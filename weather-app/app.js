const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

geocode('Monterrey', (err, data) => {
    console.log('Error: ', err);
    console.log('Data', data);  
    forecast(data.latitude, data.longitude, (err, data) => {
        console.log('Error: ', err);
        console.log('Data', data);    
    });
      
});