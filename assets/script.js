let apiKey = "0aac185f72bc2b9af05c0fe396e10820"

function fetchCity(city) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${apiKey}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (citiesFound) {
            let firstCity = citiesFound[0];
            let firstCityLon = citiesFound[0].lon
            let firstCityLat = citiesFound[0].lat



            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&units=imperial&appid=${apiKey}`)

                .then(function (response) {
                    return response.json()
                })
                .then(function (forecast) {
                    console.log(forecast)
                    // Sets text of current temperature 
                    cityTempNow = document.querySelector("#cityTempNow")
                    cityTempNow.textContent = forecast.list[0].main.temp + " °F"
                    // Sets text of current wind
                    cityWindNow = document.querySelector("#cityWindNow")
                    cityWindNow.textContent = forecast.list[0].wind.speed + " Mph"
                    // Sets text of current humidity
                    cityHumidityNow = document.querySelector("#cityHumidityNow")
                    cityHumidityNow.textContent = forecast.list[0].main.humidity + " %"

                    let forecastCard = document.querySelectorAll(".card-body")
                    console.log(forecastCard)
                    let number = 7
                    for (let i = 0; i < forecastCard.length; i++) {
                        let forecastCardElement = forecastCard[i];
                        // Forecast Icon
                        let forecastIcon = forecastCardElement.querySelector(".forecastIcon")
                        let getOpenWeatherIcon = forecast.list[number].weather[0].id
                        forecastIcon.textContent = `http://openweathermap.org/img/w/${getOpenWeatherIcon}.png
                        `
                        // Forecast Temp 
                        let forecastTemp = forecastCardElement.querySelector(".forecastTemp")
                        forecastTemp.textContent = "Temp: " + forecast.list[number].main.temp + " °F"

                        // Forecast Wind 
                        let forecastWind = forecastCardElement.querySelector(".forecastWind")
                        forecastWind.textContent = "Wind " + forecast.list[number].wind.speed + " mph"

                        // Forecast Humidity 
                        let forecastHumidity = forecastCardElement.querySelector(".forecastHumidity")
                        forecastHumidity.textContent = "Humidity: " + forecast.list[number].main.humidity + " %"

                        number += 7
                    }


                })
        })

}

function searchCity() {
    let citySearched = document.querySelector("#searchBarInput").value;
    let cityNameEl = document.querySelector("#cityNameNow");
    cityNameEl.textContent = citySearched;
    fetchCity(citySearched);
}

let searchButton = document.querySelector(".searchButton");
searchButton.addEventListener("click", searchCity);

