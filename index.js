let container = document.querySelector(".container");
const modal = document.querySelector(".game-modal")
const gameModal = document.querySelector(".game-modal")
let btn = document.querySelector(".game");
var number = 2000
var currentWord
btn.onclick = function () {
	container.style.transform = "rotate(" + number + "deg)";
	number += 2000;
}

const gift = ["-6%","-5%","-4%","-3%","-2%","-1%","0%"]

const gameOver = (isVictory) => {
    // After game complete.. showing modal with relevant details
    const modalText = isVictory ? `Vous avez gagnez <b>${currentWord}</b>` : 'Vous avez perdu';
    console.log(modalText)
    gameModal.querySelector(".img").src = `images/${isVictory ? 'fireworks' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Felicitations!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText}`;
    gameModal.classList.add("show");
}

const runWheel = () => {
    const rdmNumber = Math.random
    if(rdmNumber<1/30){
        currentWord = gift[5]
    }
    else if(rdmNumber<1/35){
        currentWord = gift[4]
    }
}

container.addEventListener("transitionend", ()=>{
    runWheel()
    gameOver(true)
    modal.classList.add("show")
})