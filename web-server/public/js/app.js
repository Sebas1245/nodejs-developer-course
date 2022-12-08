console.log('Client side javascript file is loaded');

const weatherForm = document.getElementById('weather-form');
const searchInput = document.getElementById('search-input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.onsubmit = (e) => {
    e.preventDefault();
    const location = searchInput.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
        if (data.error) {
            messageOne.textContent = data.error;
            messageTwo.textContent = '';
        } else {
            messageOne.textContent = 'Temperature is ' + data.temperature + ' degrees Celsius. It feels like ' + data.tempSensation + ' degrees.';
            messageTwo.textContent = 'The forecast for today is ' + data.weatherDescription + '.';
        }
    });
});
}