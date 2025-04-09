import { STATE_BUTTON } from "../../utils/constants.js";
import { RGB, createTextForButton } from "../../utils/utils.js";
import { ButtonColored } from "../../utils/buttonColored.js";

export class windowPause {
  constructor(
    imageAssets,
    soundAssets,
    options,
    params,
    toScreen,
    callbackResume
  ) {
    this.options = options;

    this.x = params.x;
    this.y = params.y;
    this.w = params.w;
    this.h = params.h;
    this.toScreen = toScreen;
    this.callbackResume = callbackResume;

    this.titleScreen = null;
    this.title = null;

    this.imageAssets = imageAssets;
    this.soundAssets = soundAssets;

    this.listButtons = {};

    this.animaCount = 100;
    this.increment = 1;
  }

  addButton(key, obj) {
    this.listButtons[key] = obj;
  }

  init() {
    const toScreen = this.toScreen;
    const callbackResume = this.callbackResume;

    const w_btt = 400;
    const h_btt = 150;
    const s_btt = 100;
    const y_btt = this.h / 2 - h_btt / 2;
    const p_btt = this.w / 2 - (2 * w_btt + s_btt) / 2;

    this.addButton(
      "bttQuit",
      new ButtonColored(
        () => {
          console.log(`Завершаем игру`);
          toScreen("mainScreen");
        },
        {
          x: p_btt,
          y: y_btt,
          w: w_btt,
          h: h_btt,
          rgba: {
            [STATE_BUTTON.NONE]: {
              rgb: RGB(200, 0, 0),
              a: 1.0,
            },
            [STATE_BUTTON.DOWN]: {
              rgb: RGB(100, 0, 0),
              a: 1.0,
            },
            [STATE_BUTTON.UP]: {
              rgb: RGB(250, 250, 250),
              a: 1.0,
            },
          },
          text: createTextForButton("Завершить"),
        }
      )
    );

    this.addButton(
      "bttPlay",
      new ButtonColored(callbackResume, {
        x: p_btt + w_btt + s_btt,
        y: y_btt,
        w: w_btt,
        h: h_btt,
        rgba: {
          [STATE_BUTTON.NONE]: {
            rgb: RGB(0, 0, 200),
            a: 1.0,
          },
          [STATE_BUTTON.DOWN]: {
            rgb: RGB(0, 0, 100),
            a: 1.0,
          },
          [STATE_BUTTON.UP]: {
            rgb: RGB(250, 250, 250),
            a: 1.0,
          },
        },
        text: createTextForButton("Продолжить"),
      })
    );

    for (let key in this.listButtons) {
      this.listButtons[key]?.init();
    }
  }

  restate() {
    for (let key in this.listButtons) {
      this.listButtons[key]?.restate();
    }
  }

  update(touch, stateApp) {
    for (let key in this.listButtons) {
      this.listButtons[key]?.update(touch);
    }

    this.animaCount += this.increment;
    if (this.animaCount > 120) this.increment = -1;
    if (this.animaCount < 1) this.increment = 1;
  }

  render(ctx) {
    ctx.save();

    ctx.fillStyle = `rgb(
    ${this.animaCount + 100}, 
    50, 
    ${200 - this.animaCount}
    )`;
    ctx.fillRect(0, 0, this.w, this.h);

    for (let key in this.listButtons) {
      this.listButtons[key]?.render(ctx);
    }

    ctx.restore();
  }
}
