console.log(`start app ..."`);

import { PI, APP_NAME, COLORS } from "./utils/constants.js";
import { Game } from "./game/game.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//console.log(bridge);

const game = new Game(2160, 1080, window.vkBridge);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(`APP_NAME = "${APP_NAME}"`);

if (!ctx) {
  throw new Error("Could not get 2D context");
}

ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.beginPath();
ctx.arc(200, 100, 50, 0, Math.PI * 2);
ctx.fillStyle = "red";
ctx.fill();
ctx.closePath();

game.update(ctx);
