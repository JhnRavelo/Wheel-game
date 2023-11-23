let container = document.querySelector(".container");
const modal = document.querySelector(".game-modal");
const gameModal = document.querySelector(".game-modal");
const btnTryAgain = document.querySelector(".play-again");
let btn = document.querySelector(".game");
var number = 2000;
var currentWord;
btn.onclick = function () {
  container.style.transform = "rotate(" + number + "deg)";
  number += 2000;
};

const gift = ["-6%", "-5%", "-4%", "-3%", "-2%", "-1%", "0%"];

const gameOver = (isVictory) => {
  // After game complete.. showing modal with relevant details
  const modalText = isVictory
    ? `Vous avez gagnez <b>${currentWord}</b>`
    : "Vous avez perdu";
  console.log(modalText);
  gameModal.querySelector(".img").src = `images/${
    isVictory ? "fireworks" : "lost"
  }.gif`;
  gameModal.querySelector("h4").innerText = isVictory
    ? "Felicitations!"
    : "Dommage!";
  gameModal.querySelector("p").innerHTML = `${modalText}`;
  gameModal.classList.add("show");
};

const runWheel = () => {
  const rdmNumber = Math.random();
  
  if (rdmNumber < 1 / 4 && rdmNumber > 1 / 5) {
    currentWord = gift[5];
  } else if (rdmNumber < 1 / 5 && rdmNumber > 1 / 6) {
    currentWord = gift[4];
  } else if (rdmNumber < 1 / 6 && rdmNumber > 1 / 7) {
    currentWord = gift[3];
  } else if (rdmNumber < 1 / 7 && rdmNumber > 1 / 8) {
    currentWord = gift[2];
  } else if (rdmNumber < 1 / 8 && rdmNumber > 1 / 9) {
    currentWord = gift[1];
  } else if (rdmNumber < 1 / 9) {
    currentWord = gift[0];
  } else {
    currentWord = gift[6];
  }
  return currentWord;
};

container.addEventListener("transitionend", () => {
  const result = runWheel();
  console.log(result);
  if (result != "0%") {
    gameOver(true);
  } else {
    gameOver(false);
  }
  modal.classList.add("show");
});

btnTryAgain.onclick = () => {
  modal.classList.remove("show");
};
