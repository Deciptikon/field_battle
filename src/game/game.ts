import { VKBridge } from "@vkontakte/vk-bridge";

export class Game {
  private internalCanvas: HTMLCanvasElement;
  private internalContext: CanvasRenderingContext2D;
  private bridge: VKBridge;

  constructor(width: number, height: number, bridge: VKBridge) {
    this.internalCanvas = document.createElement("canvas");
    this.internalCanvas.width = width;
    this.internalCanvas.height = height;
    this.bridge = bridge;

    this.internalContext = this.internalCanvas.getContext("2d")!;
    console.log(`Create Game`);
  }

  drawInternal(): void {
    //this.internalContext.clearRect(0, 0, this.internalCanvas.width, this.internalCanvas.height);

    this.internalContext.fillStyle = "green";
    this.internalContext.fillRect(
      0,
      0,
      this.internalCanvas.width,
      this.internalCanvas.height
    );

    this.internalContext.fillStyle = "red";
    this.internalContext.font = "50px Arial";
    this.internalContext.fillText(
      `isWebView() = ${this.bridge.isWebView()}`,
      60,
      90
    );
  }

  renderToExternal(externalContext: CanvasRenderingContext2D): void {
    console.log(`renderToExternal`);
    // Очищаем внешний canvas
    externalContext.clearRect(
      0,
      0,
      externalContext.canvas.width,
      externalContext.canvas.height
    );

    // Рисуем внутренний canvas на внешнем
    const scale: number =
      externalContext.canvas.height / this.internalCanvas.height;
    console.log(`scale = ${scale}`);
    const dw: number = this.internalCanvas.width * scale;
    const dh: number = this.internalCanvas.height * scale;
    externalContext.drawImage(this.internalCanvas, 0, 0, dw, dh);
  }

  // Метод для обновления и отрисовки
  update(externalContext: CanvasRenderingContext2D): void {
    this.drawInternal(); // Рисуем на внутреннем контексте
    this.renderToExternal(externalContext); // Отрисовываем на внешнем контексте
  }
}
