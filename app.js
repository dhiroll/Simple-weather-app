searchButton.addEventListener("click", searchWeather);

function searchWeather() {
  loadingText.style.display = "block";
  weatherBox.style.display = "none";
  console.log(searchCity.value);
  var cityName = searchCity.value;
  if (cityName.trim().length == 0) {
    return alert("Please enter a city name");
  }

  http: var http = new XMLHttpRequest();
  var apiKey = "6dac7bc694e944f2086621b6f20219c2";
  var url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=metric&appid=" +
    apiKey;
  var method = "GET";

  http.open(method, url);
  http.onreadystatechange = function() {
    if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
      var data = JSON.parse(http.responseText);
      var weatherData = new Weather(
        cityName,
        data.weather[0].description.toUpperCase()
      );
      weatherData.temperature = data.main.temp;
      updateWeather(weatherData);
      console.log(weatherData);
    } else if (http.readyState == XMLHttpRequest.DONE && http.status !== 200) {
      alert("something went wrong");
    }
  };
  http.send();
}

function updateWeather(weatherData) {
  weatherCity.textContent = weatherData.cityName;
  weatherDescription.textContent = weatherData.description;
  weatherTemperature.textContent = weatherData.temperature;
  loadingText.style.display = "none";

  weatherBox.style.display = "block";
}
