"use strict";

//set constants for elements 
const wishlistEl = document.getElementById("wishlist");
const wishlistFormEl = document.getElementById("wishlistForm");

//creating an object from the string inputted by user, inputting into array of objects
let wishes = JSON.parse(localStorage.getItem("wishes")) || [];
updateWishes();

//creating the array with stored and new information inputted by the user
function updateWishes () {
    localStorage.setItem("wishes", JSON.stringify(wishes));
    //setting a blank string as the list to beging with
    wishlistEl.innerHTML = "";

    //creating a list item with every new and stored index of the array of wishes
    for (let wish of wishes){
        const liEl = document.createElement("li");
        //setting the text of the list item to the inputted 
        liEl.innerHTML = wish;

        //create a button when a new list item is created, and set it to remove the item in question when clicked
        const removeButton = document.createElement("button");
        //setting attribute to the button
        removeButton.setAttribute("class", "remove-button");
        removeButton.innerHTML = "Remove";
        removeButton.onclick = function() {
            const index = wishes.indexOf(wish);
            //splice out the object in the array with the specific index
            wishes.splice(index, 1);

            //create the array all over again
            updateWishes();
        }

        //append the button to the list item
        liEl.append(removeButton);

        //append the list item to the array
        wishlistEl.append(liEl);
    }
};

//push the newest list item to the array
wishlistFormEl.onsubmit = function(event) {
    //prevent reloading of the page when user press submit
    event.preventDefault();

    //set the value of the information inputted and push it to the array "wishes"
    const input = wishlistFormEl.elements.wish;
    wishes.push(input.value);

    input.value = "";
    updateWishes();
};
