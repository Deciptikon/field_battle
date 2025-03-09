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

if (vkBridge.isWebView() || vkBridge.isIframe()) {
  console.log("Код выполняется внутри окружения VK");
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
} else {
  console.log("Код выполняется вне окружения VK");

  game.setPlatform(`original`);
  game.update();
}
