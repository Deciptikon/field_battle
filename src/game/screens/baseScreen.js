import { Button } from "../../utils/button.js";
import { Label } from "../../utils/label.js";
import { COLORS } from "../../utils/constants.js";

export class baseScreen {
  constructor(imageAssets, soundAssets, options, params, toScreen) {
    this.options = options;

    this.x = params.x;
    this.y = params.y;
    this.w = params.w;
    this.h = params.h;
    this.toScreen = toScreen;
    this.titleScreen = null;
    this.title = null;

    this.background = null;
    this.imageAssets = imageAssets;
    this.soundAssets = soundAssets;

    this.listObjects = {};
    this.listButtons = {};

    //toScreen("mainScreen");
  }

  addObject(key, obj) {
    this.listObjects[key] = obj;
  }

  addButton(key, obj) {
    this.listButtons[key] = obj;
  }

  // первоначальная инициализация
  init() {
    const toScreen = this.toScreen;

    if (this.background === null)
      this.background = this.imageAssets.get("menu_bg_grad");
    if (this.titleScreen !== null) {
      this.title = new Label({
        x: 0,
        y: 0,
        w: this.w,
        h: 100,
        text: {
          fillStyle: COLORS.TEXT_INTERFACE_ELEMENTS,
          font: "Arial",
          fontSize: 50,
          isItalic: false,
          isBold: true,
          text: this.titleScreen,
          shiftY: -30,
        },
        colorBackground: COLORS.BACKGROUND_INTERFACE_ELEMENTS,
      });
    }

    this.addButton(
      "bttBackInMain",
      new Button(
        function () {
          console.log(`Back in MAIN`);
          //options.resaveOptions();
          toScreen("mainScreen");
        },
        {
          x: 10,
          y: this.h - 190,
          w: 180,
          h: 180,
          text: {
            fillStyle: COLORS.TEXT_INTERFACE_ELEMENTS,
            font: "Arial",
            fontSize: 100,
            isItalic: false,
            isBold: true,
            text: "<",
            //shiftY: -100,
          },
        }
      )
    );

    const snd = () => {
      this.soundAssets.playSound("btt_click");
    };

    for (let key in this.listObjects) {
      this.listObjects[key]?.init();
    }
    for (let key in this.listButtons) {
      this.listButtons[key]?.setSound(snd);
      this.listButtons[key]?.init();
    }
  }

  // сброс параметров при каждой загрузке экрана
  restate() {
    console.log("baseScreen.restate()");
    for (let key in this.listObjects) {
      this.listObjects[key]?.init(); //restate()
    }
    for (let key in this.listButtons) {
      this.listButtons[key]?.init(); //restate()
    }
  }

  // обновление на каждом кадре
  update(touch, stateApp) {
    for (let key in this.listObjects) {
      this.listObjects[key]?.update(touch);
    }
    for (let key in this.listButtons) {
      this.listButtons[key]?.update(touch);
    }
  }

  // отрисовка каждого кадра
  render(ctx) {
    ctx.save();

    if (this.background !== null) {
      this.background.draw(ctx, 0, 0, this.w, this.h);
    }
    if (this.titleScreen !== null) {
      this.title.render(ctx);
    }

    for (let key in this.listObjects) {
      this.listObjects[key]?.render(ctx);
    }
    for (let key in this.listButtons) {
      this.listButtons[key]?.render(ctx);
    }

    ctx.restore();
  }
}
