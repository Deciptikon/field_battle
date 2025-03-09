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
    this.x = (this.extWidth - this.scaledWidth) / 2.0;
    this.y = 0;
    // создание внутреннего канваса
    this.intCanvas = document.createElement("canvas");
    this.intCanvas.width = this.intWidth;
    this.intCanvas.height = this.intHeight;
    // создание внутреннего контекста
    this.intCtx = this.intCanvas.getContext("2d");

    this.platform = null;
    console.log(`Create Game`);
  }

  drawInternal() {
    //this.internalContext.clearRect(0, 0, this.internalCanvas.width, this.internalCanvas.height);

    this.intCtx.fillStyle = "green";
    this.intCtx.fillRect(0, 0, this.intWidth, this.intHeight);

    this.intCtx.fillStyle = "red";
    this.intCtx.font = "50px Arial";
    this.intCtx.fillText(`this.platform = ${this.platform}`, 60, 90);
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

  // Метод для обновления и отрисовки
  update() {
    this.drawInternal(); // Рисуем на внутреннем контексте
    this.renderToExternal(); // Отрисовываем на внешнем контексте
  }
}
