import { isEmpty } from "../../utils/utils.js";
import { Button } from "../../utils/button.js";
import { Label } from "../../utils/label.js";

export class baseScreen {
  constructor(imageAssets, soundAssets, model, options, params, toScreen) {
    this.model = model;
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

    this.soundPlay = false;

    this.listObjects = [];
    this.listObjects.push(
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
            fillStyle: "#FFFFFF",
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

    //toScreen("mainScreen");
  }

  // первоначальная инициализация
  init() {
    if (this.background === null)
      this.background = this.imageAssets.get("menu_bg_grad");
    if (this.titleScreen !== null) {
      this.title = new Label({
        x: 0,
        y: 0,
        w: this.w,
        h: 100,
        text: {
          fillStyle: `rgba(${255}, ${255}, ${255}, ${1.0})`,
          font: "Arial",
          fontSize: 50,
          isItalic: false,
          isBold: true,
          text: this.titleScreen,
          shiftY: -30,
        },
        colorBackground: `rgba(${0}, ${0}, ${0}, ${0.1})`,
      });
    }
    if (!isEmpty(this.listObjects)) {
      this.listObjects.forEach((obj) => {
        obj?.init();
      });
    }
  }

  // сброс параметров при каждой загрузке экрана
  restate() {
    console.log("baseScreen.restate()");
    if (!isEmpty(this.listObjects)) {
      this.listObjects.forEach((obj) => {
        obj?.init();
      });
    }
  }

  // обновление на каждом кадре
  update(touch, stateApp) {
    if (!isEmpty(this.listObjects)) {
      this.listObjects.forEach((obj) => {
        obj?.update(touch);
      });
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

    if (!isEmpty(this.listObjects)) {
      this.listObjects.forEach((obj) => {
        obj?.render(ctx);
      });
    }

    ctx.restore();
  }
}
