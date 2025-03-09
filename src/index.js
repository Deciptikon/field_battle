console.log(`start app ..."`);

//import { vkBridge } from "@vkontakte/vk-bridge/dist/browser.min.js";

import {
  PI,
  APP_NAME,
  COLORS,
  BASE_WIDTH,
  BASE_HEIGHT,
} from "./utils/constants.js";
import { Game } from "./game/game.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let platform = null;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
if (!ctx) {
  throw new Error("Could not get 2D context");
}

const game = new Game(ctx, vkBridge, {
  width: BASE_WIDTH,
  height: BASE_HEIGHT,
});
console.log(`APP_NAME = "${APP_NAME}"`);

vkBridge
  .send("VKWebAppGetConfig")
  .then((data) => {
    console.log("получаем платформу");
    console.log(data.app);

    platform = data.app;
    game.setPlatform(data.app);
    game.update();

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

if (platform === null) {
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(200, 100, 50, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}
