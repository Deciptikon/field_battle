import { Button } from "../utils/button.js";
import { checkAds, showAds } from "../adsManager.js";

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

    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, this.intWidth, this.intHeight);

    ctx.fillStyle = "red";
    ctx.font = "50px Arial";
    ctx.fillText(`this.platform = ${this.platform}`, 60, 90);

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

  // Метод для обновления и отрисовки
  render() {
    this.drawGame(this.intCtx); // Рисуем на внутреннем контексте
    this.btt1.render(this.intCtx);
    this.btt2.render(this.intCtx);
    this.drawTouch(this.intCtx, this.radiusRenderTouch);
    this.renderToExternal(); // Отрисовываем на внешнем контексте
  }

  update(touch, deltaTime) {
    this.deltaTime = deltaTime;
    if (touch === null) {
      this.touch = null;
    } else {
      this.touch = {
        x: (touch.x - this.x) / this.scale,
        y: (touch.y - this.y) / this.scale,
      };
    }

    //обновление всех компонентов
    this.btt1.update(this.touch);
    this.btt2.update(this.touch);
  }
}
