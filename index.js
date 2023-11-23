const container = document.querySelector(".container");
const gameModal = document.querySelector(".game-modal");
const btnTryAgain = document.querySelector(".play-again");
const coupon = document.querySelector(".tixContainer");
const remise = document.querySelector(".remise");
const titleModal = document.querySelector(".title");
const btnBegin = document.querySelector(".btn-begin");
const overlay = document.querySelector(".overlay");
const loginBox = document.querySelector(".login-box");
const inputName = document.querySelector("#name");
const inputDevis = document.querySelector("#devis");
const errorName = document.querySelector(".error-name");
const errorDevis = document.querySelector(".error-devis");
let audioResult;
let btn = document.querySelector(".game");
var number = 4000;
var currentWord;
var nbrPriseTen = 0;
var nbrPriseNine = 0;
var gamerName;

btnBegin.onclick = () => {
  if (!inputName.value) {
    errorName.textContent = "Veillez renseigner ce champ";
    errorName.style.display = "block";
  }
  if (!inputDevis.value) {
    errorDevis.textContent = "Veillez renseigner ce champ";
    errorDevis.style.display = "block";
  }
  if (inputDevis.value && inputName.value) {
    gamerName = inputName.value
    overlay.style.display = "none";
    loginBox.style.display = "none";
    errorName.textContent = "";
    errorName.style.display = "none";
    errorDevis.textContent = "";
    errorDevis.style.display = "none";
    inputDevis.value = "";
    inputName.value = "";
  }
};

btn.onclick = function () {
  btn.style.pointerEvents = "none";
  container.style.transition = "all 8s ease";
  container.style.transform = "rotate(" + number + "deg)";
  container.classList.add("blur");
  number += 4000;
  var audio = new Audio("./audio/Wheel.mp3");
  audio.play();
};

var gift = [
  "-6%",
  "-5%",
  "-4%",
  "-3%",
  "-2%",
  "-1%",
  "0%",
  "-7%",
  "-8%",
  "-9%",
  "-10%",
  "-20%",
];

const gameOver = (isVictory) => {
  const modalText = isVictory ? `${gamerName} a gagné` : `${gamerName} a perdu`;
  coupon.style.display = `${isVictory ? "block" : "none"}`;
  remise.innerHTML = `Remise ${currentWord}`;
  titleModal.style.color = `${isVictory ? "greenyellow" : "red"}`;
  titleModal.style.animation = `${
    isVictory ? "clignoter 0.8s infinite" : "droll 3s infinite"
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
  console.log(rdmNumber);
  if (rdmNumber < 1 / 3 && rdmNumber > 2 / 7) {
    currentWord = gift[5];
  } else if (rdmNumber < 2 / 7 && rdmNumber > 1 / 4) {
    currentWord = gift[4];
  } else if (rdmNumber < 1 / 4 && rdmNumber > 2 / 9) {
    currentWord = gift[3];
  } else if (rdmNumber < 2 / 9 && rdmNumber > 1 / 5) {
    currentWord = gift[2];
  } else if (rdmNumber < 1 / 5 && rdmNumber > 2 / 11) {
    currentWord = gift[1];
  } else if (rdmNumber < 2 / 11 && rdmNumber > 1 / 6) {
    currentWord = gift[0];
  } else if (rdmNumber < 1 / 6 && rdmNumber > 2 / 13) {
    currentWord = gift[7];
  } else if (rdmNumber < 2 / 13 && rdmNumber > 1 / 7) {
    currentWord = gift[8];
  } else if (rdmNumber < 1 / 7 && rdmNumber > 2 / 15) {
    currentWord = gift[9];
  } else if (rdmNumber < 2 / 15) {
    currentWord = gift[10];
  } else if (rdmNumber < 2 / 5 && rdmNumber > 1 / 3) {
    currentWord = gift[11];
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
  if (result == "-20%") {
    gift[11] = "0%";
  }
  if (result == "-10%") {
    nbrPriseTen += 1;
    if (nbrPriseTen == 2) {
      gift[10] = "0%";
    }
  }
  if (result == "-9%") {
    nbrPriseNine += 1;
    if (nbrPriseNine == 3) {
      gift[9] = "0%";
    }
  }

  console.log(gift);
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
  overlay.style.display = "block";
  loginBox.style.display = "block";
};
