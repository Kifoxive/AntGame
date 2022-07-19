"use strict"

export { Insect }
import {
  antCoor,
  container,
  mapHeight,
  mapWidth,
  containerHeight,
  containerWidth,
} from "../script.js"
import { leafCoor, bumblebeeSoilCoor } from "../texture.js"

function findEmptyId() {
  let allElem = document.querySelectorAll(".insect") // взяти всі елементи .note
  nextNum: for (let empty = 1; empty < 20; empty++) {
    // перечислити всі доступні елементи
    for (let elem of allElem) {
      elem = elem.id.slice(-1)
      if (empty == elem) {
        continue nextNum
      }
    }
    return empty
  }
}

class Insect {
  constructor(animal) {
    this.insectId = `insect` + findEmptyId()
    this.prevDirect
    this.prevSide
    this.animal = animal
    this.prevDirect = "top" // ! ! !
    this.map = document.querySelector(".map")
    this.largeMap = document.querySelector(".large_map")

    this.insMapPoint = document.createElement("div")
    this.insMapPoint.classList.add(`${animal}Point`)
    this.map.append(this.insMapPoint)

    this.largeMap_insMapPoint = document.createElement("div")
    this.largeMap_insMapPoint.classList.add(`${animal}Point`)
    this.largeMap.append(this.largeMap_insMapPoint)
  }

  map() {
    this.insMapPoint.style.top =
      (mapHeight * ((100 / containerHeight) * this.insectCoor.y)) / 100 + "px"
    this.insMapPoint.style.left =
      (mapWidth * ((100 / containerWidth) * this.insectCoor.x)) / 100 + "px"

    this.largeMap_insMapPoint.style.top =
      (mapHeight * ((100 / containerHeight) * this.insectCoor.y)) / 100 + "px"
    this.largeMap_insMapPoint.style.left =
      (mapWidth * ((100 / containerWidth) * this.insectCoor.x)) / 100 + "px"
  }

  spawnInsect(where) {
    this.insect = document.createElement("div")
    container.append(this.insect)
    this.insect.classList.add(`${this.animal}`, "insect")
    this.insect.innerHTML = `<div class="insect-top"></div>
    <div class="insect-toRight"></div>
    <div class="insect-to315deg"></div>
    <div class="insect-to270deg"></div>
    <div class="insect-to225deg"></div>`

    this.insect.setAttribute("id", this.insectId)

    this.insectTop = document.querySelector(`#${this.insectId} > .insect-top`)
    this.insectToRight = document.querySelector(
      `#${this.insectId} > .insect-toRight`
    )
    this.insectTo315deg = document.querySelector(
      `#${this.insectId} > .insect-to315deg`
    )
    this.insectTo270deg = document.querySelector(
      `#${this.insectId} > .insect-to270deg`
    )
    this.insectTo225deg = document.querySelector(
      `#${this.insectId} > .insect-to225deg`
    )

    // random
    if (where == "honey") {
      this.insectCoor = {
        y: bumblebeeSoilCoor.y,
        x: bumblebeeSoilCoor.x,
      }
    } else if (where == "log") {
      this.insectCoor = {
        y: logCoor.centerY,
        x: logCoor.centerX,
      }
    } else if (where == "leaf") {
      this.insectCoor = {
        y: leafCoor.centerY,
        x: leafCoor.centerX,
      }
    } else {
      do {
        this.insectCoor = {
          // Math.floor(1 + Math.random() * (16 - 2)) * 40
          y: Math.floor(Math.random() * (20 - 2) + 2) * 40,
          x: Math.floor(Math.random() * (30 - 2) + 2) * 40,
        }
      } while (
        Math.abs(this.insectCoor.y - antCoor.y) <= 120 ||
        Math.abs(this.insectCoor.x - antCoor.x) <= 120
      )
    }
    this.insect.style.top = this.insectCoor.y + "px"
    this.insect.style.left = this.insectCoor.x + "px"
  }

  rotate(arg) {
    // let trn = " translate(-50%, 0)";
    let trn = ""
    let deg0 = this.insectTop.style.transform === `rotate(0deg)` // ${trn}

    this.insectToRight.style.display = "none"
    this.insectTo315deg.style.display = "none"
    this.insectTo270deg.style.display = "none"
    this.insectTo225deg.style.display = "none"
    // from left to right (360 - 0)
    if (this.prevSide == "left" && arg == "top") {
      this.insectTop.style.display = "none"
      this.insectTop.style.transform = `rotate(0deg) ${trn}`
      this.insectToRight.style.display = "block"
      this.prevDirect = "top"
      this.prevSide = "right"
      return
    }
    // from 0 to 315
    else if (deg0 == true && arg == "leftTop") {
      this.insectTop.style.display = "none"
      this.insectTop.style.transform = `rotate(315deg) ${trn}`
      this.insectTo315deg.style.display = "block"
      this.prevDirect = "leftTop"
      this.prevSide = "left"
    }
    // from 0 to 270
    else if (deg0 == true && arg == "left") {
      this.insectTop.style.display = "none"
      this.insectTop.style.transform = `rotate(270deg) ${trn}`
      this.insectTo270deg.style.display = "block"
      this.prevDirect = "left"
      this.prevSide = "left"
    }
    // from 0 to 225
    else if (deg0 == true && arg == "downLeft") {
      this.insectTop.style.display = "none"
      this.insectTop.style.transform = `rotate(225deg) ${trn}`
      this.insectTo225deg.style.display = "block"
      this.prevDirect = "downLeft"
      this.prevSide = "left"
    }
    // just from 0 - W360
    else {
      this.insectTop.style.display = "block"
      this.insectToRight.style.display = "none"
      this.insectTo315deg.style.display = "none"
      this.insectTo270deg.style.display = "none"
      this.insectTo225deg.style.display = "none"
      this.prevDirect = arg

      if (arg == "left") {
        this.insectTop.style.transform = `rotate(270deg) ${trn}`
        this.prevSide = "left"
      } else if (arg == "top") {
        this.insectTop.style.transform = `rotate(0deg) ${trn}`
        this.prevSide = "right"
      } else if (arg == "right") {
        this.insectTop.style.transform = `rotate(90deg) ${trn}`
        this.prevSide = "right"
      } else if (arg == "down") {
        this.insectTop.style.transform = `rotate(180deg) ${trn}`
        this.prevSide = "left"
      } else if (arg == "leftTop") {
        this.insectTop.style.transform = `rotate(315deg) ${trn}`
        this.prevSide = "left"
      } else if (arg == "topRight") {
        this.insectTop.style.transform = `rotate(45deg) ${trn}`
        this.prevSide = "right"
      } else if (arg == "rightDown") {
        this.insectTop.style.transform = `rotate(135deg) ${trn}`
        this.prevSide = "right"
      } else if (arg == "downLeft") {
        this.insectTop.style.transform = `rotate(225deg) ${trn}`
        this.prevSide = "left"
      } else {
        return
      }
    }
  }

  dirToTarget(target, from) {
    let dir,
      dirY,
      dirX,
      short = 0

    let targetY,
      targetX,
      insY = this.insectCoor.y,
      insX = this.insectCoor.x

    switch (target) {
      case "ant":
        targetY = antCoor.y
        targetX = antCoor.x
        break
      case "honey":
        targetY = bumblebeeSoilCoor.y
        targetX = bumblebeeSoilCoor.x
        break
      case "log":
        targetY = logCoor.centerY
        targetX = logCoor.centerX
        break
      case "leaf":
        targetY = leafCoor.centerY
        targetX = leafCoor.centerX
    }

    if (insY > targetY) {
      dir = "top"
      dirY = "top"
      short = insY - targetY
    }
    if (insY < targetY) {
      dir = "down"
      dirY = "down"
      short = targetY - insY
    }
    if (insX > targetX && insX - targetX > short) {
      dir = "left"
    }
    if (insX < targetX && targetX - insX > short) {
      dir = "right"
    }

    // dir X
    if (insX > targetX) {
      dirX = "left"
    }
    if (insX < targetX) {
      dirX = "right"
    }

    // diagonal;
    if (insY !== targetY || insX !== targetX) {
      if (dirY == "down" && dirX == "right") {
        dir = "rightDown"
        // this.speed += Math.floor(this.speed * 2); // because of diagonal
      }
      if (dirY == "top" && dirX == "right") {
        dir = "topRight"
        // this.speed += Math.floor(this.speed * 2);
      }
      if (dirY == "down" && dirX == "left") {
        dir = "downLeft"
        // this.speed += Math.floor(this.speed * 2);
      }
      if (dirY == "top" && dirX == "left") {
        dir = "leftTop"
        // this.speed += Math.floor(this.speed * 2);
      }
    }

    if (from == "from") {
      if (dir == "left") {
        dir = "right"
      } else if (dir == "leftTop") {
        dir = "rightDown"
      } else if (dir == "top") {
        dir = "down"
      } else if (dir == "topRight") {
        dir = "downLeft"
      } else if (dir == "right") {
        dir = "down"
      } else if (dir == "rightDown") {
        dir = "leftTop"
      } else if (dir == "down") {
        dir = "top"
      } else if (dir == "downLeft") {
        dir = "topRight"
      } else {
        return
      }
    }

    return dir
  }
}
