import { STATE_BUTTON } from "./constants.js";
import { drawRect } from "./utils.js";

export class Button {
  constructor(callback, options) {
    this.callback = callback;

    this.x = options.x;
    this.y = options.y;

    this.w = options.w;
    this.h = options.h;

    this.isVisible = true;
    this.isAction = true;

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

    this.count++;
  }

  render(ctx) {
    ctx.save();
    if (this.state === STATE_BUTTON.NONE) {
      drawRect(ctx, this.x, this.y, this.w, this.h, "rgba(0, 120, 255, 0.75)");
    } else if (this.state === STATE_BUTTON.DOWN) {
      drawRect(ctx, this.x, this.y, this.w, this.h, "rgba(0, 120, 255, 0.9)");
    } else if (this.state === STATE_BUTTON.UP) {
      drawRect(ctx, this.x, this.y, this.w, this.h, "rgba(0, 120, 255, 0.5)");
      // рисуем анимацию
      //
      // сбрасываем состояние в конце анимации
      if (this.count > 10) {
        //this.count > anima_up.length
        this.state = STATE_BUTTON.NONE;
        this.count = 0;
      }
    }
    ctx.restore();
  }
}
