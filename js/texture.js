"use strict";

export { bumblebeeSoilCoor, leafCoor, underTheLog, underTheLeaf };

// bumblebeeSoil
let bumblebeeSoil = document.createElement("div");
bumblebeeSoil.classList.add("bumblebeeSoil");
(bumblebeeSoil.style.top = "430px"), (bumblebeeSoil.style.left = "1160px");
document.querySelector(".container").append(bumblebeeSoil);

let bumblebeeSoilCoor = {
  y: parseInt(bumblebeeSoil.style.top) + 70,
  x: parseInt(bumblebeeSoil.style.left) + 80,
};

// log
let logElem = document.querySelector(".log");
(logElem.style.top = "2200px"), (logElem.style.left = "1600px");

let logCoor = {
  y: parseInt(logElem.style.top),
  x: parseInt(logElem.style.left),
  centerY:
    parseInt(logElem.style.top) +
    parseInt(getComputedStyle(logElem).height) / 2,
  centerX:
    parseInt(logElem.style.left) +
    parseInt(getComputedStyle(logElem).width) / 2,
  height: parseInt(getComputedStyle(logElem).height),
  width: parseInt(getComputedStyle(logElem).width),
};

// under the log
function underTheLog(ins) {
  if (
    // the same top
    ins.y >= logCoor.y + 200 &&
    ins.y - logCoor.height + 250 <= logCoor.y &&
    // the same left
    ins.x >= logCoor.x &&
    ins.x - logCoor.width <= logCoor.x
  ) {
    logElem.style.opacity = "0.5";
    return true;
  } else {
    logElem.style.opacity = "1";
    return false;
  }
}

// leaf
let leafElem = document.querySelector(".leaf");
(leafElem.style.top = "1200px"), (leafElem.style.left = "300px");

let leafCoor = {
  y: parseInt(leafElem.style.top),
  x: parseInt(leafElem.style.left),
  centerY:
    parseInt(leafElem.style.top) +
    parseInt(getComputedStyle(leafElem).height) / 2,
  centerX:
    parseInt(leafElem.style.left) +
    parseInt(getComputedStyle(leafElem).width) / 2,
  height: parseInt(getComputedStyle(leafElem).height),
  width: parseInt(getComputedStyle(leafElem).width),
};

// under the leaf
function underTheLeaf(ins) {
  if (
    // the same top
    ins.y >= leafCoor.y &&
    ins.y - leafCoor.height <= leafCoor.y &&
    // the same left
    ins.x >= leafCoor.x &&
    ins.x - leafCoor.width <= leafCoor.x
  ) {
    // leafElem.style.opacity = "0.9";
    return true;
  } else {
    leafElem.style.opacity = "1";
    return false;
  }
}
