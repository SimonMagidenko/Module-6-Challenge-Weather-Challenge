
let apiKey = "0aac185f72bc2b9af05c0fe396e10820"

function fetchCity(city) {
    console.log(city)
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${apiKey}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (citiesFound) {
            console.log(citiesFound)
            let firstCity = citiesFound[0];
            let firstCityLon = citiesFound[0].lon
            let firstCityLat = citiesFound[0].lat
            console.log(firstCity.lon)
            console.log(firstCity.lat)


            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&units=imperial&appid=${apiKey}`)

                .then(function (response) {
                    return response.json()
                })
                .then(function (forecast) {
                    console.log(forecast)

                    let forecastCard = document.querySelectorAll(".card-body")
                    console.log(forecastCard)
                    let number = 0
                    for (let i = 0; i < forecastCard.length; i++) {
                        let forecastCardElement = forecastCard[i];
                        let forecastTemp = forecastCardElement.querySelector(".forecastTemp")
                        console.log(forecastTemp)
                        forecastTemp.textContent = forecast.list[number].main.temp

                        //insert icon here
                        //input forecast Wind here
                        let forecastWind = forecastCardElement.querySelector(".forecastWind")
                        forecastWind.textContent = forecast.list[number].wind.speed
                        //input forecast Humidity here
                        let forecastHumidity = forecastCardElement.querySelector(".forecastHumidity")
                        forecastHumidity.textContent = forecast.list[number].main.humidity
                        number += 7


                    }
                })
        })

}

function searchCity() {
    let citySearched = document.querySelector("#searchBarInput").value;
    let cityName = document.querySelector("#cityName");
    cityName.textContent = citySearched;
    console.log(citySearched)
    let cityTemp = document.querySelector("#cityTemp")
    cityTemp.textContent =
        fetchCity(citySearched);
}

let searchButton = document.querySelector(".searchButton");
searchButton.addEventListener("click", searchCity);

