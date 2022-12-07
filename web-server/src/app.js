const path = require('path')
const express = require('express');

const app = express();
const PORT = 3000;
const publicDirPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs');
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
    });
});

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It is sunny',
        location: 'Monterrey',
    });
});

app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}`));
