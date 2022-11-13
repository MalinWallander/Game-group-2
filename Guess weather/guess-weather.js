import { cities, apiKey } from "./constants.js";

let randNum = Math.floor(Math.random() * cities.length);

let lat, long, cityName, kelvin, temp;
let cityNameEl = document.getElementById('cityNamePresent');
let submitButtonEl = document.getElementById('submit-button');
let refreshbuttonEl = document.getElementById('refresh-button');
let answerEl = document.getElementById('answer');
let form = document.forms.guess;

const fetchCity = fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cities[randNum]}&limit=5&appid=4c71ba6fffb38a4baae0fe5623ee9a03`)
    .then( response => response.json())
    .then(data => {
        return data;
});

const fetchTemp = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=4c71ba6fffb38a4baae0fe5623ee9a03`)
        .then(function(res) {
            return res.json();
            }).then(function(data) {
                kelvin = data.main.temp;
                return Math.floor(kelvin - 273.15);
            });

window.onload = async () => {
    let data = await fetchCity;
    cityName = data[0].name;
    cityNameEl.innerHTML = cityName;
    lat = data[0].lat;
    long = data[0].lon;
    temp = await fetchTemp;
    console.log(cityName, temp);
};

    form.onsubmit = function (event) {
         event.preventDefault();
        let guess = this.elements.guess.value;

     console.log(guess);

//     if (Number.isNaN(guess)) {
//         alert ('That is not a number!');
//     }
}