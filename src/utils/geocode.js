const request = require('postman-request');
const TOKEN = 'pk.eyJ1Ijoic25pa2VtYW4iLCJhIjoiY2tsZ3hxZW5sMmRkMjJ2czh0azB2ZGE3biJ9.B9iMlFPArdTeRH4qx28xRg';

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${TOKEN}&limit=1`;

    request(url, {json: true}, (err, res, body) => {
        if (err) {
            callback('Unable to connect to location service!');
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search!');
        } else {
            callback(undefined, {
                lng: body.features[0]['center'][0],
                lat: body.features[0]['center'][1],
                location: body.features[0]['place_name']
            });
        }
    });
};

module.exports = geocode;
