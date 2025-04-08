export class battleDefender {
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

    this.stateBattle = STATE_BATTLE.PLAY;

    //toScreen("mainScreen");
  }

  init() {
    //
  }

  restate() {
    //
  }

  update(touch, stateApp) {
    //
  }

  render(ctx) {
    //
  }
}
