import { fontFromStruct } from "./utils.js";
import { TYPE_ALLIGN_TEXT } from "./constants.js";

export class Label {
  constructor(params, callback = null) {
    this.text = params.text;
    this.callback = callback;
    this.x = params.x;
    this.y = params.y;
    this.w = params.w;
    this.h = params.h;
    this.colorBackground = params?.colorBackground || null;
    this.allign = params?.allign || null;

    if (this.allign === null) this.allign = TYPE_ALLIGN_TEXT.MIDDLE;
  }

  init() {
    //
  }

  restate() {
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

      let s = 0;
      if (this.allign === TYPE_ALLIGN_TEXT.MIDDLE) {
        s = (this.w - tm.width) / 2;
      }
      if (this.allign === TYPE_ALLIGN_TEXT.RIGHT) {
        s = this.w - tm.width;
      }
      ctx.fillText(
        this.text.text,
        this.x + s,
        this.y + (this.h - this.text.shiftY) / 2
      );
    }

    ctx.restore();
  }
}
