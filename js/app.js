const cvs = document.querySelector(".canvas");
const realcvs = document.querySelector(".real-canvas");
const ctx = realcvs.getContext("2d");
const title = document.querySelector(".title");

ctx.scale(0.1,0.1);
ctx.strokeStyle = "black";
/*----add title----*/
var titleName;
document.addEventListener("keydown", function(e) {
	if (e.keyCode == 13) {
		const input = title.value;
		if (input) {
			var newEl = document.createElement('h1');
			newEl.innerHTML = input;
			newEl.attributes.tag = "titleName";
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
let nodeAdded = false;

menu = document.querySelector('.menu');
menu.classList.add('off');

cvs.addEventListener("contextmenu", e=> {
	e.preventDefault();
	menu.classList.remove('off');
	menu.style.top = `${e.clientY-70}px`;
	menu.style.left = `${e.clientX-20}px`;
	addMenuListeners(e.target);
});

function addMenuListeners(clicked) {
	if (clicked.attributes.class.value == "real-canvas" || clicked.attributes.class.value == "canvas") {
		document.getElementById("rc-add").addEventListener("click", addNode);
	}
	else {
		document.getElementById("rc-add").removeEventListener("click", addNode);
		document.getElementById("rc-add").addEventListener("click", addNodeWithParent(clicked));
	}
}


function addNodeWithParent(clicked) {
	menu.classList.add('off');

	var nodeVar = {};
	nodeVar.id = id;
	
	nodeVar.children = [];
	nodes.push(nodeVar);
	
	var node = document.createElement("span");
	node.attributes.class = "node"+id;
	node.style.left = clicked.getBoundingClientRect().left-10 + "px";
	node.style.top = clicked.getBoundingClientRect().top-75 + "px";

	cvs.appendChild(node);
	var latestNode = nodes[id];
	
	clickedClass = clicked.attributes.class;
	console.log(clickedClass);
	
	var parentId = Number(clickedClass.slice(4));
	var parentNode = nodes[parentId];
	parentNode.children.push(latestNode);
	console.log(id, parentId, parentNode.children);
	
	id++;
	
	

	function move(e){
		var x = e.clientX;
		var y = e.clientY;
		node.style.left = x-10 + "px";
		node.style.top = y-75 + "px";
	}

	document.addEventListener('mousemove', move);
	
	cvs.onclick = function(e) {
		// draw line
		parentLeft = clicked.offsetLeft+20;
		parentTop = clicked.offsetTop-40;
		childLeft = node.offsetLeft+20;
		childTop = node.offsetTop-40;
		ctx.beginPath();
		ctx.moveTo(parentLeft, parentTop);
		ctx.lineTo(childLeft, childTop);
		ctx.stroke();
		document.removeEventListener('mousemove', move);
	}
}

function addNode(ev) {
	menu.classList.add('off');
	
	var nodeVar = {};
	nodeVar.id = id;
	
	nodeVar.children = [];
	nodes.push(nodeVar);
	
	var node = document.createElement("span");
	node.attributes.class = "node"+id;
	node.style.left = ev.pageX-20 + "px";
	node.style.top = ev.pageY-70 + "px";

	cvs.appendChild(node);
	id++;
	
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