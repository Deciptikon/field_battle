import { isEmpty } from "../../utils/utils.js";
import { Button } from "../../utils/button.js";

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
          toScreen("mainScreen");
        },
        {
          x: 100,
          y: 100,
          w: 100,
          h: 100,
        }
      )
    );
    this.listObjects.push(
      new Button(
        function () {
          console.log(`что-то делаем`);
        },
        {
          x: 500,
          y: 350,
          w: 300,
          h: 100,
        }
      )
    );
  }

  init() {
    this.background = this.imageAssets.get("options_background");
  }

  update(touch) {
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

    const h_bg = this.background.height;
    const w_bg = this.background.width;

    const k = this.h / h_bg;

    ctx.drawImage(
      this.background,
      (this.w - w_bg * k) / 2,
      0,
      w_bg * k,
      h_bg * k
    );

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
