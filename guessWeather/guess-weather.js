"use strict";

import { cities, apiKey } from "./constants.js";

//Set random number
let randNum = Math.floor(Math.random() * cities.length);
//Set elements and objects
let cityNameEl = document.getElementById('cityNamePresent');
let submitButtonEl = document.getElementById('submit-button');
let answerEl = document.getElementById('answer');
let form = document.forms.guess;
let messageEl = document.getElementById('answer');

//Get random city and data for the city
const fetchCity = fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cities[randNum]}&limit=5&appid=4c71ba6fffb38a4baae0fe5623ee9a03`)
    .then(response => response.json())
    .then(data => {
        return data;
});

//function 
function showMessage(message) {
    messageEl.innerHTML = message;
 }
//saving temp to be able to use it further down
function getTemp() {
    return localStorage.getItem("temp") || "";
 }

//Get temp for city based on coordinates
const fetchTemp = (lat, long) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=4c71ba6fffb38a4baae0fe5623ee9a03`)
        .then(function(res) {
            return res.json();
            })
            .then(function(data) {
                let kelvin = data.main.temp;
                return Math.floor(kelvin - 273.15);
                })
                .catch(err => showErrormessage("Sorry, something went wrong. Try again!"))
                };

//wait for and set variables from the API-information fetched
window.onload = async () => {
    let data = await fetchCity;
    let cityName = data[0].name;
    cityNameEl.innerHTML = cityName;
    const lat = data[0].lat;
    const long = data[0].lon;
    let temp = await fetchTemp(lat, long);
    localStorage.setItem("temp", temp);
    console.log(cityName, temp);
    };

//Refresh button
const refreshButton = document.getElementById('refresh-button');

const refreshPage = () => {
  window.location.reload();
}

refreshButton.addEventListener('click', refreshPage);

//Get guess
form.onsubmit = function (event) {
    event.preventDefault();
    let guess = this.elements.guess.value;
    let temp = getTemp();

    //convert guess and temp to numbers
    guess = Number(guess);
    temp = Number(temp);

    //compare guess and temp, sending message to the player if it's correct or not
    if (guess === temp) {
        showMessage("Success!");
    }
    else if (guess < temp) {
        showMessage("Higher! Guess again");
    }
    else if (guess > temp) {
        showMessage("Lower! Guess again");
    }
    else if (guess === NaN){
        showMessage("That is not a number, guess again!");
    }

    function showMessage(message){
        messageEl.innerHTML = message;
    }
}