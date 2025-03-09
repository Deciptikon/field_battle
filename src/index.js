console.log(`start app ..."`);

//import { vkBridge } from "@vkontakte/vk-bridge/dist/browser.min.js";

import {
  PI,
  APP_NAME,
  COLORS,
  BASE_WIDTH,
  BASE_HEIGHT,
  BASE_FPS,
} from "./utils/constants.js";
import { input } from "./InputManager.js";
import { Game } from "./game/game.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const frameTime = 1000 / BASE_FPS; // Время одного кадра в миллисекундах
let lastTime = 0; // Время последнего кадра
let deltaTime = 0; // Время, прошедшее с последнего кадра

let platform = null; // тип платформы на которой запущен код

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
      requestAnimationFrame(loop);

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
  requestAnimationFrame(loop);
}

function loop(currentTime) {
  requestAnimationFrame(loop);

  // Вычисляем deltaTime (время, прошедшее с последнего кадра)
  if (!lastTime) lastTime = currentTime;
  deltaTime = currentTime - lastTime;

  // Если прошло достаточно времени для следующего кадра
  if (deltaTime >= frameTime) {
    lastTime = currentTime - (deltaTime % frameTime); // Корректируем lastTime

    // Обновляем игру
    game.update(input.getTouch(), deltaTime / 1000);

    // Отрисовываем кадр
    game.render();
  }
}
