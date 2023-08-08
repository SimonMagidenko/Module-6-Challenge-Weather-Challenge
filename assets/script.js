
let apiKey = "0aac185f72bc2b9af05c0fe396e10820"

function fetchCity(city) {
    console.log(city)
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
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


            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=${apiKey}`)

        })

        .then(function (response) {
            return response.json()
        })
        .then(function (forecast) {
            console.log(forecast)
        })
}

function searchCity() {
    let citySearched = document.querySelector("#searchBarInput").value;
    let cityName = document.querySelector("#cityName");
    cityName.textContent = citySearched;
    console.log(citySearched)
    fetchCity(citySearched);
}

let searchButton = document.querySelector(".searchButton");
searchButton.addEventListener("click", searchCity);

