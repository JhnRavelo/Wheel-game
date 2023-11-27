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
var gamerDevis;
var nbrGamer = 0;

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
    gamerName = inputName.value;
    gamerDevis = inputDevis.value;
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

btn.onclick = () => {
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
  gameModal.querySelector("p").style.color = `${isVictory ? "#1c2b39" : "red"}`;
  gameModal.classList.add("show");
  setTimeout(() => {
    audioResult = new Audio(
      `./audio/${isVictory ? "Fireworks.m4a" : "Decu.mp3"}`
    );
    audioResult.play();
  }, 800);
};

const runWheel = () => {
  const rdmNumber = Math.random() * 1.1;
  console.log(rdmNumber);
  if (rdmNumber < 0.05) {
    currentWord = gift[10];
  } else if (rdmNumber < 0.10) {
    currentWord = gift[9];
  } else if (rdmNumber < 0.15) {
    currentWord = gift[8];
  } else if (rdmNumber < 0.20) {
    currentWord = gift[7];
  } else if (rdmNumber < 0.25) {
    currentWord = gift[0];
  } else if (rdmNumber < 0.31) {
    currentWord = gift[1];
  } else if (rdmNumber < 0.38) {
    currentWord = gift[2];
  } else if (rdmNumber < 0.46) {
    currentWord = gift[3];
  } else if (rdmNumber < 0.55) {
    currentWord = gift[4];
  } else if (rdmNumber < 0.7) {
    currentWord = gift[5];
  } else {
    currentWord = gift[6];
  }

  nbrGamer ++;
  return currentWord;
};

const postData = async (nom, devis, result) => {
  const data = {
    nom,
    devis,
    result,
  };
  await fetch("/add", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  });
};

container.addEventListener("transitionend", () => {
  const audioModal = new Audio("./audio/Modal.mp3");
  audioModal.play();
  container.classList.remove("blur");
  const result = runWheel();
  if (result == "-30%") {
    gift[6] = "0%";
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
  if (nbrGamer == 5 ) {
    gift[6] = "-30%";
  }
  postData(gamerName, gamerDevis, result);

  if (result != "0%") {
    gameOver(true);
  } else {
    gameOver(false);
  }
  console.log(gift);
});

btnTryAgain.onclick = () => {
  gameModal.classList.remove("show");
  btn.style.pointerEvents = "all";
  audioResult.pause();
  overlay.style.display = "block";
  loginBox.style.display = "block";
};
