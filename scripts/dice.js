"use strict";

function firstTurn(){
  return Math.round(Math.random());
}

function startArrowDirection(){
  var direction = firstTurn();
  if (direction === 1){
    document.getElementById("arrowPic").src = "images/up.png"
    console.log("arrow up" + direction)
  }else {
    document.getElementById("arrowPic").src = "images/down.png"
    console.log("arrow up" + direction)
  }
}
