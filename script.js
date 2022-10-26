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

async function getLocationWeatherData(latitude, longitude) {
  let result = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a9474bb6a4b22a8da4d1ff6d172ff945`,
    { mode: "cors" }
  );
  let resultjson = await result.json();
  return resultjson;
}

async function getLocationWeather(cityName) {
  let locationCoord = await getLocationCoord(cityName);
  let weather = await getLocationWeatherData(
    locationCoord[0],
    locationCoord[1]
  );
  return weather;
}

let currentCity = "Vista";

const initUI = () => {
  const container = document.getElementById("container");
  let cityHeader = document.createElement("h1");
  cityHeader.classList.add("cityname");

  let starterCity = getLocationInfo(currentCity);
  starterCity.then((e) => {
    cityHeader.innerText = e[0].name + e[0].state + e[0].country;
  });
  container.appendChild(cityHeader);
  const cityTemperature = document.createElement("h1");
  cityTemperature.classList.add("citytemp");
  let startingTemp = getLocationWeather(currentCity);
  startingTemp.then((e) => {
    cityTemperature.innerText = e.main.temp;
  });
  container.appendChild(cityTemperature);
};

initUI();
