let container = document.querySelector(".container");
let btn = document.querySelector(".game");
var number = 2000
btn.onclick = function () {
	container.style.transform = "rotate(" + number + "deg)";
	number += 2000;
}