console.log(`start app ..."`);
import { APP_NAME } from "./utils/constants.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
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
//# sourceMappingURL=index.js.map