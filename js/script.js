"use strict";

export {
  antCoor,
  life,
  container,
  mapHeight,
  mapWidth,
  containerHeight,
  containerWidth,
};
import { underTheLog, underTheLeaf } from "./texture.js";
import Wasp from "./insects/Wasp.js";
import GreenBeetle from "./insects/GreenBeetle.js";
import Bumblebee from "./insects/Bumblebee.js";
import Soldier from "./insects/Soldier.js";
import { makeFood, takeFood, foodCoor } from "./food.js";

function makeInsects() {
  let insects = {
    1: Wasp,
    2: GreenBeetle,
    3: Bumblebee,
    4: Soldier,
  };
  // let num = Math.floor(1 + Math.random() * 3);
  // new insects[num]().startInsect();
  new Wasp().startInsect();
  new GreenBeetle().startInsect();
  new Bumblebee().startInsect();
  new Soldier().startInsect();
}

let lifeScore = 100,
  lifeElem = document.querySelector(".life > p"),
  lifeYellowElem = document.querySelector(".life > span");

function life(value) {
  if (value === true) {
    lifeScore += 10;
  } else if (value == "wasp") {
    lifeScore -= 5;
  } else if (value == "greenBeetle") {
    lifeScore -= 5;
  } else if (value == "bumblebee") {
    lifeScore -= 30;
  }
  if (lifeScore > 100) {
    lifeScore = 100;
  } else if (lifeScore < 0) {
    lifeScore = 0;
  }

  lifeElem.style.width = `${lifeScore}%`;
  lifeYellowElem.style.width = `${lifeScore}%`;
}

let antCoor = {
  y: 400,
  x: 720,
};
let prevDirect;

let ant = document.createElement("div");
let container = document.querySelector(".container");

ant.style.top = antCoor.y + "px";
ant.style.left = antCoor.x + "px";
container.append(ant);
ant.classList.add("ant", "insect");
ant.innerHTML = `<div class="ant-top"></div>
                 <div class="ant-toRight"></div>
                 <div class="ant-toLeft"></div>`;
let antTop = document.querySelector(".ant-top"),
  antToRight = document.querySelector(".ant-toRight"),
  antToLeft = document.querySelector(".ant-toLeft");

let dir,
  sq = 40;

makeFood();
setTimeout(() => makeInsects(), 2000);

// keyboard
let pause = true;
document.addEventListener("keydown", direction);
function direction(event) {
  if ((event.keyCode == 37 || event.keyCode == 65) && dir != "right") {
    dir = "left";
    // game();
  } else if ((event.keyCode == 38 || event.keyCode == 87) && dir != "down") {
    dir = "top";
    // game();
  } else if ((event.keyCode == 39 || event.keyCode == 68) && dir != "left") {
    dir = "right";
    // game();
  } else if ((event.keyCode == 40 || event.keyCode == 83) && dir != "top") {
    dir = "down";
    // game();
  } else if (event.keyCode == 32) {
    // on space
    if (pause) {
      clearInterval(gameInt);
      pause = false;
    } else {
      makeInsects();
      pause = true;
      gameInt = setInterval(game, 100);
    }
  } else if (event.keyCode == 77) {
    largeMap.classList.toggle("show");
    mapContainer.classList.toggle("close");
  } else return;
}

document.addEventListener("keydown", direction);

let rotate = {
  left() {
    antTop.style.transform = "rotate(270deg)";
  },
  top() {
    antTop.style.transform = "rotate(0deg)";
  },
  right() {
    antTop.style.transform = "rotate(90deg)";
  },
  down() {
    antTop.style.transform = "rotate(180deg)";
  },
};

let contCoor = {
  y: parseInt(getComputedStyle(container).top),
  x: parseInt(getComputedStyle(container).left),
};

let slow = false,
  canRun = true;

// every 100ms
function game() {
  slow = underTheLog({ y: antCoor.y, x: antCoor.x }) ? true : false;
  // slow = underTheLeaf({ y: antCoor.y, x: antCoor.x }) ? true : false;
  underTheLeaf({ y: antCoor.y, x: antCoor.x });

  if (canRun == false) return;
  if (slow == true) {
    canRun = false;
    setTimeout(() => (canRun = true), 105);
    ant.style.transition = "0.4s";
  } else {
    ant.style.transition = "0.3s";
  }

  if (dir == "left") {
    antCoor.x -= sq;
  } else if (dir == "top") {
    antCoor.y -= sq;
  } else if (dir == "right") {
    antCoor.x += sq;
  } else if (dir == "down") {
    antCoor.y += sq;
  }

  // move the container (background)
  if (dir == "left") {
    contCoor.x += sq;
  } else if (dir == "top") {
    contCoor.y += sq;
  } else if (dir == "right") {
    contCoor.x -= sq;
  } else if (dir == "down") {
    contCoor.y -= sq;
  }

  if (prevDirect == "left" && dir == "top") {
    antTop.style.display = "none";
    antTop.style.transform = "rotate(0deg)";
    antToRight.style.display = "block";
    prevDirect = "top";
  } else if (prevDirect == "top" && dir == "left") {
    antTop.style.display = "none";
    antTop.style.transform = "rotate(270deg)";
    antToLeft.style.display = "block";
    prevDirect = "left";
  } else {
    antTop.style.display = "block";
    antToRight.style.display = "none";
    antToLeft.style.display = "none";
    try {
      rotate[dir]();
    } catch {
      null;
    }
    prevDirect = dir;
  }

  container.style.top = contCoor.y + "px";
  container.style.left = contCoor.x + "px";
  ant.style.top = antCoor.y + "px";
  ant.style.left = antCoor.x + "px";

  // move ant on map
  antPoint.style.top =
    (mapHeight * ((100 / containerHeight) * antCoor.y)) / 100 + "px";
  antPoint.style.left =
    (mapWidth * ((100 / containerWidth) * antCoor.x)) / 100 + "px";

  // move map
  map.style.bottom =
    (mapHeight * ((100 / containerHeight) * antCoor.y)) / 100 - 70 + "px"; // 70 px is point top from container
  map.style.right =
    (mapWidth * ((100 / containerWidth) * antCoor.x)) / 100 - 70 + "px";

  // move ant in large map
  largeMap_antPoint.style.top =
    (mapHeight * ((100 / containerHeight) * antCoor.y)) / 100 + "px";
  largeMap_antPoint.style.left =
    (mapWidth * ((100 / containerWidth) * antCoor.x)) / 100 + "px";

  if (antCoor.y == foodCoor.y && antCoor.x == foodCoor.x) {
    takeFood();
  }
}

// map
let mapContainer = document.querySelector(".mapContainer"),
  map = document.querySelector(".map"),
  antPoint = document.createElement("div");
antPoint.classList.add("antPoint");
map.append(antPoint);
antPoint.style.top = "70px";
antPoint.style.left = "70px";

let containerHeight = parseInt(getComputedStyle(container).height),
  containerWidth = parseInt(getComputedStyle(container).width);

map.style.height = containerHeight / 15 + "px";
map.style.width = containerWidth / 15 + "px";

let mapHeight = parseInt(map.style.height),
  mapWidth = parseInt(map.style.width);

// large map

let largeMap = document.querySelector(".large_map");
let largeMap_antPoint = document.createElement("div");
largeMap_antPoint.classList.add("antPoint");
largeMap.append(largeMap_antPoint);
largeMap.style.height = containerHeight / 10 + "px";
largeMap.style.width = containerWidth / 10 + "px";

// play
let gameInt = setInterval(game, 100);
