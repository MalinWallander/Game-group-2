"use strict";

const wishlistEl = document.getElementById("wishlist");
const wishlistFormEl = document.getElementById("wishlistForm");

let wishes = JSON.parse(localStorage.getItem("wishes")) || [];
updateWishes();

function updateWishes () {
    localStorage.setItem("wishes", JSON.stringify(wishes));

    wishlistEl.innerHTML = "";

    for (let wish of wishes){
        const liEl = document.createElement("li");
        liEl.innerHTML = wish;

        const removeButton = document.createElement("button");
        removeButton.setAttribute("class", "remove-button");
        removeButton.innerHTML = "Remove";
        removeButton.onclick = function() {
            const index = wishes.indexOf(wish);
            wishes.splice(index, 1);

            updateWishes();
        }

       /* const doneButton = document.createElement("button");
        doneButton.setAttribute("class", "done-button");
        doneButton.innerHTML = "Done!"
        doneButton.onclick = function(){
           liEl.setAttribute("class", "done");


        }*/

        liEl.append(removeButton);

        wishlistEl.append(liEl);
    }
};

wishlistFormEl.onsubmit = function(event) {
    event.preventDefault();

    const input = wishlistFormEl.elements.wish;
    wishes.push(input.value);

    input.value = "";
    updateWishes();
};
