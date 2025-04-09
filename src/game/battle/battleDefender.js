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
  }

  addButton(key, obj) {
    this.listButtons[key] = obj;
  }

  init() {
    if (this.background === null)
      this.background = this.imageAssets.get("battle_bg_summer_1");
  }

  restate() {
    //
  }

  update(touch, stateApp) {
    //
  }

  render(ctx) {
    ctx.save();

    if (this.background !== null) {
      this.background.draw(ctx, 0, 0, this.w, this.h);
    }

    ctx.restore();
  }
}
