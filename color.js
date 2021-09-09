"use strict";

let selector = document.querySelector("#colorSelector > div.input > label > input[type=color]");
const box = document.querySelector("#colorBoxMain");
const harmony = document.querySelector("#colorSelector > div.harmonies > label > select");
const box1 = document.querySelector("#colorBox1");
const box2 = document.querySelector("#colorBox2");
const box3 = document.querySelector("#colorBox3");
const box4 = document.querySelector("#colorBox4");

selector.addEventListener("input", function () {
  showHex(this.value);
  showRGB(this.value);
  changeColorMain(this.value);
  initHarmony(harmony.value);
});

function changeColorMain(hex) {
  box.style.backgroundColor = hex;
}

function showHex(hex) {
  document.querySelector("#hex").textContent = "HEX: " + hex.toUpperCase();
}

function showRGB(hex) {
  let r, g, b;

  r = parseInt(hex.substring(1, 2) + hex.substring(2, 3), 16);
  g = parseInt(hex.substring(3, 4) + hex.substring(4, 5), 16);
  b = parseInt(hex.substring(5, 6) + hex.substring(6, 7), 16);

  document.querySelector("#rgb").textContent = `RGB: ${r}, ${g}, ${b}`;
  showHSL(r, g, b);
}

function showHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }

  s *= 100;
  l *= 100;

  document.querySelector("#hsl").textContent = `HSL(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
}

harmony.addEventListener("change", initHarmony);

function initHarmony(selectValue) {
  let checkpoint = event.target.value.startsWith("#");
  if (checkpoint) {
  } else {
    selectValue = event.target.value;
  }

  if (selectValue == "None") {
    revertToWhite();
  } else if (selectValue == "Analogous") {
    displayAnalogous();
  } else if (selectValue == "Monochromatic") {
    displayMonochromatic();
  } else if (selectValue == "Triad") {
    displayTriad();
  } else if (selectValue == "Complementary") {
    displayComplementary();
  } else if (selectValue == "Compound") {
    displayCompound();
  } else if (selectValue == "Shades") {
    displayShades();
  }
}

function revertToWhite() {
  box1.style.backgroundColor = "white";
  box2.style.backgroundColor = "white";
  box3.style.backgroundColor = "white";
  box4.style.backgroundColor = "white";
}

function calcHSL() {
  const hslColor = document.querySelector("#hsl").textContent;

  let hslValues = {
    h: 0,
    s: 0,
    l: 0,
  };

  hslValues.h = hslColor.substring(hslColor.indexOf("(") + 1, hslColor.indexOf(","));
  hslValues.s = hslColor.substring(hslColor.indexOf(",") + 2, hslColor.indexOf("%"));
  hslValues.l = hslColor.substring(hslColor.indexOf("%") + 3, hslColor.length - 2);

  hslValues.h = Number(hslValues.h);
  hslValues.s = Number(hslValues.s);
  hslValues.l = Number(hslValues.l);

  return hslValues;
}

function displayAnalogous() {
  let HSL = calcHSL();



  HSL.h = Number(HSL.h);
  HSL.s = Number(HSL.s);
  HSL.l = Number(HSL.l);

  let hNew = HSL.h;
  if (hNew < 30) {
    hNew = hNew * 360 - 30;
    box1.style.backgroundColor = `HSL(${hNew}, ${HSL.s}%, ${HSL.l}%)`;
  } 

  hNew = HSL.h;

  if (hNew < 15) {
    hNew = hNew * 360 - 15;
    hNew = HSL.h;
    box2.style.backgroundColor = `hsl(${hNew}, ${HSL.s}%, ${HSL.l}%)`;
    const hslColor2 = document.querySelector("#hsl2").textContent = `HSL${hNew}, ${HSL.s}%, ${HSL.l}%)`;
    console.log(hslColor2);
  }

  if (hNew > 345) {
    hNew = hNew * 360 + 15;
    box3.style.backgroundColor = `hsl(${hNew}, ${HSL.s}%, ${HSL.l}%)`;}
 
  hNew = HSL.h;

  if (hNew > 330) {
    hNew = hNew * 330 + 35;
    box4.style.backgroundColor = `hsl(${hNew}, ${HSL.s}%, ${HSL.l}%)`;
  }

}