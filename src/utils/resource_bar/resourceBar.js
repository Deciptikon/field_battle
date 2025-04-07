export class ResourceBar {
  constructor(x, y, w, h, colorBackground) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.colorBackground = colorBackground;

    this.listObjects = {};
  }

  addObject(key, obj) {
    this.listObjects[key] = obj;
  }

  init() {
    for (let key in this.listObjects) {
      this.listObjects[key]?.init();
    }
  }

  restate() {
    for (let key in this.listObjects) {
      this.listObjects[key]?.restate();
    }
  }

  update(touch, stateApp) {
    for (let key in this.listObjects) {
      this.listObjects[key]?.update(touch, stateApp);
    }
  }

  render(ctx) {
    ctx.fillStyle = this.colorBackground;
    ctx.fillRect(this.x, this.y, this.w, this.h);

    for (let key in this.listObjects) {
      this.listObjects[key]?.render(ctx);
    }
  }
}
