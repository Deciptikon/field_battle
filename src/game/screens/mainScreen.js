import { SOURCE_IMAGE, SOURCE_SOUND } from "../../utils/constants.js";
import { assetManager, loadImage } from "../../assetManager.js";

export class mainScreen {
  constructor(imageAssets, soundAssets, model, params) {
    //
    this.x = params.x;
    this.y = params.y;
    this.w = params.w;
    this.h = params.h;
    this.toScreen = params.toScreen;

    this.background = null;
    this.imageAssets = imageAssets;
    this.soundAssets = soundAssets;

    this.soundPlay = false;
  }

  init() {
    this.background = this.imageAssets.get("menu_background");
  }

  update(touch) {
    this.imageAssets.get("test_anima")?.update();

    if (!this.soundPlay) {
      this.soundAssets.playSound("main_theme");
      this.soundPlay = true;
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

    this.imageAssets.get("test_anima")?.draw(ctx, 0, 0);
    //const fr = this.imageAssets.get("test_anima").getCurrentFrame();
    //ctx.drawImage(fr, 0, 0, fr.width, fr.height);

    ctx.restore();
  }
}
