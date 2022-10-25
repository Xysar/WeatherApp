let img = document.querySelector("img");

function getLocationCoord(cityName) {
  return fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=a9474bb6a4b22a8da4d1ff6d172ff945`,
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then((locations) => {
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
  console.log(weather);
}

getLocationWeather("vista");
getLocationWeather("London");
