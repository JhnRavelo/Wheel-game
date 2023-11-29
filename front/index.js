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
const modalContent = document.querySelector(".content");
const img = document.querySelector("#img-result");
const audio = document.querySelector("#audio");
var audioResult;
let btn = document.querySelector(".game");
var number = 4000;
var currentWord;
var nbrPriseTen = 0;
var nbrPriseNine = 0;
var gamerName;
var gamerDevis;
var nbrGamer = 0;
var nbrWinner = 0;
var nbrProb = 1.3;
var nbrDefeat = 0;
var results = new Array();

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

const isThreeTimeWins = (results) => {
  if (results.length >= 3) {
    for (let i = 0; i < results.length - 1; i++) {
      if (
        results[i] == "victory" &&
        results[i] == results[i + 1] &&
        results[i + 1] == results[i + 2] 
      ) {
        nbrProb = 1.5;
        results.splice(i, 3);
      }
      if (
        results[i] == results[i + 1] &&
        results[i + 1] == results[i + 2] &&
        results[i + 2] == results[i + 3] &&
        results[i] == "defeat"
      ) {
        nbrProb = 1.3;
        results.splice(i, 4);
      }
    }
    console.log(nbrProb);
  }
};

btn.onclick = (e) => {
  e.preventDefault();
  btn.style.pointerEvents = "none";
  container.style.transition = "all 8s ease";
  container.style.transform = "rotate(" + number + "deg)";
  container.classList.add("blur");
  number += 4000;
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
  if (nbrGamer == 3) {
    gift[6] = "-30%";
  }

  postData(gamerName, gamerDevis, result);

  
  if (result != "0%") {
    results.push("victory");
    gameOver(true);
    isThreeTimeWins(results);
  } else {
    results.push("defeat");
    gameOver(false);
    isThreeTimeWins(results);
  }
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
  if (isVictory) {
    img.src = "./images/9.gif";
  } else {
    img.src = "./images/10.gif";
  }
  const first = modalContent.firstChild;
  modalContent.insertBefore(img, first);

  gameModal.querySelector("h4").innerText = isVictory
    ? "Félicitations!"
    : "Dommage!";
  gameModal.querySelector("p").innerHTML = `${modalText}`;
  gameModal.querySelector("p").style.color = `${isVictory ? "#1c2b39" : "red"}`;
  if (isVictory) {
    audio.src = "./audio/Victory.mp3";
    audio.play();
  } else {
    audio.src = "./audio/Defeat.mp3";
    audio.play();
  }
};

const runWheel = () => {
  const rdmNumber = Math.random() * 1.3;
  if (rdmNumber < 0.04) {
    currentWord = gift[10];
  } else if (rdmNumber < 0.08) {
    currentWord = gift[9];
  } else if (rdmNumber < 0.12) {
    currentWord = gift[8];
  } else if (rdmNumber < 0.16) {
    currentWord = gift[7];
  } else if (rdmNumber < 0.2) {
    currentWord = gift[0];
  } else if (rdmNumber < 0.25) {
    currentWord = gift[1];
  } else if (rdmNumber < 0.3) {
    currentWord = gift[2];
  } else if (rdmNumber < 0.45) {
    currentWord = gift[3];
  } else if (rdmNumber < 0.5) {
    currentWord = gift[4];
  } else if (rdmNumber < 0.55) {
    currentWord = gift[5];
  } else {
    currentWord = gift[6];
  }

  nbrGamer++;
  return currentWord;
};

const postData = async (nom, devis, result) => {
  const data = {
    nom,
    devis,
    result,
  };
  const res = await fetch("http://127.0.0.1:4000/add", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
  console.log(res);
};

container.addEventListener("transitionend", async () => {
  gameModal.classList.add("show");
});

btnTryAgain.onclick = () => {
  audio.pause();
  gameModal.classList.remove("show");
  btn.style.pointerEvents = "all";
  overlay.style.display = "block";
  loginBox.style.display = "block";
};
