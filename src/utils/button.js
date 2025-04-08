import { STATE_BUTTON } from "./constants.js";
import { drawRect, rgb2String, fontFromStruct } from "./utils.js";

export class Button {
  constructor(callback, options) {
    this.callback = callback;

    this.x = options.x;
    this.y = options.y;

    this.w = options.w;
    this.h = options.h;

    this.rgb = options?.rgb ? options?.rgb : { r: 0, g: 120, b: 255 };
    this.a = {};
    this.a[STATE_BUTTON.NONE] = 1.0;
    this.a[STATE_BUTTON.DOWN] = 0.7;
    this.a[STATE_BUTTON.UP] = 0.4;
    if (options?.a) this.a = options?.a;

    if (options?.text) {
      this.text = options.text;
    } else {
      this.text = null;
    }

    this.sound = options?.sound ? options?.sound : null;
    //console.log(this.text);

    this.isVisible = true;
    this.isAction = true;

    this.state = STATE_BUTTON.NONE;
    this.count = 0;
  }

  setSound(sound) {
    this.sound = sound ? sound : null;
  }

  click() {
    if (this.sound !== null) {
      this.sound();
    }
    this.callback();
  }

  init() {
    this.state = STATE_BUTTON.NONE;
    this.count = 0;
  }

  restate() {
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
        //this.click();
      }
    }

    this.count++;
  }

  render(ctx) {
    ctx.save();
    drawRect(
      ctx,
      this.x,
      this.y,
      this.w,
      this.h,
      rgb2String(this.rgb, this.a[this.state])
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
        this.click();
      }
    }
    ctx.restore();
  }
}
