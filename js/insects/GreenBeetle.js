"use strict";
import { Insect } from "./Insects.js";
import { antCoor, life } from "../script.js";

export default class GreenBeetle extends Insect {
  constructor() {
    super("greenBeetle");
    this.step = 40;
    this.speed = Math.floor(Math.random() * (70 - 50) + 50);

    this.originalSpeed = this.speed;
    this.timer = true;
    this.insectTop;
    this.insectToRight;
    this.insectToLeft;
    this.canAttackAgain = true;
    this.continueRun = false;
    this.prevDirect = "top";
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

    let antY = antCoor.y,
      antX = antCoor.x;

    // if wasp range is greater or equal of 20 steps, passive
    if (
      (Math.abs(this.insectCoor.y === antCoor.y) ||
        Math.abs(this.insectCoor.x === antCoor.x)) &&
      this.canAttackAgain === true &&
      Math.abs(this.insectCoor.y - antCoor.y) <= 800 &&
      Math.abs(this.insectCoor.x - antCoor.x) <= 800
    ) {
      this.dirToAttack = { y: antY, x: antX, dir: dir };
      this.run();
    } else if (this.continueRun === true) {
      this.run();
    } else {
      this.passive(dir);
    }

    this.insect.style.top = this.insectCoor.y + "px";
    this.insect.style.left = this.insectCoor.x + "px";

    if (this.insectCoor.y == antCoor.y && this.insectCoor.x == antCoor.x) {
      life("greenBeetle");
    }

    switch (dir) {
      case "left":
        if (this.insectCoor.x - 40 == antCoor.x) {
          life("greenBeetle");
        }
        break;
      case "top":
        if (this.insectCoor.y - 40 == antCoor.y) {
          life("greenBeetle");
        }
        break;
      case "right":
        if (this.insectCoor.x + 40 == antCoor.x) {
          life("greenBeetle");
        }
        break;
      case "down":
        if (this.insectCoor.y + 40 == antCoor.y) {
          life("greenBeetle");
        }
        break;
    }
  }

  run() {
    let dir = this.dirToTarget("ant");

    this.continueRun = true;
    this.canAttackAgain = false;

    // if beetle is in the ants place yet
    if (
      this.insectCoor.y == this.dirToAttack.y &&
      this.insectCoor.x == this.dirToAttack.x
    ) {
      this.continueRun = false;
      this.canAttackAgain = true;
    }
    // can again run to ant
    else if (antCoor.y == this.dirToAttack.y && this.dirToAttack == dir) {
      this.dirToAttack.x = antCoor.x;
      this.move(this.dirToAttack.dir);
    } else if (antCoor.x == this.dirToAttack.x && this.dirToAttack == dir) {
      this.dirToAttack.y = antCoor.y;
      this.move(this.dirToAttack.dir);
    } else {
      this.move(this.dirToAttack.dir);
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

  passive() {
    if (this.timer) {
      this.timer = false;
      setTimeout(() => (this.timer = true), 1000);
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
      1: this.prevDirect, //  previos direction
      2: directs[prevDirectNum + 1 || 1], //  previos direction to right
      3: directs[prevDirectNum - 1 || 8], //  previos direction to left
      4: this.prevDirect, //  previos direction
    };
    let num = Math.floor(Math.random() * (5 - 1) + 1);

    this.prevDirect = futureDirect[num] || "top"; // ! ! ! if undefined

    this.move(this.prevDirect);
  }

  stop() {
    clearInterval(gameInt);
  }
}
