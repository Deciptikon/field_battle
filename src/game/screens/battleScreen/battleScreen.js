import { battleDefender } from "../../battle/battleDefender.js";
import { baseBattleScreen } from "./baseBattleScreen.js";
import { STATE_BATTLE } from "../../../utils/constants.js";

export class battleScreen extends baseBattleScreen {
  constructor(imageAssets, soundAssets, options, params, toScreen) {
    super(imageAssets, soundAssets, options, params, toScreen);

    this.windowPlay = new battleDefender(
      imageAssets,
      soundAssets,
      options,
      params,
      toScreen
    );
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
