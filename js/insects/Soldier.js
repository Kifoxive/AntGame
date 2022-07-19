"use strict";
import { Insect } from "./Insects.js";
import { antCoor } from "../script.js";
import { leafCoor } from "../texture.js";

export default class Soldier extends Insect {
  constructor() {
    super("soldier");
    this.step = 20;
    this.speed = Math.floor(Math.random() * (110 - 90) + 90);
    this.originalSpeed = this.speed;
    this.timer = true;
    this.insectTop;
    this.insectToRight;
    this.insectToLeft;

    this.slow = true;
  }

  startInsect() {
    function live() {
      this.insectGame = setInterval(() => this.play.call(this), this.speed);
      this.spawnInsect.call(this, "leaf");
    }

    live.call(this);
  }

  // Play

  play() {
    // if ant is near the soldier leaf by 10 steps
    if (
      // Math.abs(antCoor.y - leafCoor.centerY) <= 400 &&
      // Math.abs(antCoor.x - leafCoor.centerX) <= 400

      Math.abs(antCoor.y - this.insectCoor.y) <= 400 &&
      Math.abs(antCoor.x - this.insectCoor.x) <= 320
    ) {
      let dir = this.dirToTarget("leaf");
      this.slow = false;
      this.passive(dir);
    } // if soldier is perfectly on the leaf coor
    else if (
      this.insectCoor.y == leafCoor.y &&
      this.insectCoor.x == leafCoor.x
    ) {
      this.slow = true;
      this.passive(this.prevDirect);
    } else {
      this.slow = true;
      let dir = this.dirToTarget("leaf");
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
    if (this.timer == false) {
      return;
    }
    if (this.slow == true) {
      this.timer = false;
      setTimeout(
        () => (this.timer = true),
        Math.floor(Math.random() * (2000 - 1000) + 1000)
      );
    }

    // if (this.timer == true && this.slow == true) {
    //   // console.log("slow");
    //   this.timer = false;
    //   setTimeout(() => (this.timer = true), 2000);
    //   return;
    // }
    // console.log("fast");

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
      6: this.prevDirect, //  previos direction
      7: this.prevDirect,
    };
    let num = Math.floor(Math.random() * (7 - 1) + 1);

    this.prevDirect = futureDirect[num];
    this.move(this.prevDirect);
  }

  stop() {
    clearInterval(gameInt);
    // clearInterval(this.game);
  }
}
