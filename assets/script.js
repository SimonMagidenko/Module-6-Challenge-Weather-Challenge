
/// put this fetch request inside event listener for the search button
let apiKey = "0aac185f72bc2b9af05c0fe396e10820"

fetch(`http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apiKey}`)
    .then(response => response.json())
    .then(citiesFound => {
        let firstCity = citiesFound[0];
        console.log(firstCity.lat);
        console.log(firstCity.lon);

        // return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=${apiKey}`)

    })

    // .then(response => response.json())
    // .then(data => {

    //     console.log(data);
    // })

