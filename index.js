let container = document.querySelector(".container");
const modal = document.querySelector(".game-modal");
const gameModal = document.querySelector(".game-modal");
const btnTryAgain = document.querySelector(".play-again");
const coupon = document.querySelector(".tixContainer");
const remise = document.querySelector(".remise");
// const audio = document.querySelector(".audio")
let btn = document.querySelector(".game");
var number = 4000;
var currentWord;
btn.onclick = function () {
  container.style.transition = "all 10s ease";
  container.style.transform = "rotate(" + number + "deg)";
  container.classList.add("blur");
  number += 4000;
  var audio = new Audio("./audio/videoplayback.m4a");
  audio.play();
};

const gift = ["-6%", "-5%", "-4%", "-3%", "-2%", "-1%", "0%"];

const gameOver = (isVictory) => {
  const modalText = isVictory ? `Vous avez gagnez` : "Vous avez perdu";
  coupon.style.display = `${isVictory ? "block" : "none"}`;
  remise.innerHTML = `Remise ${currentWord}`;
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
  container.classList.remove("blur");
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
