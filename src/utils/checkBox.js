import { STATE_CHECKBOX } from "./constants.js";
import { drawRect, drawQuad, rgb2String } from "./utils.js";

export class CheckBox {
  constructor(options, callbackChange, callbackRestate = null) {
    this.callbackChange = callbackChange;
    this.callbackRestate = callbackRestate;

    this.x = options.x;
    this.y = options.y;

    this.w = options.w;
    this.h = options.h;

    this.rgb = options?.rgb ? options?.rgb : { r: 0, g: 120, b: 255 };
    this.a = {};
    this.a[STATE_CHECKBOX.NONE] = 0.1;
    this.a[STATE_CHECKBOX.PRESSED] = 0.5;
    this.a[STATE_CHECKBOX.CHECKED] = 1.0;

    if (options?.a) this.a = options.a;

    this.sound = options?.sound ? options?.sound : null;

    this.colorBorder = { r: 255, g: 255, b: 255 };

    this.isVisible = true;
    this.isAction = true;

    this.state = STATE_CHECKBOX.NONE;

    this.isPressed = false;
    this.isChecked = false;
  }

  setSound(sound) {
    this.sound = sound ? sound : null;
  }

  click() {
    if (this.sound !== null) {
      this.sound();
    }
    if (this.callbackChange !== null) this.callbackChange();
  }

  updateState() {
    if (this.isChecked) {
      this.state = STATE_CHECKBOX.CHECKED;
    } else {
      this.state = STATE_CHECKBOX.NONE;
    }
  }

  init() {
    if (this.callbackRestate !== null) {
      this.callbackRestate();
      this.updateState();
    }
  }

  restate() {
    //
  }

  update(touch) {
    if (touch !== null) {
      const px = touch.x - this.x;
      const py = touch.y - this.y;
      if (px > 0 && px < this.w && py > 0 && py < this.h) {
        if (this.state !== STATE_CHECKBOX.PRESSED) {
          this.state = STATE_CHECKBOX.PRESSED;
        }
      } else {
        if (this.state === STATE_CHECKBOX.PRESSED) {
          this.updateState();
        }
      }
    } else {
      if (this.state === STATE_CHECKBOX.PRESSED) {
        this.isChecked = !this.isChecked;
        this.updateState();
        // callback
        this.click();
      }
    }
  }

  render(ctx) {
    ctx.save();

    const color = rgb2String(this.rgb, this.a[this.state]);
    drawRect(ctx, this.x, this.y, this.w, this.h, color);
    const colorBrdr = rgb2String(this.colorBorder, 1.0);
    drawQuad(ctx, this.x, this.y, this.w, this.h, colorBrdr, 10);

    ctx.restore();
  }
}
