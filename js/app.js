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
			newEl.attributes.tag = "titleName";
			//console.log(newEl.attributes.tag);
			e.target.parentNode.replaceChild(newEl,title);
		}
		title.value = "";
	}
});

// rename the title
document.addEventListener("click", function(e) {
	if (e.target.attributes.tag == "titleName") {
		e.target.parentNode.replaceChild(title,e.target);
	}
});

/*----add node----*/
let menu;
let nodes = [];
let id = 0;

menu = document.querySelector('.menu');
menu.classList.add('off');

cvs.addEventListener("contextmenu", e=> {
	clicked = e.target;
	console.log(clicked.attributes.class);
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
	
	var nodeVar = {};
	nodeVar.id = id;
	id++;
	nodeVar.children = null;
	nodes.push(nodeVar);
	
	var node = document.createElement("span");
	node.attributes.class = "node"+id;
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

/*------remove node-------*/
/*
document.addEventListener("click", function(e) {
	if (e.target.attributes.tag == "titleName") {
		e.target.parentNode.replaceChild(title,e.target);
	}
});
*/