const apiKey = 'd86414956fe51ffe34524ad8835395e8';
const searchButton = document.querySelector('.search button');
const searchInput = document.querySelector('.search input');
const weatherIcon = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temp');
const cityElement = document.querySelector('.city');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');

searchButton.addEventListener('click', () => {
    const city = searchInput.value;
    if (city) {
        fetchWeatherData(city);
    }
});

function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function updateWeather(data) {
    if (data.cod === 200) {
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        tempElement.textContent = `${data.main.temp}°C`;
        cityElement.textContent = data.name;
        humidityElement.textContent = `${data.main.humidity}%`;
        windElement.textContent = `${data.wind.speed} km/hr`;
    } else {
        alert('City not found');
    }
}

// Optionally, fetch weather data based on user's current location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                updateWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    });
}