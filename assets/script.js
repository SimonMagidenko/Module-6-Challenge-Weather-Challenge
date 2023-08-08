
let apiKey = "0aac185f72bc2b9af05c0fe396e10820"

return fetchCity()

function fetchCity() {
    let citySearched = document.querySelector("#searchBarInput").value
    console.log(citySearched)
    let cityName = document.querySelector("#cityName")
    cityName.textContent = citySearched

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${citySearched}&limit=5&appid=${apiKey}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (citiesFound) {
            console.log(citiesFound)
            let firstCity = citiesFound[0];
            console.log(firstCity.lon)
            console.log(firstCity.lat)


            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=${apiKey}`)

        })

        .then(response => response.json())
        .then(data => {

            console.log(data);
        })
}

function searchCity() {
    let citySearched = document.querySelector("#searchBarInput").value
    let cityName = document.querySelector("#cityName")
    cityName.textContent = citySearched
}

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", searchCity);

