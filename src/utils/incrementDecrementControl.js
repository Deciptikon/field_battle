import { Label } from "./label.js";
import { Button } from "./button.js";
import { COLORS } from "./constants.js";

export class IncrementDecrementControl {
  constructor(x, y, w, h, title, callbackPlus, callbackMinus, callbackCounter) {
    this.title = new Label({
      x: x,
      y: y,
      w: w,
      h: h / 2,
      text: {
        fillStyle: COLORS.TEXT_INTERFACE_ELEMENTS,
        font: "Arial",
        fontSize: 50,
        isItalic: false,
        isBold: true,
        text: title,
        shiftY: -30,
      },
      colorBackground: COLORS.BACKGROUND_INTERFACE_ELEMENTS,
    });

    this.buttonMinus = new Button(callbackMinus, {
      x: x,
      y: y + h / 2,
      w: h / 2,
      h: h / 2,
      text: {
        fillStyle: COLORS.TEXT_INTERFACE_ELEMENTS,
        font: "Arial",
        fontSize: 50,
        isItalic: false,
        isBold: true,
        text: "-",
        shiftY: -25,
      },
    });

    this.counter = new Label(
      {
        x: x + h / 2,
        y: y + h / 2,
        w: w - h,
        h: h / 2,
        text: {
          fillStyle: COLORS.TEXT_INTERFACE_ELEMENTS,
          font: "Arial",
          fontSize: 50,
          isItalic: false,
          isBold: true,
          text: "0",
          shiftY: -30,
        },
        colorBackground: COLORS.BACKGROUND_INTERFACE_ELEMENTS,
      },
      callbackCounter
    );

    this.buttonPlus = new Button(callbackPlus, {
      x: x + w - h / 2,
      y: y + h / 2,
      w: h / 2,
      h: h / 2,
      text: {
        fillStyle: COLORS.TEXT_INTERFACE_ELEMENTS,
        font: "Arial",
        fontSize: 50,
        isItalic: false,
        isBold: true,
        text: "+",
        shiftY: -25,
      },
    });
  }

  setSound(sound) {
    this.buttonMinus.setSound(sound);
    this.buttonPlus.setSound(sound);
  }

  init() {
    this.buttonMinus.init();
    this.buttonPlus.init();
  }

  restate() {
    this.buttonMinus.restate();
    this.buttonPlus.restate();
  }

  update(touch) {
    this.title.update(touch);
    this.counter.update(touch);
    this.buttonMinus.update(touch);
    this.buttonPlus.update(touch);
  }

  render(ctx) {
    this.title.render(ctx);
    this.counter.render(ctx);
    this.buttonMinus.render(ctx);
    this.buttonPlus.render(ctx);
  }
}
