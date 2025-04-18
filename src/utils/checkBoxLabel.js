import { CheckBox } from "./checkBox.js";
import { Label } from "./label.js";
import { COLORS } from "./constants.js";

export class CheckBoxLabel {
  constructor(x, y, w, h, title, callbackChange, callbackRestate = null) {
    this.checkBox = new CheckBox(
      { x: x, y: y, w: h, h: h },
      callbackChange,
      callbackRestate
    );

    this.title = new Label({
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
        text: title,
        shiftY: -30,
      },
      colorBackground: COLORS.BACKGROUND_INTERFACE_ELEMENTS,
    });
  }

  setSound(sound) {
    this.checkBox.setSound(sound);
  }

  init() {
    this.checkBox.init();
  }

  restate() {
    //
  }

  update(touch) {
    this.title.update(touch);
    this.checkBox.update(touch);
  }

  render(ctx) {
    this.title.render(ctx);
    this.checkBox.render(ctx);
  }
}
