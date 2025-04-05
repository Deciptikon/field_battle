import { isEmpty } from "../utils.js";

export class SceneAnimation {
  constructor(params) {
    this.listObjects = [];
    this.frame = 0;
  }

  addObject(obj) {
    this.listObjects.push(obj);
  }

  init() {
    if (!isEmpty(this.listObjects)) {
      this.listObjects.forEach((obj) => {
        obj?.init();
      });
    }
  }

  update(touch, stateApp) {
    if (!isEmpty(this.listObjects)) {
      this.listObjects.forEach((obj) => {
        obj?.update(touch, stateApp);
      });
    }
  }

  draw(ctx) {
    if (!isEmpty(this.listObjects)) {
      this.listObjects.forEach((obj) => {
        obj?.draw(ctx);
      });
    }
  }
}
