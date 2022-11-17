const card = document.querySelectorAll(".cell");
const front = document.querySelectorAll(".front");
const container = document.querySelector(".container");
const score = document.querySelector(".score span");
const refreshButton = document.getElementById("refresh-button");
suffleImage();
clicking();
function suffleImage() {
  card.forEach((c) => {
    const num = [...Array(card.length).keys()];
    const random = Math.floor(Math.random() * card.length);

    c.style.order = num[random];
  });
}

function clicking() {
  for (let i = 0; i < card.length; i++) {
    front[i].classList.add("show");
    setInterval(() => {
      front[i].classList.remove("show");
    });

    card[i].addEventListener("click", () => {
      front[i].classList.add("flip");
      const flippedCard = document.querySelectorAll(".flip");

      if (flippedCard.length == 2) {
        container.style.pointerEvents = "none";
        setInterval(() => {
          container.style.pointerEvents = "all";
        });
        match(flippedCard[0], flippedCard[1]);
      }
    });
  }
}

function match(cardOne, cardTwo) {
  if (cardOne.dataset.index == cardTwo.dataset.index) {
    score.innerHTML = parseInt(score.innerHTML) + 1;
    cardOne.classList.remove("flip");
    cardTwo.classList.remove("flip");

    cardOne.classList.add("match");
    cardTwo.classList.add("match");
  } else {
    setTimeout(() => {
      cardOne.classList.remove("flip");
      cardTwo.classList.remove("flip");
    }, 1000);
  }

  if (score === 6) {
    alert = "You won";
  }
}

const refreshPage = () => {
  window.location.reload();
};
refreshButton.addEventListener("click", refreshPage);
