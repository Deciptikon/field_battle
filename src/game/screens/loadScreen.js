import { SOURCE_IMAGE } from "../../utils/constants.js";
import { assetManager, loadImage } from "../../assetManager.js";

export class loadScreen {
  constructor(imageAssets, soundAssets, model, params) {
    //
    this.x = params.x;
    this.y = params.y;
    this.w = params.w;
    this.h = params.h;

    this.background = null;
    this.imageAssets = imageAssets;

    this.progress = 0;
    this.loaded = false;

    this.imageAssets.loadFromStruct(SOURCE_IMAGE[this.progress], () => {
      this.progress++;
      this.loaded = true;
      console.log(`this.progress = ${this.progress}`);
    });
  }

  update(touch) {
    if (this.loaded) {
      if (this.progress < SOURCE_IMAGE.length) {
        this.loaded = false;
        this.imageAssets.loadFromStruct(SOURCE_IMAGE[this.progress], () => {
          this.progress++;
          this.loaded = true;
          console.log(`this.progress = ${this.progress}`);
        });
      } else {
        console.log(`Всё загружено ....`);
        // значит все картинки загружены
        // доделываем приготовления и переходим на следующий экран
        // может быть через каллбек
      }
    }
    this.imageAssets.get("test_anima").update();
  }

  drawLoadBar(ctx) {
    ctx.save();

    const w = this.w * 0.2;
    const h = this.h * 0.05;
    const x = (this.w - w) / 2;
    const y = (this.h - h) / 2;
    const p = this.progress / SOURCE_IMAGE.length;
    ctx.fillStyle = "rgb(255, 0, 234)";
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = "rgba(255, 0, 234, 0.29)";
    ctx.fillRect(x, y + h, w, h);
    ctx.fillStyle = "rgba(0, 120, 255, 0.41)";
    ctx.fillRect(x, y, w * p, h);

    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(`Progress ${p * 100}%`, x, y + 2 * h);

    ctx.restore();
  }

  render(ctx) {
    //console.log("loadScreen.render");
    ctx.save();

    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, this.w, this.h);

    if (this.imageAssets.get() !== null) {
      //
    }

    if (this.imageAssets.get("loader_background") !== null) {
      if (this.background === null)
        this.background = this.imageAssets.get("loader_background");

      const k = this.h / this.background.height;
      ctx.drawImage(
        this.imageAssets.get("loader_background"),
        0,
        0,
        this.background.width * k,
        this.background.height * k
      );

      this.drawLoadBar(ctx);
    }

    const fr = this.imageAssets.get("test_anima").getCurrentFrame();
    ctx.drawImage(fr, 0, 0, fr.width, fr.height);

    ctx.restore();
  }
}
