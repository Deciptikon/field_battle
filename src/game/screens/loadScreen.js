import { SOURCE_SOUND } from "../../sound/SOURCE_SOUND.js";
import { SOURCE_IMAGE } from "../../img/SOURCE_IMAGE.js";
import { A, RGB } from "../../utils/utils.js";
import { Button } from "../../utils/button.js";

export class loadScreen {
  constructor(
    imageAssets,
    soundAssets,
    model,
    options,
    params,
    toScreen,
    callback = null
  ) {
    //
    this.model = model;
    this.options = options;

    this.x = params.x;
    this.y = params.y;
    this.w = params.w;
    this.h = params.h;
    this.toScreen = toScreen;

    this.background = null;
    this.imageAssets = imageAssets;
    this.soundAssets = soundAssets;

    this.callback = callback;

    this.progressLoadImg = 0;
    this.progressLoadSnd = 0;
    this.loaded = false;

    this.next = false;
    const wbtt = this.w;
    const hbtt = this.h;

    this.nextBtt = new Button(
      function () {
        console.log(`next screen`);
        if (callback !== null) callback();
      },
      {
        x: (this.w - wbtt) / 2,
        y: (this.h - hbtt) / 2,
        w: wbtt,
        h: hbtt,
        rgb: RGB(200, 0, 200),
        a: A(0.2, 0.1, 0.0),
        text: {
          fillStyle: "#FFFFFF",
          font: "Arial",
          fontSize: 70,
          isItalic: false,
          isBold: true,
          text: "Нажмите что бы продолжить",
        },
      }
    );

    this.imageAssets.loadFromStruct(SOURCE_IMAGE[this.progressLoadImg], () => {
      this.progressLoadImg++;
      this.loaded = true;
      console.log(`this.progress = ${this.progressLoadImg}`);
    });
  }

  update(touch, stateApp) {
    if (this.loaded) {
      if (this.progressLoadImg < SOURCE_IMAGE.length) {
        this.loaded = false;
        this.imageAssets.loadFromStruct(
          SOURCE_IMAGE[this.progressLoadImg],
          () => {
            this.progressLoadImg++;
            this.loaded = true;
            console.log(`this.progressLoadImg = ${this.progressLoadImg}`);
          }
        );
      } else if (this.progressLoadSnd < SOURCE_SOUND.length) {
        //грузим звуки
        this.loaded = false;
        this.soundAssets.loadFromStruct(
          SOURCE_SOUND[this.progressLoadSnd],
          () => {
            this.progressLoadSnd++;
            this.loaded = true;
            console.log(`this.progressLoadSnd = ${this.progressLoadSnd}`);
          }
        );
      } else if (this.options.getStateLoaded() < 1) {
        // все картинки загружены.
        // все звуки загружены.
        // синхронизируем данные из облака/vk.storage,
        if (!this.options?.isLoad) this.options.loadOptions();
        // доделываем приготовления и переходим на следующий экран
      } else {
        console.log(`Всё загружено ....`);
        this.loaded = true;
        if (!this.next) {
          this.next = true;
        }
      }
    }

    if (this.next) {
      this.nextBtt.update(touch);
    }
    //this.imageAssets.get("test_anima")?.update();
  }

  drawLoadBar(ctx) {
    ctx.save();

    const w = this.w * 0.2;
    const h = this.h * 0.05;
    const x = (this.w - w) / 2;
    const y = (this.h - h) / 2;
    const p =
      (this.progressLoadImg + this.progressLoadSnd) /
      (SOURCE_IMAGE.length + SOURCE_SOUND.length);
    ctx.fillStyle = "rgb(255, 0, 234)";
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(x, y + h, w, h * 1.5);
    ctx.fillStyle = "rgba(0, 120, 255, 0.41)";
    ctx.fillRect(x, y, w * p, h);

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    const txt = `Загрузка ${Math.floor(p * 100)}%`;
    const tw = ctx.measureText(txt).width;
    ctx.fillText(txt, (this.w - tw) / 2, y + 2 * h);

    ctx.restore();
  }

  drawLoadOption(ctx) {
    const w = this.w * 0.2;
    const h = this.h * 0.05;
    const x = (this.w - w) / 2;
    const y = (this.h - h) / 2;
    const p = this.options.getStateLoaded();
    if (p > 0) {
      ctx.save();

      ctx.fillStyle = "white";
      ctx.font = "50px Arial";
      const txt = `Синхронизация ${Math.floor(p * 100)}%`;
      const tw = ctx.measureText(txt).width;
      ctx.fillText(txt, (this.w - tw) / 2, y + 4 * h);

      ctx.restore();
    }
  }

  render(ctx) {
    //console.log("loadScreen.render");
    ctx.save();

    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, this.w, this.h);

    if (this.imageAssets.get("loader_background") !== null) {
      if (this.background === null)
        this.background = this.imageAssets.get("loader_background");

      const k = this.h / this.background.height;
      ctx.drawImage(
        this.imageAssets.get("loader_background"),
        (this.w - this.background.width * k) / 2,
        0,
        this.background.width * k,
        this.background.height * k
      );

      if (this.next) {
        this.nextBtt.render(ctx);
      } else {
        this.drawLoadBar(ctx);
        this.drawLoadOption(ctx);
      }
    }

    //this.imageAssets.get("test_anima")?.draw(ctx, 0, 0);
    //const fr = this.imageAssets.get("test_anima").getCurrentFrame();
    //ctx.drawImage(fr, 0, 0, fr.width, fr.height);

    ctx.restore();
  }
}
