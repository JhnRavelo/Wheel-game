let container = document.querySelector(".container");
const gameModal = document.querySelector(".game-modal");
const btnTryAgain = document.querySelector(".play-again");
const coupon = document.querySelector(".tixContainer");
const remise = document.querySelector(".remise");
const titleModal = document.querySelector(".title");
let audioResult;
// const audio = document.querySelector(".audio")
let btn = document.querySelector(".game");
var number = 4000;
var currentWord;
btn.onclick = function () {
  btn.style.pointerEvents = "none";
  container.style.transition = "all 8s ease";
  container.style.transform = "rotate(" + number + "deg)";
  container.classList.add("blur");
  number += 4000;
  var audio = new Audio("./audio/Wheel.mp3");
  audio.play();
};

const gift = ["-6%", "-5%", "-4%", "-3%", "-2%", "-1%", "0%"];

const gameOver = (isVictory) => {
  const modalText = isVictory ? `Vous avez gagnez` : "Vous avez perdu";
  coupon.style.display = `${isVictory ? "block" : "none"}`;
  remise.innerHTML = `Remise ${currentWord}`;
  titleModal.style.color = `${isVictory ? "greenyellow" : "red"}`;
  titleModal.style.animation = `${
    isVictory ? "clignoter 0.8s infinite" : "droll 2s infinite"
  }`;
  titleModal.style.transition = "none";
  gameModal.querySelector(".img").src = `images/${
    isVictory ? "fireworks" : "lost"
  }.gif`;
  gameModal.querySelector("h4").innerText = isVictory
    ? "Félicitations!"
    : "Dommage!";
  gameModal.querySelector("p").innerHTML = `${modalText}`;
  gameModal.querySelector("p").style.color = `${
    isVictory ? "greenyellow" : "red"
  }`;
  gameModal.classList.add("show");
  setTimeout(() => {
    audioResult = new Audio(
      `./audio/${isVictory ? "Fireworks.m4a" : "Decu.mp3"}`
    );
    audioResult.play();
  }, 800);
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
  } else if (rdmNumber < 1 / 10) {
    currentWord = gift[0];
  } else {
    currentWord = gift[6];
  }
  return currentWord;
};

container.addEventListener("transitionend", () => {
  const audioModal = new Audio("./audio/Modal.mp3");
  audioModal.play();
  container.classList.remove("blur");
  const result = runWheel();
  console.log(result);
  if (result != "0%") {
    gameOver(true);
  } else {
    gameOver(false);
  }
});

btnTryAgain.onclick = () => {
  gameModal.classList.remove("show");
  btn.style.pointerEvents = "all";
  audioResult.pause();
};
