console.log('Client side javascript file is loaded');

const weatherForm = document.getElementById('weather-form');
const searchInput = document.getElementById('search-input');

weatherForm.onsubmit = (e) => {
    e.preventDefault();
    const location = searchInput.value;
    fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
        if (data.error) {
            console.error(data.error);
        } else {
            console.log(data);
        }
    });
});
}