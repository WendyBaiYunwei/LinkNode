const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
let menu;

menu = document.querySelector('.menu');
//menu.classList.add('off');

cvs.addEventListener("contextmenu", e=> {
	e.preventDefault();
	menu.classList.remove('off');
});