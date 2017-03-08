"use strict";

function firstTurn(){
  return Math.round(Math.random());
}

function startArrowDirection(){
  var direction = firstTurn();
  if (direction === 1){
    document.getElementById("arrowPic").src = "images/up.png";
    document.getElementById("turnID").innerHTML = "Hare Starts";
  }else {
    document.getElementById("arrowPic").src = "images/down.png";
    document.getElementById("turnID").innerHTML = "Tortoise Starts";
  }
}

function startPlayerLocation(){
  document.getElementById("hareImg").setAttribute("style", "margin-left: 0px");
  document.getElementById("tortImg").setAttribute("style", "margin-left: 0px");
}

function startPlayerScores(){
  document.getElementById("hareProgress").innerHTML = "0";
  document.getElementById("tortProgress").innerHTML = "0";
}

function startPlayerPowers(){
  document.getElementById("harePower").innerHTML = "No Powers";
  document.getElementById("tortPower").innerHTML = "No Powers";
}

function startGame(){
  startArrowDirection();
  startPlayerLocation();
  startPlayerScores();
  startPlayerPowers();
  outputResult("Let's Begin", 1);
}

function varifyTurn(){
    var turnId = document.getElementById("turnID").innerHTML;

    return turnId.charAt(0)
}

function toggleTurn(currentTurn){
    if(currentTurn === "T"){
      document.getElementById("arrowPic").src = "images/up.png";
      document.getElementById("turnID").innerHTML = "Hare's Turn";
    }else{
      document.getElementById("arrowPic").src = "images/down.png";
      document.getElementById("turnID").innerHTML = "Tortoise's Turn";
    }
}

function outputResult(result, level){
  if (level != 1){
    document.getElementById("results").setAttribute("class", "resultRoll");
    document.getElementById("results").innerHTML = result;
  }else {
    document.getElementById("results").setAttribute("class", "resultError");
    document.getElementById("results").innerHTML = result;

  }
}

function rollDie(sides){
  return ((Math.floor(Math.random() * sides)) + 1);
}

function movePlayer(player, length){

  var newLength = 0;
  if(player === "H"){
    var currentLength = Number(document.getElementById("hareProgress").innerHTML);
    if (currentLength + length < 0){
      newLength = 0;
    }else{
      newLength = currentLength + length;
    }
    var pxLength = newLength * 10;
    var moveLength = "margin-left: " + pxLength + "px";
    document.getElementById("hareProgress").innerHTML = newLength;
    document.getElementById("hareImg").setAttribute("style", moveLength);
  }else{
    var currentLength = Number(document.getElementById("tortProgress").innerHTML);
    if (currentLength + length < 0){
      newLength = 0;
    }else{
      newLength = currentLength + length;
    }
    var pxLength = newLength * 10;
    var moveLength = "margin-left: " + pxLength + "px";
    document.getElementById("tortProgress").innerHTML = newLength;
    document.getElementById("tortImg").setAttribute("style", moveLength);
  }
}

function rollEqualsWin(player, roll){
  if(player === "H"){
    var currentLength = Number(document.getElementById("hareProgress").innerHTML);
    if (currentLength + roll >= 100){
      return true;
    }
  }else{
    var currentLength = Number(document.getElementById("tortProgress").innerHTML);
    if (currentLength + roll >= 100){
      return true;
    }
  }
  return false;
}

function displayWinner(player){
  if(player === "H"){
    document.getElementById("hareProgress").innerHTML = "100";
    document.getElementById("hareImg").setAttribute("style", "margin-left: 1000px");
    outputResult("Hare Wins!", 1);
  }else{
    document.getElementById("tortProgress").innerHTML = "100";
    document.getElementById("tortImg").setAttribute("style", "margin-left: 1000px");
    outputResult("Tortoise Wins!", 1);
    }
}

function applyNegativeRolls(die, roll){
  var returnRoll = 1;
  if(die === 20){
    if(roll >= 14 && roll <= 17){
      returnRoll = roll*-1;
    }else{
      returnRoll = roll;
    }
  }else if(die === 12){
    if(roll >= 6 && roll <= 9){
      returnRoll = roll*-1;
    }else{
      returnRoll = roll;
    }
  }else if(die === 10){
    if(roll >= 5 && roll <= 7){
      returnRoll = roll*-1;
    }else{
      returnRoll = roll;
    }
  }else if(die === 8){
    if(roll === 4 || roll === 5){
      returnRoll = roll*-1;
    }else{
      returnRoll = roll;
    }
  }else if (die === 6){
    if(roll === 3){
      returnRoll = roll*-1;
    }else{
      returnRoll = roll;
    }
  }else if(die === 4){
    returnRoll = roll;
  }
  return returnRoll;
}

function shockHare(){
  var shockValue = -30;
  var turnId = varifyTurn();
  if (turnId === "T"){
    toggleTurn(turnId);
    movePlayer("H", shockValue);
    document.getElementById("tortPower").innerHTML = "No Powers";
  }
}

function shockTort(){
  var shockValue = -30;
  var turnId = varifyTurn();
  if (turnId === "H"){
    toggleTurn(turnId);
    movePlayer("T", shockValue);
    document.getElementById("harePower").innerHTML = "No Powers";
  }
}

function applyPowerRolls(player, roll){
  if (roll === 10 || roll === 13){
    if(player === "H"){
      if(document.getElementById("harePower").innerHTML === "No Powers"){
        var buttonContainer = document.getElementById("harePower");
        var newButton;
        document.getElementById("harePower").innerHTML = "";
        newButton = document.createElement("input");
        newButton.type = "button";
        newButton.value = "Electric Shock";
        newButton.id = "hareShock";
        newButton.onclick = shockTort;
        newButton.style = "margin-left: 10px";
        buttonContainer.appendChild(newButton);
      }
    }else{
      if(document.getElementById("tortPower").innerHTML === "No Powers"){
        var buttonContainer = document.getElementById("tortPower");
        var newButton;
        document.getElementById("tortPower").innerHTML = "";
        newButton = document.createElement("input");
        newButton.type = "button";
        newButton.value = "Electric Shock";
        newButton.id = "tortShock";
        newButton.onclick = shockHare;
        newButton.style = "margin-left: 10px";
        buttonContainer.appendChild(newButton);
      }
    }
  }
}


function applySpecialRolls(die, roll, player){
  var returnRoll = applyNegativeRolls(die, roll);
  applyPowerRolls(player, roll);
  return returnRoll;
}


function roll4(){
    var turnId = varifyTurn();
    var dieUsed = 4;
    if (turnId != "C"){
      var numberRoll = rollDie(dieUsed);
      numberRoll = applySpecialRolls(dieUsed, numberRoll, turnId);
      if (rollEqualsWin(turnId, numberRoll)){
        displayWinner(turnId);
      }else{
        movePlayer(turnId, numberRoll);
        outputResult(numberRoll);
        toggleTurn(turnId);
      }
    }else{
      var msg = "Please Click Play"
      outputResult(msg, 1);
    }
}

function roll6(){
    var turnId = varifyTurn();
    var dieUsed = 6;
    if (turnId != "C"){
      var numberRoll = rollDie(dieUsed);
      numberRoll = applySpecialRolls(dieUsed, numberRoll, turnId);
      if (rollEqualsWin(turnId, numberRoll)){
        displayWinner(turnId);
      }else{
        movePlayer(turnId, numberRoll);
        outputResult(numberRoll);
        toggleTurn(turnId);
      }
    }else{
      var msg = "Please Click Play"
      outputResult(msg, 1);
    }
}

function roll8(){
    var turnId = varifyTurn();
    var dieUsed = 8;
    if (turnId != "C"){
      var numberRoll = rollDie(dieUsed);
      numberRoll = applySpecialRolls(dieUsed, numberRoll, turnId);
      if (rollEqualsWin(turnId, numberRoll)){
        displayWinner(turnId);
      }else{
        movePlayer(turnId, numberRoll);
        outputResult(numberRoll);
        toggleTurn(turnId);
      }
    }else{
      var msg = "Please Click Play"
      outputResult(msg, 1);
    }
}

function roll10(){
    var turnId = varifyTurn();
    var dieUsed = 10;
    if (turnId != "C"){
      var numberRoll = rollDie(dieUsed);
      numberRoll = applySpecialRolls(dieUsed, numberRoll, turnId);
      if (rollEqualsWin(turnId, numberRoll)){
        displayWinner(turnId);
      }else{
        movePlayer(turnId, numberRoll);
        outputResult(numberRoll);
        toggleTurn(turnId);
      }
    }else{
      var msg = "Please Click Play"
      outputResult(msg, 1);
    }
}

function roll12(){
    var turnId = varifyTurn();
    var dieUsed = 12;
    if (turnId != "C"){
      var numberRoll = rollDie(dieUsed);
      numberRoll = applySpecialRolls(dieUsed, numberRoll, turnId);
      if (rollEqualsWin(turnId, numberRoll)){
        displayWinner(turnId);
      }else{
        movePlayer(turnId, numberRoll);
        outputResult(numberRoll);
        toggleTurn(turnId);
      }
    }else{
      var msg = "Please Click Play"
      outputResult(msg, 1);
    }
}

function roll20(){
    var turnId = varifyTurn();
    var dieUsed = 20;
    if (turnId != "C"){
      var numberRoll = rollDie(dieUsed);
      numberRoll = applySpecialRolls(dieUsed, numberRoll, turnId);
      if (rollEqualsWin(turnId, numberRoll)){
        displayWinner(turnId);
      }else{
        movePlayer(turnId, numberRoll);
        outputResult(numberRoll);
        toggleTurn(turnId);
      }
    }else{
      var msg = "Please Click Play"
      outputResult(msg, 1);
    }
}
