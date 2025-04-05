export class ObjectScene {
  constructor(params, updateFunc = null) {
    this.img = params.img;
    this.updateFunc = updateFunc;

    this.x = params.x;
    this.y = params.y;
    this.w = params.w;
    this.h = params.h;
  }

  init() {
    //
  }

  update(touch, stateApp) {
    this.img.update();
    this?.updateFunc();
  }

  draw(ctx) {
    this.img.draw(ctx, this.x, this.y, this.w, this.h);
    //ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}
