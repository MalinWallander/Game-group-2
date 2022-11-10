import { cities, apiKey } from "./constants.js";

let randNum = Math.floor(Math.random() * cities.length);

let lat, long, cityName, kelvin, celcius;

const res1 = fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cities[randNum]}&limit=5&appid=4c71ba6fffb38a4baae0fe5623ee9a03`)
.then(function(res) {
    return res.json();
    }).then(function(data) {

    lat = data[0].lat;
    long = data[0].lon;
    cityName = data[0].name;

    const res = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=4c71ba6fffb38a4baae0fe5623ee9a03`)
    .then(function(res) {
        return res.json();
        }).then(function(data) {
            kelvin = data.main.temp;
            celcius = Math.floor(kelvin - 273.15);
            console.log(`Temperature in ${cityName} is currently ${celcius} degrees.`)
        });
    });

