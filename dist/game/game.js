export class Game {
    constructor(width, height) {
        this.internalCanvas = document.createElement("canvas");
        this.internalCanvas.width = width;
        this.internalCanvas.height = height;
        this.internalContext = this.internalCanvas.getContext("2d");
        console.log(`Create Game`);
    }
    drawInternal() {
        //this.internalContext.clearRect(0, 0, this.internalCanvas.width, this.internalCanvas.height);
        this.internalContext.fillStyle = "green";
        this.internalContext.fillRect(0, 0, this.internalCanvas.width, this.internalCanvas.height);
        this.internalContext.fillStyle = "red";
        this.internalContext.font = "50px Arial";
        this.internalContext.fillText("Hello, World!", 60, 90);
    }
    renderToExternal(externalContext) {
        console.log(`renderToExternal`);
        // Очищаем внешний canvas
        externalContext.clearRect(0, 0, externalContext.canvas.width, externalContext.canvas.height);
        // Рисуем внутренний canvas на внешнем
        const scale = externalContext.canvas.height / this.internalCanvas.height;
        console.log(`scale = ${scale}`);
        const dw = this.internalCanvas.width * scale;
        const dh = this.internalCanvas.height * scale;
        externalContext.drawImage(this.internalCanvas, 0, 0, dw, dh);
    }
    // Метод для обновления и отрисовки
    update(externalContext) {
        this.drawInternal(); // Рисуем на внутреннем контексте
        this.renderToExternal(externalContext); // Отрисовываем на внешнем контексте
    }
}
//# sourceMappingURL=game.js.map