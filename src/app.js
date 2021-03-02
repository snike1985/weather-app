const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather page',
        name: 'Alex Serga'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        img: {
            alt: 'Robot',
            name: 'u.png'
        },
        name: 'Alex Serga'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Alex Serga'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided!'
        });
    }

    geocode(req.query.address, (error, {lat, lng, location} = {}) => {
        if (error) {
            return res.send({error});
        }

        forecast({lat, lng}, (error, forecast) => {
            if (error) {
                return res.send({error});
            }

            res.send({
                forecast,
                location,
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found!',
        name: 'Alex Serga'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found!',
        name: 'Alex Serga'
    })
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
