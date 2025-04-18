import { Button } from "../utils/button.js";
import { Options } from "../option.js";
import { checkAds, showAds } from "../adsManager.js";
import { assetManager } from "../assetManager.js";
import { soundManager } from "../soundManager.js";

import { STATE_APP } from "../utils/constants.js";

import { loadScreen } from "./screens/loadScreen.js";
import { mainScreen } from "./screens/mainScreen.js";
import { optionsScreen } from "./screens/optionsScreen.js";
import { achievementsScreen } from "./screens/achievementsScreen.js";
import { aboutScreen } from "./screens/aboutScreen.js";
import { upgradeScreen } from "./screens/upgradeScreen.js";
import { dailyScreen } from "./screens/dailyScreen.js";
import { adsScreen } from "./screens/adsScreen.js";
import { battleScreen } from "./screens/battleScreen/battleScreen.js";

export class Game {
  constructor(ctx, bridge, options) {
    this.bridge = bridge;
    this.extCtx = ctx;

    // размер внутреннего контекста
    this.intWidth = options.width;
    this.intHeight = options.height;
    // размер внешнего контекста
    this.extWidth = this.extCtx.canvas.width;
    this.extHeight = this.extCtx.canvas.height;
    // масштабирование ко внешнему контексту
    this.scale = this.extHeight / this.intHeight;
    // масштабный размер внутреннего контекста
    this.scaledWidth = this.intWidth * this.scale;
    this.scaledHeight = this.intHeight * this.scale;
    // центрирование по ширине
    if (this.extWidth > this.scaledWidth) {
      this.x = (this.extWidth - this.scaledWidth) / 2.0;
    } else {
      this.x = 0;
    }
    this.y = 0;
    // создание внутреннего канваса
    this.intCanvas = document.createElement("canvas");
    this.intCanvas.width = this.intWidth;
    this.intCanvas.height = this.intHeight;
    // создание внутреннего контекста
    this.intCtx = this.intCanvas.getContext("2d");

    this.platform = null;
    this.touch = null;

    this.radiusRenderTouch =
      (Math.min(this.extWidth, this.extHeight) * 0.05) / this.scale;
    this.borderRenderTouch = 2;

    this.options = new Options(bridge);

    this.imageAssets = new assetManager(this.options); // набор изображений
    this.soundAssets = new soundManager(this.options); // набор звуков

    this.screens = {};
    this.currentScreen = null;

    this.stateGame = STATE_APP.PLAY;

    const toScreen = (key) => {
      if (this.screens[key]) {
        this.screens[key].restate();
        this.currentScreen = this.screens[key];
      }
    };

    const params = {
      x: this.x,
      y: this.y,
      w: this.extWidth / this.scale,
      h: this.extHeight / this.scale,
      bridge: bridge,
    };

    const addScreen = (key, screenClass) => {
      this.screens[key] = new screenClass(
        this.imageAssets,
        this.soundAssets,
        this.options,
        params,
        toScreen
      );
    };

    this.screens.loadScreen = new loadScreen(
      this.imageAssets,
      this.soundAssets,
      this.options,
      params,
      toScreen,
      () => {
        console.log("next screen");
        for (let name in this.screens) {
          if (name !== "loadScreen") {
            this.screens[name]?.init();
          }
        }
        this.currentScreen = this.screens.mainScreen;
      }
    );
    addScreen("mainScreen", mainScreen);
    addScreen("optionsScreen", optionsScreen);
    addScreen("achievementsScreen", achievementsScreen);
    addScreen("aboutScreen", aboutScreen);
    addScreen("upgradeScreen", upgradeScreen);
    addScreen("dailyScreen", dailyScreen);
    addScreen("adsScreen", adsScreen);
    addScreen("battleScreen", battleScreen);

    this.currentScreen = this.screens.loadScreen;

    console.log(`Create Game`);

    this.btt1 = new Button(
      function () {
        console.log(`CallBack ~~~`);
        checkAds(function () {
          console.log(`checkAds()`);
        });
      },
      {
        x: 500,
        y: 200,
        w: 300,
        h: 100,
      }
    );
    this.btt2 = new Button(
      function () {
        console.log(`CallBack !!!`);
        showAds(function () {
          console.log(`showAds()`);
        });
      },
      {
        x: 500,
        y: 500,
        w: 300,
        h: 100,
      }
    );
  }

  drawGame(ctx) {
    ctx.save();

    this.currentScreen.render(ctx);

    //ctx.fillStyle = "green";
    //ctx.fillRect(0, 0, this.intWidth, this.intHeight);

    //ctx.fillStyle = "red";
    //ctx.font = "50px Arial";
    //ctx.fillText(`this.platform = ${this.platform}`, 60, 90);

    ctx.restore();
  }

  renderToExternal() {
    this.extCtx.clearRect(0, 0, this.extWidth, this.extHeight);

    // Рисуем внутренний canvas на внешнем
    this.extCtx.drawImage(
      this.intCanvas,
      this.x,
      this.y,
      this.scaledWidth,
      this.scaledHeight
    );
  }

  setPlatform(platform) {
    this.platform = platform;
  }

  drawTouch(ctx, radius) {
    if (this.touch === null) {
      return;
    }

    ctx.save();

    ctx.beginPath();
    ctx.arc(this.touch.x, this.touch.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(0, 119, 255, 0.3)";
    ctx.fill();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = this.borderRenderTouch;
    ctx.stroke();

    ctx.restore();
  }

  render() {
    this.drawGame(this.intCtx); // Рисуем на внутреннем контексте
    this.drawTouch(this.intCtx, this.radiusRenderTouch);
    this.renderToExternal(); // Отрисовываем на внешнем контексте
  }

  setStateApp(stateApp) {
    this.soundAssets.setStateApp(stateApp);
    //if (stateApp === STATE_APP.PLAY) {
    this.currentScreen.update(this.touch, stateApp);
    //}
  }

  update(touch, deltaTime, stateApp) {
    this.deltaTime = deltaTime;
    if (touch === null) {
      this.touch = null;
    } else {
      this.touch = {
        x: (touch.x - this.x) / this.scale,
        y: (touch.y - this.y) / this.scale,
      };
    }

    //console.log(stateApp);

    if (stateApp === STATE_APP.PLAY) {
      this.currentScreen.update(this.touch, stateApp);
    }

    //обновление всех компонентов
    //this.btt1.update(this.touch);
    //this.btt2.update(this.touch);
  }
}
