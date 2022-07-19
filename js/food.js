"use strict";

export { makeFood, takeFood, foodCoor };
import { life } from "./script.js";

let container = document.querySelector(".container");

let foodCoor = {
  y: null,
  x: null,
};

function makeFood() {
  let food;
  foodCoor = {
    y: Math.floor(1 + Math.random() * (20 - 2)) * 40,
    x: Math.floor(1 + Math.random() * (30 - 2)) * 40,
  };

  function randomFood() {
    let foods = {
      1: "apple",
      2: "pear",
      3: "cabbage",
      4: "carrot",
    };
    let num = Math.floor(1 + Math.random() * 4);
    food = document.createElement("div");
    food.classList.add(foods[num], "food");
  }

  function randomSpawn() {
    food.style.top = foodCoor.y + "px";
    food.style.left = foodCoor.x + "px";
  }

  randomFood();
  container.append(food);
  randomSpawn();
}

let score = 0,
  scoreElem = document.querySelector(".score > p");
scoreElem.innerHTML = "Score: " + score;

function takeFood() {
  life(true);
  document.querySelector(".food").remove();
  console.log(score);
  score++;
  scoreElem.innerHTML = "Score: " + score;
  makeFood();
}
