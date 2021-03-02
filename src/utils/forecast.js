const request = require('postman-request');
const KEY = '27170f2ffa15722ad659306e6d92f024';

const forecast = ({lat, lng}, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${KEY}&query=${lat},${lng}`;

    request(url, {json: true}, (err, res, body) => {
        if (err) {
            callback('Unable to connect to weather service!');
        } else if (body['error']) {
            callback(body.error.info);
        } else {
            const {weather_descriptions, temperature, precip, humidity} = body['current'];
            const temperatureText = `It is currently ${temperature} degrees out.`;
            const presipText = `There is a ${precip}% chance of rain.`;
            const humidityText = `The humidity is ${humidity}%.`;
            const result = `${weather_descriptions[0]}. ${temperatureText} ${presipText} ${humidityText}`;

            callback(undefined, result);
        }
    });

};

module.exports = forecast;
