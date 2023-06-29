
const apiKey = "5290d5de3cf1a88486d689eb6195dcc8";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const iconoClima = document.querySelector(".iconos-clima");
let searches = [];

async function checkWeather(city) {
  const response = await fetch(apiURL + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();
    document.querySelector(".ciudad").innerHTML = data.name;
    document.querySelector(".temperatura").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".sensacion").innerHTML =
      data.main.feels_like + "°C";
    document.querySelector(".humedad").innerHTML = data.main.humidity + "%";
    document.querySelector(".viento").innerHTML =
      data.wind.speed + "km/hs";
    document.querySelector(".temp-max").innerHTML =
      Math.round(data.main.temp_max) + "°C";
    document.querySelector(".temp-min").innerHTML =
      Math.round(data.main.temp_min) + "°C";
    document.querySelector(".presion").innerHTML =
      data.main.pressure + "hPa";

    if (data.weather[0].main == "Clouds") {
      iconoClima.src = "img/nublado.png";
    } else if (data.weather[0].main == "Clear") {
      iconoClima.src = "img/soleado.png";
    } else if (data.weather[0].main == "Rain") {
      iconoClima.src = "img/lluvia.png";
    } else if (data.weather[0].main == "Drizzle") {
      iconoClima.src = "img/llovizna.png";
    } else if (data.weather[0].main == "Mist") {
      iconoClima.src = "img/niebla.png";
    } else if (data.weather[0].main == "Snow") {
      iconoClima.src = "img/nieve.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";


    searches.push(city);
    localStorage.setItem("searches", JSON.stringify(searches));
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

window.addEventListener("load", () => {
  
  const searchesFromLocalStorage = JSON.parse(localStorage.getItem("searches"));

    if (searchesFromLocalStorage && searchesFromLocalStorage.length > 0) {
    searches = searchesFromLocalStorage;
    console.log("Búsquedas almacenadas:");
    searches.forEach((search, index) => {
      console.log(`${index + 1}. ${search}`);
    });
  } else {
    console.log("No se encontraron búsquedas almacenadas.");
  }
});
