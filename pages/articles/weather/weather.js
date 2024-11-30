(function () {
  const apiKey = "7850b743ddc85a8b2af587ca3dae5621";
  const lat = 6.9271; // Latitude for Colombo
  const lon = 79.8612; // Longitude for Colombo
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((weatherData) => {
      // console.log(weatherData);
      if (weatherData.cod != 200) {
        throw new Error("Failed to load weather data");
      }
      document.getElementById("loading").style.display = "none";
      document.getElementById("contentWeather").style.display = "flex";
      document.getElementById("weather-description").textContent =
        weatherData.weather[0].description;
      document.getElementById(
        "temperature"
      ).textContent = `${weatherData.main.temp.toFixed(1)}°C`;
      document.getElementById("humidity").textContent =
        weatherData.main.humidity;
      document.getElementById("wind-speed").textContent =
        weatherData.wind.speed;
      document.getElementById("pressure").textContent =
        weatherData.main.pressure;
      document.getElementById("visibility").textContent =
        weatherData.visibility;

      // Set the weather icon
      const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
      document.getElementById("weather-icon").src = weatherIconUrl;
    })
    .catch((error) => {
      document.getElementById("loading").textContent = error.message;
    });
})();
