import { baseScreen } from "./baseScreen.js";

export class aboutScreen extends baseScreen {
  constructor(imageAssets, soundAssets, options, params, toScreen) {
    super(imageAssets, soundAssets, options, params, toScreen);
    this.titleScreen = "Информация";
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
