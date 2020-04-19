const cvs = document.querySelector(".canvas");
const title = document.querySelector(".title");

/*----add title----*/
var titleName;
document.addEventListener("keydown", function(e) {
	if (e.keyCode == 13) {
		const input = title.value;
		if (input) {
			var newEl = document.createElement('h1');
			newEl.innerHTML = input;
			e.target.parentNode.replaceChild(newEl,title);
		}
		title.value = "";
	}
});

/*----add node----*/
let menu;

menu = document.querySelector('.menu');
menu.classList.add('off');

cvs.addEventListener("contextmenu", e=> {
	e.preventDefault();
	menu.classList.remove('off');
	menu.style.top = `${e.clientY-70}px`;
	menu.style.left = `${e.clientX-20}px`;
	addMenuListeners();
});

function addMenuListeners() {
	document.getElementById("rc-add").addEventListener("click", addNode);
}

function addNode(ev) {
	menu.classList.add('off');

	var node = document.createElement("span");
	node.style.left = ev.pageX-20 + "px";
	node.style.top = ev.pageY-70 + "px";

	cvs.appendChild(node);
	ev.preventDefault();
	
	function move(e){
		var x = e.clientX;
		var y = e.clientY;
		node.style.left = x-20 + "px";
		node.style.top = y-70 + "px";
	}

	document.addEventListener('mousemove', move);
	
	cvs.onclick = function(e) {
		document.removeEventListener('mousemove', move);
	}
}