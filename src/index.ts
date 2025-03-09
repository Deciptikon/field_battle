console.log(`start app ..."`);

//import bridge from '@vkontakte/vk-bridge';
import { PI, APP_NAME, COLORS } from "./utils/constants.js";
import { Game } from "./game/game.js";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

const game = new Game(2160, 1080);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(`APP_NAME = "${APP_NAME}"`);

if (!ctx) {
  throw new Error("Could not get 2D context");
}

interface VKWebAppGetConfigResponse {
  app: string;
  // Другие поля, которые могут быть в ответе
}

vkBridge
  .send<VKWebAppGetConfigResponse>("VKWebAppGetConfig")
  .then((data: VKWebAppGetConfigResponse) => {
    console.log("получаем платформу");
    console.log(data.app);

    if (data.app === "vkclient" || data.app === "vkme") {
      console.log("data.app === vkclient");
    } else if (data.app === "vk.com") {
      console.log("data.app === vk.com");
    } else {
      console.log("data.app === other");
    }
  })
  .catch((error: Error) => {
    console.error(error);
  });

ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.beginPath();
ctx.arc(200, 100, 50, 0, Math.PI * 2);
ctx.fillStyle = "red";
ctx.fill();
ctx.closePath();

game.update(ctx);
