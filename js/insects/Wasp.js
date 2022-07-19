"use strict";
import { Insect } from "./Insects.js";
import { antCoor, life } from "../script.js";

export default class Wasp extends Insect {
  constructor() {
    super("wasp");
    this.step = 40;
    this.speed = Math.floor(Math.random() * (160 - 140) + 120);
    this.originalSpeed = this.speed;
    this.timer = true;
    this.insectTop;
    this.insectToRight;
    this.insectToLeft;
  }

  startInsect() {
    function live() {
      this.insectGame = setInterval(() => this.play.call(this), this.speed);
      this.spawnInsect.call(this);
    }

    live.call(this);
  }

  // Play

  play() {
    let dir = this.dirToTarget("ant");

    // if wasp range is greater or than 5 steps, passive
    if (
      Math.abs(this.insectCoor.y - antCoor.y) >= 200 ||
      Math.abs(this.insectCoor.x - antCoor.x) >= 200
    ) {
      this.passive(dir);
    } else {
      this.move(dir);
    }

    this.insect.style.top = this.insectCoor.y + "px";
    this.insect.style.left = this.insectCoor.x + "px";

    if (this.insectCoor.y == antCoor.y && this.insectCoor.x == antCoor.x) {
      life("wasp");
    }
  }

  move(dir) {
    this.rotate(dir);
    this.prevDirect = dir;
    if (dir == "left") {
      this.insectCoor.x -= this.step;
    } else if (dir == "leftTop") {
      this.insectCoor.y -= this.step;
      this.insectCoor.x -= this.step;
    } else if (dir == "top") {
      this.insectCoor.y -= this.step;
    } else if (dir == "topRight") {
      this.insectCoor.y -= this.step;
      this.insectCoor.x += this.step;
    } else if (dir == "right") {
      this.insectCoor.x += this.step;
    } else if (dir == "rightDown") {
      this.insectCoor.y += this.step;
      this.insectCoor.x += this.step;
    } else if (dir == "down") {
      this.insectCoor.y += this.step;
    } else if (dir == "downLeft") {
      this.insectCoor.y += this.step;
      this.insectCoor.x -= this.step;
    } else {
      return;
    }
    super.map();
  }

  passive(dir) {
    if (this.timer) {
      this.timer = false;
      setTimeout(() => (this.timer = true), 500);
    } else return;

    let directs = {
      1: "left",
      2: "leftTop",
      3: "top",
      4: "topRight",
      5: "right",
      6: "rightDown",
      7: "down",
      8: "downLeft",
    };

    let futureDirect = {
      1: this.prevDirect || directs[Math.floor(Math.random() * (8 - 1) + 1)], //  previos direction, or if it first step = random
      2: directs[Math.floor(Math.random() * (8 - 1) + 1)], // or new random direction
      3: dir, // or direct to ant
    };
    let num = Math.floor(Math.random() * (4 - 1) + 1); // 1 or 2 or 3

    this.prevDirect = futureDirect[num]; // 1, 2, 3
    this.move(futureDirect[num]);
  }

  stop() {
    clearInterval(gameInt);
    // clearInterval(this.game);
  }
}
