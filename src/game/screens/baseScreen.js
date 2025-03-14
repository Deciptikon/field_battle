export class baseScreen {
  constructor(imageAssets, soundAssets, model) {
    //
  }

  update(touch) {
    //
  }

  render(ctx) {
    //console.log("baseScreen.render");
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}
