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
    console.log(`Create Game`);
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
    console.log(`renderToExternal`);

    this.extCtx.clearRect(0, 0, this.extWidth, this.extHeight);

    // Рисуем внутренний canvas на внешнем
    console.log(`scale = ${this.scale}`);
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
    console.log(`рисуем касание`);
    if (this.touch === null) {
      return;
    }

    ctx.save();

    ctx.beginPath();
    ctx.arc(this.touch.x, this.touch.y, radius, 0, 2 * Math.PI); // Рисуем круг
    ctx.fillStyle = "rgba(0, 119, 255, 0.3)"; // Цвет заливки
    ctx.fill(); // Заливаем круг
    ctx.strokeStyle = "#000000"; // Цвет обводки
    ctx.lineWidth = 0.5; // Толщина обводки
    ctx.stroke(); // Рисуем обводку

    ctx.restore();
  }

  // Метод для обновления и отрисовки
  render() {
    this.drawGame(this.intCtx); // Рисуем на внутреннем контексте
    this.drawTouch(this.intCtx, 20);
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
  }
}
