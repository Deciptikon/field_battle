import { COLORS, TYPE_ALLIGN_TEXT } from "../constants.js";
import { Label } from "../label.js";

export class ResourceLabel {
  constructor(x, y, w, h, image, callbackUpdate = null) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.image = image;
    this.label = new Label(
      {
        x: x + h,
        y: y,
        w: w - h,
        h: h,
        text: {
          fillStyle: COLORS.TEXT_INTERFACE_ELEMENTS,
          font: "Arial",
          fontSize: 50,
          isItalic: false,
          isBold: true,
          text: "0",
          shiftY: -30,
        },
        //colorBackground: COLORS.BACKGROUND_INTERFACE_ELEMENTS,
        allign: TYPE_ALLIGN_TEXT.LEFT,
      },
      callbackUpdate
    );
  }

  init() {
    this.image.init();
    this.label.init();
  }

  restate() {
    this.image.restate();
    this.label.restate();
  }

  update(touch, stateApp) {
    this.image.update();
    this.label.update();
  }

  render(ctx) {
    this.label.render(ctx);
    this.image.draw(ctx, this.x, this.y, this.h, this.h);
  }
}
