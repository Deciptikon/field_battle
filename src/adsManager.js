import { RELEASE } from "./utils/constants.js";

function checkLocalAds(vkBridge, callback) {
  vkBridge
    .send("VKWebAppCheckNativeAds", { ad_format: "reward" })
    .then((data) => {
      if (data.result) {
        // Предзагруженная реклама есть.
        console.log("Предзагруженная реклама есть.");
        // Теперь можно создать кнопку
        // "Посмотрите рекламу".
        // ...
        callback();
      } else {
        console.log("Рекламные материалы не найдены.");
      }
    })
    .catch((error) => {
      console.log(error); /* Ошибка */
    });
}

function showNativeAds(vkBridge, callback) {
  vkBridge
    .send("VKWebAppShowNativeAds", { ad_format: "reward" })
    .then((data) => {
      if (data.result) {
        // Успех
        console.log("Реклама показана");
        callback();
        // Ошибка
      } else {
        console.log("Ошибка при показе");
      }
    })
    .catch((error) => {
      console.log(error); /* Ошибка */
    });
}

export function checkAds(callback) {
  if (RELEASE) {
    checkLocalAds(window.vkBridge, callback);
  } else {
    console.log("код работает, проверяем рекламу");
    setTimeout(callback, 5000);
  }
}

export function showAds(callback) {
  if (RELEASE) {
    showNativeAds(window.vkBridge, callback);
  } else {
    console.log("код работает, показываем рекламу");
    setTimeout(callback, 5000);
  }
}
