import { STATE_BUTTON, TYPE_ANIMA_COLOR } from "./constants.js";
import { drawRect, rgb2String, fontFromStruct } from "./utils.js";
import { AnimaColor } from "./animaColor.js";

export class ButtonColoredAnimation {
  constructor(callback, options) {
    this.callback = callback;

    this.x = options.x;
    this.y = options.y;

    this.w = options.w;
    this.h = options.h;

    this.rgba = {};
    this.rgba[STATE_BUTTON.NONE] = new AnimaColor(
      [
        {
          rgb: { r: 200, g: 50, b: 100 },
          a: 1.0,
        },
        {
          rgb: { r: 100, g: 50, b: 200 },
          a: 1.0,
        },
      ],
      [120, 120],
      TYPE_ANIMA_COLOR.CIRCLE
    );
    this.rgba[STATE_BUTTON.DOWN] = new AnimaColor(
      [
        {
          rgb: { r: 150, g: 0, b: 150 },
          a: 1.0,
        },
        {
          rgb: { r: 50, g: 200, b: 50 },
          a: 1.0,
        },
      ],
      [120, 120],
      TYPE_ANIMA_COLOR.PINGPONG
    );
    this.rgba[STATE_BUTTON.UP] = new AnimaColor(
      [
        {
          rgb: { r: 255, g: 0, b: 255 },
          a: 1.0,
        },
        {
          rgb: { r: 120, g: 255, b: 0 },
          a: 1.0,
        },
      ],
      [12, 12],
      TYPE_ANIMA_COLOR.CIRCLE
    );

    if (options?.rgba) this.rgba = options.rgba;

    if (options?.text) {
      this.text = options.text;
    } else {
      this.text = null;
    }
    //console.log(this.text);

    this.isVisible = true;
    this.isAction = true;

    this.state = STATE_BUTTON.NONE;
    this.count = 0;
  }

  init() {
    this.state = STATE_BUTTON.NONE;
    this.count = 0;
  }

  update(touch) {
    if (touch !== null) {
      const px = touch.x - this.x;
      const py = touch.y - this.y;
      if (px > 0 && px < this.w && py > 0 && py < this.h) {
        if (this.state === STATE_BUTTON.NONE) {
          this.state = STATE_BUTTON.DOWN;
          this.count = 0;
        }
      } else {
        if (this.state !== STATE_BUTTON.UP) {
          this.state = STATE_BUTTON.NONE;
          this.count = 0;
        }
      }
    } else {
      if (this.state === STATE_BUTTON.DOWN) {
        this.state = STATE_BUTTON.UP;
        this.count = 0;
        // callback
        this.callback();
      }
    }

    this.rgba[this.state]?.update();
    this.count++;
  }

  render(ctx) {
    ctx.save();
    const color = this.rgba[this.state]?.getColor();
    drawRect(
      ctx,
      this.x,
      this.y,
      this.w,
      this.h,
      rgb2String(color.rgb, color.a)
    );

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
        this.y + (this.h + this.text.fontSize / 2) / 2
      );
    }

    if (this.state === STATE_BUTTON.NONE) {
      //drawRect(ctx, this.x, this.y, this.w, this.h, rgb2String(this.rgb, this.a[STATE_BUTTON.NONE]));
    } else if (this.state === STATE_BUTTON.DOWN) {
      //drawRect(ctx, this.x, this.y, this.w, this.h, rgb2String(this.rgb, this.a[STATE_BUTTON.DOWN]));
    } else if (this.state === STATE_BUTTON.UP) {
      //drawRect(ctx, this.x, this.y, this.w, this.h, rgb2String(this.rgb, this.a[STATE_BUTTON.UP]));
      // рисуем анимацию
      //
      // сбрасываем состояние в конце анимации
      if (this.count > 10) {
        //this.count > anima_up.length
        this.state = STATE_BUTTON.NONE;
        this.count = 0;
        // callback
        // this.callback();
      }
    }
    ctx.restore();
  }
}
