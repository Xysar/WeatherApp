let currentCity = "Vista";

function getLocationInfo(cityName) {
  return fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=a9474bb6a4b22a8da4d1ff6d172ff945`,
    { mode: "cors" }
  ).then(function (response) {
    return response.json();
  });
}

function getLocationCoord(cityName) {
  return getLocationInfo(cityName).then((locations) => {
    return [locations[0].lat, locations[0].lon];
  });
}

async function getCurrentWeatherData(latitude, longitude) {
  let result = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a9474bb6a4b22a8da4d1ff6d172ff945`,
    { mode: "cors" }
  );
  let resultjson = await result.json();
  return resultjson;
}

async function getCurrentWeather(cityName) {
  let locationCoord = await getLocationCoord(cityName);
  let weather = await getCurrentWeatherData(locationCoord[0], locationCoord[1]);
  return weather;
}

// async function getDailyForecast(cityName) {
//   let locationCoord = await getLocationCoord(cityName);
//   console.log(locationCoord);
//   let result = await fetch(
//     `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${locationCoord[0]}&lon=${locationCoord[1]}&cnt=4&appid=a9474bb6a4b22a8da4d1ff6d172ff945`,
//     { mode: "cors" }
//   );
//   return result;
// }

function convertKelvinToFahrenheit(temp) {
  return Math.round((temp - 273.15) * (9 / 5) + 32);
}

async function updateInfo(cityName) {
  currentCity = cityName;
  let cityInfo = await getCurrentWeather(cityName);
  let cityDisplay = document.querySelector(".city-name");
  let temperatureDisplay = document.querySelector(".today-temp");
  let starterCity = getLocationInfo(cityName);
  starterCity.then((e) => {
    cityDisplay.innerText = e[0].name + ", " + e[0].state + ", " + e[0].country;
  });

  let startingTemp = getCurrentWeather(currentCity);
  startingTemp.then((e) => {
    temperatureDisplay.innerText =
      convertKelvinToFahrenheit(Number(e.main.temp)) + String.fromCharCode(176);
  });

  updateIcon(cityInfo);
}

function updateIcon(cityInfo) {
  let todayIcon = document.querySelector(".today-icon");
  todayIcon.src = `http://openweathermap.org/img/wn/${cityInfo.weather[0].icon}@2x.png`;
}

function updateTemperatures() {}

function updateCityHeader() {}

const initUI = () => {
  const container = document.getElementById("container");

  const header = document.createElement("div");
  header.classList.add("header");
  container.appendChild(header);

  let cityForm = createCityForm();
  header.appendChild(cityForm);

  const displayArea = document.createElement("div");
  displayArea.classList.add("display-area");

  let cityHeader = document.createElement("h1");
  cityHeader.classList.add("city-name");

  updateInfo(currentCity);

  displayArea.appendChild(cityHeader);

  const dailyForecast = document.createElement("div");
  dailyForecast.classList.add("daily-forecast");

  const todayTempDisplay = document.createElement("div");
  todayTempDisplay.classList.add("today-temp-display");

  const cityTemperature = document.createElement("h1");
  cityTemperature.classList.add("today-temp");

  const todayWeatherIcon = document.createElement("img");
  todayWeatherIcon.classList.add("today-icon");

  todayTempDisplay.appendChild(todayWeatherIcon);
  todayTempDisplay.appendChild(cityTemperature);

  dailyForecast.appendChild(todayTempDisplay);

  displayArea.appendChild(dailyForecast);
  container.appendChild(displayArea);
};

function createDailyTempDisplay(num) {
  let tempDisplay = document.createElement("div");
  tempDisplay.classList.add("daily-temp");

  let temperature = document.createElement("p");
  temperature.classList.add("daily-temp-display");
  let icon = document.createElement("img");
  icon.classList.add("daily-icon");
  tempDisplay.setAttribute("data", num);
  return tempDisplay;
}

function createCityForm() {
  let form = document.createElement("form");
  form.classList.add("city-form");
  form.setAttribute("method", "post");
  form.setAttribute("action", "");

  let cityInput = document.createElement("input");
  cityInput.classList.add("city-input");

  let citySubmit = document.createElement("button");
  citySubmit.classList.add("city-submit");
  citySubmit.innerText = "Search";

  citySubmit.addEventListener("click", (e) => {
    e.preventDefault();
    if (cityInput.value === "") {
      return;
    }
    updateInfo(cityInput.value);
    cityInput.value = "";
  });
  form.appendChild(cityInput);
  form.appendChild(citySubmit);
  return form;
}

initUI();
