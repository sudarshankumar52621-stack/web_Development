document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInput = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperaturDisplay = document.getElementById("temperature");
    const descriptionDisplay = document.getElementById("description");
    const errorMessage = document.getElementById("error-message");

    const API_KEY = "4ec4cf5c835a949717278d3d2f66731e";

    getWeatherBtn.addEventListener('click', async () => {
      const city = cityInput.value.trim();
      if (!city) return;

      try{
        const weatherData = await fetchWeatherData(city);
        displayWeatherData(weatherData);
      } catch (error) {
        showError();
      }
    })

    async function fetchWeatherData (city){
        //gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        console.log(typeof response);
        console.log("response", response);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        return data;
    }

    function displayWeatherData (data) {
        //display
        console.log(data);
        const {name, main, weather} = data;
        cityNameDisplay.textContent = name;
        temperaturDisplay.textContent = `Temperature : ${main.temp}`;
        descriptionDisplay.textContent = `weather : ${weather[0].description}`;

        //unlock the display
        weatherInput.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function showError () {
        weatherInput.classList.add('hidden');
        errorMessage.classList.remove('hidden');

    }
});