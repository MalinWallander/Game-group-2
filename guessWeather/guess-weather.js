"use strict";

import {cities} from "./constants.js";

//Set random number
let randNum = Math.floor(Math.random() * cities.length);
//Set elements and objects
let cityNameEl = document.getElementById('cityNamePresent');
let form = document.forms.guess;
let messageEl = document.getElementById('answer');
const unit = "metric"

//Get random city and data for the city
const fetchCity = fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cities[randNum]}&limit=5&appid=4c71ba6fffb38a4baae0fe5623ee9a03`)
    .then(response => response.json())
    .then(data => {
        return data;
        })
        .catch(err => showMessage("Sorry, something went wrong. Try again!"))
        ;

//saving temp to be able to use it further down
function getTemp() {
    return localStorage.getItem("temp") || "";
 }

//Get temp for city based on coordinates
const fetchTemp = (lat, long) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${unit}&appid=4c71ba6fffb38a4baae0fe5623ee9a03`)
        .then(function(res) {
            return res.json();
            })
            .then(function(data) {
                let temp = data.main.temp;
                return Math.floor(temp);
                })
                .catch(err => showMessage("Sorry, something went wrong. Try again!"))
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

//function to refresh page
const refreshPage = () => {
  window.location.reload();
}
//on click, run function refreshPage
refreshButton.addEventListener('click', refreshPage);


//Get guess
form.onsubmit = function (event) {
    event.preventDefault();

    let guess = this.elements.guess.value;
    let temp = getTemp();


    if (!guess) {
        showMessage("Make a guess!");
        return;
      }

    //convert guess and temp to numbers
    guess = Number(guess);
    temp = Number(temp);

    //compare guess and temp, sending message to the player if it's correct or not
    if (guess === temp) {
        showMessage("Success!");
    }
    else if (isNaN(guess)){
        showMessage("That is not a number, guess again!");
    }
    else if (guess < temp) {
        showMessage("Higher! Guess again");
    }
    else if (guess > temp) {
        showMessage("Lower! Guess again");
    }
}

//function to show message about guess
function showMessage(message) {
    messageEl.innerHTML = message;
 }