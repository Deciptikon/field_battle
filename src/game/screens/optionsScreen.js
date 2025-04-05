import { isEmpty } from "../../utils/utils.js";
import { Button } from "../../utils/button.js";
import { Label } from "../../utils/label.js";
import { TYPE_SOUND } from "../../utils/constants.js";

export class optionsScreen {
  constructor(imageAssets, soundAssets, model, options, params, toScreen) {
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

    this.listObjects.push(
      new Label({
        x: 500,
        y: 250,
        w: 400,
        h: 100,
        text: {
          fillStyle: `rgba(${255}, ${255}, ${255}, ${1.0})`,
          font: "Arial",
          fontSize: 50,
          isItalic: false,
          isBold: true,
          text: "Музыка",
          shiftY: -30,
        },
        colorBackground: `rgba(${0}, ${0}, ${0}, ${0.1})`,
      })
    );
    this.listObjects.push(
      new Button(
        () => {
          const type = TYPE_SOUND.MUSIC;
          const vol = this.options.getVolumeSound(type);
          if (vol > 0) {
            this.options.setVolumeSound(type, Math.floor(vol * 10 - 1) * 0.1);
            this.soundAssets.replayAll();
          }
          console.log(
            `Убавляем громкость   vol = ${this.options.getVolumeSound(type)}`
          );
        },
        {
          x: 500,
          y: 350,
          w: 100,
          h: 100,
          text: {
            fillStyle: "#FFFFFF",
            font: "Arial",
            fontSize: 50,
            isItalic: false,
            isBold: true,
            text: "-",
            shiftY: -25,
          },
        }
      )
    );
    this.listObjects.push(
      new Label(
        {
          x: 600,
          y: 350,
          w: 200,
          h: 100,
          text: {
            fillStyle: `rgba(${255}, ${255}, ${255}, ${1.0})`,
            font: "Arial",
            fontSize: 50,
            isItalic: false,
            isBold: true,
            text: "0",
            shiftY: -30,
          },
          colorBackground: `rgba(${0}, ${0}, ${0}, ${0.1})`,
        },
        function () {
          console.log(`Обновляем лайбел`);
          const type = TYPE_SOUND.MUSIC;
          const val = options.getVolumeSound(type);
          this.text.text = `${Math.floor(val * 100)}%`;
        }
      )
    );
    this.listObjects.push(
      new Button(
        () => {
          const type = TYPE_SOUND.MUSIC;
          const vol = this.options.getVolumeSound(type);
          if (vol < 1) {
            this.options.setVolumeSound(type, Math.floor(vol * 10 + 1) * 0.1);
            this.soundAssets.replayAll();
          }
          console.log(
            `Прибавляем громкость vol = ${this.options.getVolumeSound(type)}`
          );
        },
        {
          x: 800,
          y: 350,
          w: 100,
          h: 100,
          text: {
            fillStyle: "#FFFFFF",
            font: "Arial",
            fontSize: 50,
            isItalic: false,
            isBold: true,
            text: "+",
            shiftY: -25,
          },
        }
      )
    );
  }

  init() {
    this.background = this.imageAssets.get("menu_bg_grad");

    if (!isEmpty(this.listObjects)) {
      this.listObjects.forEach((obj) => {
        obj?.init();
      });
    }
  }

  // сброс параметров при каждой загрузке экрана
  restate() {
    if (!isEmpty(this.listObjects)) {
      this.listObjects.forEach((obj) => {
        obj?.init();
      });
    }
  }

  update(touch, stateApp) {
    //this.imageAssets.get("test_anima")?.update();

    if (!this.soundPlay) {
      this.soundAssets.playSound("main_theme");
      this.soundPlay = true;
    }

    if (!isEmpty(this.listObjects)) {
      this.listObjects.forEach((obj) => {
        obj?.update(touch);
      });
    }

    //this.toScreen("loadScreen");
  }

  render(ctx) {
    //console.log("menuScreen.render");
    ctx.save();

    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, this.w, this.h);

    /*const h_bg = this.background.height;
    const w_bg = this.background.width;

    const k = this.h / h_bg;

    ctx.drawImage(
      this.background,
      (this.w - w_bg * k) / 2,
      0,
      w_bg * k,
      h_bg * k
    );*/

    this.background.draw(ctx, 0, 0, this.w, this.h);

    if (!isEmpty(this.listObjects)) {
      this.listObjects.forEach((obj) => {
        obj?.render(ctx);
      });
    }

    //this.imageAssets.get("test_anima")?.draw(ctx, 0, 0);

    //const fr = this.imageAssets.get("test_anima").getCurrentFrame();
    //ctx.drawImage(fr, 0, 0, fr.width, fr.height);

    ctx.restore();
  }
}
