"use strict";
import { Insect } from "./Insects.js";
import { antCoor, life } from "../script.js";
import { bumblebeeSoilCoor } from "../texture.js";

export default class Bumblebee extends Insect {
  constructor() {
    super("bumblebee");
    this.step = 20;
    this.speed = Math.floor(Math.random() * (70 - 50) + 50);
    // this.speed = 60;
    this.originalSpeed = this.speed;
    this.timer = true;
    this.insectTop;
    this.insectToRight;
    this.insectToLeft;
    this.canAttack = true;
  }

  startInsect() {
    function live() {
      this.insectGame = setInterval(() => this.play.call(this), this.speed);
      this.spawnInsect.call(this, "honey");
    }

    live.call(this);
  }

  // Play

  play() {
    // if bumblebee range is less or than 4 steps, attack
    if (
      // Math.abs(this.insectCoor.y - antCoor.y) <= 120 &&
      // Math.abs(this.insectCoor.x - antCoor.x) <= 120 &&
      // // if bumblebee and bumblebeeSoil is 5 steps far, don`t attack
      // Math.abs(this.insectCoor.y - bumblebeeSoilCoor.y) <= 200 &&
      // Math.abs(this.insectCoor.x - bumblebeeSoilCoor.x) <= 200
      // if ant near the bumblebeeSoil
      Math.abs(antCoor.y - bumblebeeSoilCoor.y) <= 200 &&
      Math.abs(antCoor.x - bumblebeeSoilCoor.x) <= 200 &&
      this.canAttack == true
    ) {
      let dir = this.dirToTarget("ant");
      this.move(dir);
      if (this.insectCoor.y == antCoor.y && this.insectCoor.x == antCoor.x) {
        life("bumblebee");
        this.canAttack = false;
        setTimeout(() => (this.canAttack = true), 5000);
      }
    } else if (
      this.insectCoor.y == bumblebeeSoilCoor.y &&
      this.insectCoor.x == bumblebeeSoilCoor.x
    ) {
      this.passive(this.prevDirect);
    } else {
      let dir = this.dirToTarget("honey");
      this.passive(dir);
    }

    this.insect.style.top = this.insectCoor.y + "px";
    this.insect.style.left = this.insectCoor.x + "px";
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
      setTimeout(() => (this.timer = true), 70);
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

    let directsKeys = {
      left: 1,
      leftTop: 2,
      top: 3,
      topRight: 4,
      right: 5,
      rightDown: 6,
      down: 7,
      downLeft: 8,
    };
    let prevDirectNum = directsKeys[this.prevDirect];

    let futureDirect = {
      1: dir, // to bumblebeeSoil
      2: directs[prevDirectNum + 1 || 1], //  previos direction to right
      3: directs[prevDirectNum - 1 || 8], //  previos direction to left
      4: this.prevDirect, //  previos direction
      5: this.prevDirect,
      6: this.prevDirect,
      7: this.prevDirect,
    };
    let num = Math.floor(Math.random() * (8 - 1) + 1);

    this.prevDirect = futureDirect[num]; // 1 - 5
    this.move(this.prevDirect);
  }

  stop() {
    clearInterval(gameInt);
    // clearInterval(this.game);
  }
}
