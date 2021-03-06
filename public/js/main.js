const weatherForm = document.getElementById('weather-form');
const weatherLocation = document.getElementById('weather-location');
const weatherResult = document.getElementById('weather-result');
const weatherError = document.getElementById('weather-error');
const searchField = weatherForm.querySelector('input');
const clearTexts = () => {
    weatherLocation.textContent = '';
    weatherResult.textContent = '';
    weatherError.textContent = '';
};

weatherForm.addEventListener('submit', (e) => {
    const address = searchField.value;

    e.preventDefault();
    clearTexts();

    if (address) {
        const url = `/weather?address=${address}`;

        weatherResult.textContent = 'Loading...';

        fetch(url)
            .then((res) => {
                res.json().then((data) => {
                    clearTexts();
                    if (data.error) {
                        weatherError.textContent = data.error;

                    } else {
                        weatherLocation.textContent = data.location;
                        weatherResult.textContent = data.forecast;
                    }
                })
            });
    } else {
        weatherError.textContent = 'You must provide an address!';
    }
});
