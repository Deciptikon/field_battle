console.log(`start app ..."`);

//import { vkBridge } from "@vkontakte/vk-bridge/dist/browser.min.js";

import {
  PI,
  APP_NAME,
  COLORS,
  BASE_WIDTH,
  BASE_HEIGHT,
  BASE_FPS,
  STATE_APP,
} from "./utils/constants.js";
import { input } from "./InputManager.js";
import { Animation, loadImage } from "./assetManager.js";
import { Game } from "./game/game.js";
import { vkBridge, initVKBridge } from "./bridge.js";

initVKBridge();

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const frameTime = 1000 / BASE_FPS; // Время одного кадра в миллисекундах
let lastTime = 0; // Время последнего кадра
let deltaTime = 0; // Время, прошедшее с последнего кадра

let platform = null; // тип платформы на которой запущен код

let stateApp = STATE_APP.PLAY;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
if (!ctx) {
  throw new Error("Could not get 2D context");
}

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    console.log("Вкладка скрыта");
    stateApp = STATE_APP.PAUSE;
  } else {
    console.log("Вкладка активна");
    stateApp = STATE_APP.PLAY;
  }
  game.setStateApp(stateApp);
});

//---------------------------------------------
const anim = new Animation({
  pos: 0,
  speed: 0.2,
});

let image1 = null;
loadImage("./src/img/seq_1.png")
  .then((img) => {
    console.log("Изображение загружено:");
    image1 = img;
    anim.fromSequention(img, 128, 128, 5, 1);
  })
  .catch((error) => {
    console.error(error.message);
  });
//const img = new Image();
//img.src = "./src/img/seq_1.png";
//img.onload = function () {
//console.log("Загрузил");
//ctx.drawImage(img, 0, 0, img.width, img.height);
//};
//---------------------------------------------

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

  game.setPlatform("original");
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
    game.update(input.getTouch(), deltaTime / 1000, stateApp);
    anim.update();

    // Отрисовываем кадр
    game.render();
    //const fr = anim.getCurrentFrame();
    //ctx.drawImage(fr, 0, 0, fr.width, fr.height);

    //if (image1 !== null) {
    //const croppp = cropImage(image1, 0, 0, 128, 128);
    //ctx.drawImage(croppp, 0, 0, croppp.width, croppp.height);
    //}
  }
}
