import { baseScreen } from "./baseScreen.js";

export class upgradeScreen extends baseScreen {
  constructor(imageAssets, soundAssets, model, options, params, toScreen) {
    super(imageAssets, soundAssets, model, options, params, toScreen);
    this.titleScreen = "Улучшения";
  }

  init() {
    super.init();
  }

  restate() {
    super.restate();
  }

  update(touch, stateApp) {
    super.update(touch, stateApp);
  }

  render(ctx) {
    super.render(ctx);
  }
}
