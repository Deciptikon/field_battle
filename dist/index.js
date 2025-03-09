console.log(`start app ..."`);
import bridge from "@vkontakte/vk-bridge";
import { APP_NAME } from "./utils/constants.js";
import { Game } from "./game/game.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const game = new Game(2160, 1080, bridge);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(`APP_NAME = "${APP_NAME}"`);
if (!ctx) {
    throw new Error("Could not get 2D context");
}
if (bridge.isWebView()) {
    console.log(`isWebView"`);
}
bridge.subscribe((event) => {
    console.log("Событие от VK Bridge:", event);
});
if (bridge.isWebView()) {
    bridge
        .send("VKWebAppInit")
        .then(() => {
        console.log("VKWebAppInit успешно выполнен");
        game.update(ctx);
    })
        .catch((error) => {
        console.error("Ошибка при инициализации VKWebAppInit:", error);
    });
}
else {
    console.warn("Приложение запущено вне окружения VK Mini Apps");
}
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.beginPath();
ctx.arc(200, 100, 50, 0, Math.PI * 2);
ctx.fillStyle = "red";
ctx.fill();
ctx.closePath();
//# sourceMappingURL=index.js.map