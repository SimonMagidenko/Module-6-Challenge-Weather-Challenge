let apiKey = "0aac185f72bc2b9af05c0fe396e10820";

if (localStorage.length === 0) {
    localStorage.setItem("PastCitySearched", "[]")
} else {
    const citiesArray = localStorage.getItem("PastCitySearched")

}

function fetchCity(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (citiesFound) {
            let firstCity = citiesFound[0];

            if (firstCity) {
                fetchWeatherData(firstCity.name, firstCity.country);
            } else {
                // Handle the case where no city was found.
                console.log("City not found");
            }
        })
        .catch(function (error) {
            // Handle any errors that occur during the fetch.
            console.error("Error fetching city data:", error);
        });
};

function fetchWeatherData(city, country) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=imperial&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (forecast) {


            // Set text content for current temperature, wind, and humidity.
            // Current Temperature 
            document.querySelector("#cityTempNow").textContent = forecast.list[0].main.temp + " °F";
            // Current Wind           
            document.querySelector("#cityWindNow").textContent = forecast.list[0].wind.speed + " mph";
            // Current Humidity
            document.querySelector("#cityHumidityNow").textContent = forecast.list[0].main.humidity + " %";
            // Current Icon
            forecastIconNow = document.querySelector("#cityIconNow");
            let openWeatherIconNow = forecast.list[0].weather[0].icon;
            forecastIconNow.src = `http://openweathermap.org/img/w/${openWeatherIconNow}.png`
            // Current Date 
            document.querySelector("#currentDateNow").textContent = dayjs.unix(forecast.list[0].dt).format('MM/DD/YYYY')


            let forecastCards = document.querySelectorAll(".card-body");


            let number = 7;

            for (let i = 0; i < forecastCards.length; i++) {
                let forecastCardElement = forecastCards[i];
                // Forecast Date
                let forecastDate = forecastCardElement.querySelector('#forecastDate')
                forecastDate.textContent = dayjs.unix(forecast.list[number].dt).format('MM/DD/YYYY')

                // Forecast Icon
                let forecastIcon = forecastCardElement.querySelector(".forecastIcon");
                let getOpenWeatherIcon = forecast.list[number].weather[0].icon;
                forecastIcon.src = `http://openweathermap.org/img/w/${getOpenWeatherIcon}.png`;

                // Forecast Temp
                let forecastTemp = forecastCardElement.querySelector(".forecastTemp");
                forecastTemp.textContent = "Temp: " + forecast.list[number].main.temp + " °F";

                // Forecast Wind
                let forecastWind = forecastCardElement.querySelector(".forecastWind");
                forecastWind.textContent = "Wind: " + forecast.list[number].wind.speed + " mph";

                // Forecast Humidity
                let forecastHumidity = forecastCardElement.querySelector(".forecastHumidity");
                forecastHumidity.textContent = "Humidity: " + forecast.list[number].main.humidity + " %";

                number += 8;
            }
        })
        .catch(function (error) {
            // Handle any errors that occur during the fetch.
            // console.error("Error fetching weather data:", error);
        });
};

function searchCity() {
    let citySearched = document.querySelector("#searchBarInput").value;
    let cityNameEl = document.querySelector("#cityNameNow");
    cityNameEl.textContent = citySearched;
    fetchCity(citySearched);
};

function fetchWeatherForDefaultCity() {
    const defaultCity = "Philadelphia";
    let cityNameEl = document.querySelector("#cityNameNow");
    cityNameEl.textContent = defaultCity;
    fetchCity(defaultCity);
};

window.onload = function () {
    fetchWeatherForDefaultCity();
};

let searchButton = document.querySelector(".searchButton");
searchButton.addEventListener("click", searchCity);
