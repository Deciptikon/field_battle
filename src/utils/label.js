import { fontFromStruct } from "./utils.js";

export class Label {
  constructor(params, callback = null) {
    this.text = params.text;
    this.callback = callback;
    this.x = params.x;
    this.y = params.y;
    this.w = params.w;
    this.h = params.h;
    this.colorBackground = params?.colorBackground || null;
  }

  init() {
    //
  }

  update(touch, stateApp) {
    if (this.callback !== null) this.callback();
  }

  render(ctx) {
    ctx.save();

    if (this.colorBackground !== null) {
      ctx.fillStyle = this.colorBackground;
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    if (this.text !== null) {
      //console.log(this.text.text);
      ctx.fillStyle = this.text.fillStyle;
      ctx.font = fontFromStruct(this.text);

      const tm = ctx.measureText(this.text.text);
      //console.log(this.text.text);
      //console.log(this.text?.shiftY);
      ctx.fillText(
        this.text.text,
        this.x + (this.w - tm.width) / 2,
        this.y + (this.h - this.text.shiftY) / 2
      );
    }

    ctx.restore();
  }
}
