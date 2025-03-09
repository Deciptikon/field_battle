console.log(`start app ..."`);

//import { vkBridge } from "@vkontakte/vk-bridge/dist/browser.min.js";

import { PI, APP_NAME, COLORS } from "./utils/constants.js";
import { Game } from "./game/game.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

console.log(vkBridge);

const game = new Game(2500, 1080, vkBridge);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(`APP_NAME = "${APP_NAME}"`);

if (!ctx) {
  throw new Error("Could not get 2D context");
}

vkBridge
  .send("VKWebAppGetConfig")
  .then((data) => {
    console.log("получаем платформу");
    console.log(data.app);

    game.setPlatform(data.app);
    game.update(ctx);

    if (data.app === "vkclient" || data.app === "vkme") {
      //game.update(ctx,data.app);
    } else if (data.app === "vk.com") {
      //game.update(ctx,);
    } else if (data.app === "m.vk.com") {
      //game.update(ctx,);
    }
  })
  .catch((error) => {
    console.error(error);
  });

ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.beginPath();
ctx.arc(200, 100, 50, 0, Math.PI * 2);
ctx.fillStyle = "red";
ctx.fill();
ctx.closePath();
