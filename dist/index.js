"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
if (!ctx) {
    throw new Error("Could not get 2D context");
}
ctx.fillStyle = "blue";
ctx.fillRect(50, 50, 200, 100);
ctx.beginPath();
ctx.arc(400, 300, 50, 0, Math.PI * 2);
ctx.fillStyle = "red";
ctx.fill();
ctx.closePath();
//# sourceMappingURL=index.js.map