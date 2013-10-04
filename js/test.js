'use strict';

// create divs
// click on div
// write index

// first method
var divs = [];

for(var i= 0; i< 5; i++){
    divs.push(createDiv(i));
}

for(var i in divs){
    divs[i].onclick = createHandler(i);
}

function createHandler(i){
    return function(){
        alert(i);
    }
}

function createDiv(i){
    var div = document.createElement("div");
    div.innerHTML = i;
    document.body.appendChild(div);
    return div;
}

// second method 
// NOT CLICK EVENT IN LOOP
var divs = [];

for(var i= 0; i< 5; i++){
  createDiv(i);
}

function createDiv(i){
  var div = document.createElement("div");
  div.innerHTML = i;
  div.onclick = function() {alert(i)};
  document.body.appendChild(div);
}