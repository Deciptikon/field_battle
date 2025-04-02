import { TYPE_ANIMA_COLOR } from "./constants.js";
import { summRGBA } from "./utils.js";

export class AnimaColor {
  constructor(listRGBA, listFrames, type) {
    this.listRGBA = listRGBA;
    this.listFrames = listFrames;
    this.type = type;

    this.index = 0;
    this.count = 0;
    this.inc = 1;

    this.color = null;
  }

  getColor() {
    switch (this.type) {
      case TYPE_ANIMA_COLOR.CIRCLE:
        if (this.index < this.listRGBA.length - 1) {
          this.color = summRGBA(
            this.listRGBA[this.index],
            this.listRGBA[this.index + 1],
            this.count / this.listFrames[this.index]
          );
        } else {
          this.color = summRGBA(
            this.listRGBA[this.listRGBA.length - 1],
            this.listRGBA[0],
            this.count / this.listFrames[this.listFrames.length - 1]
          );
        }
        return this.color;
      case TYPE_ANIMA_COLOR.PINGPONG:
        let ti = this.index + this.inc;
        if (ti >= this.listRGBA.length || ti < 0) ti >= this.index;
        this.color = summRGBA(
          this.listRGBA[this.index],
          this.listRGBA[ti],
          this.count / this.listFrames[this.index]
        );
        return this.color;
      default:
        let tw = this.index + 1;
        if (tw >= this.listRGBA.length) tw >= this.index;
        this.color = summRGBA(
          this.listRGBA[this.index],
          this.listRGBA[tw],
          this.count / this.listFrames[this.index]
        );
        return this.color;
    }
  }

  update() {
    switch (this.type) {
      case TYPE_ANIMA_COLOR.CIRCLE:
        this.count++;
        if (this.count > this.listFrames[this.index]) {
          this.index++;
          this.count = 0;
          if (this.index >= this.listRGBA.length) this.index = 0;
        }
        break;
      case TYPE_ANIMA_COLOR.PINGPONG:
        this.count += this.inc;
        if (this.count > this.listFrames[this.index]) {
          this.index++;
          if (this.index >= this.listRGBA.length) {
            this.inc = -1;
            this.index = this.listRGBA.length - 1;
            this.count = this.listFrames[this.index];
          } else {
            this.count = 0;
          }
        } else if (this.count < 0) {
          this.index--;
          if (this.index < 0) {
            this.index = 0;
            this.inc = 1;
            this.count = 0;
          } else {
            this.count = this.listFrames[this.index];
          }
        }
        break;
      default:
        this.count++;
        if (this.count > this.listFrames[this.index]) {
          this.index++;
          if (this.index >= this.listRGBA.length) {
            this.index = this.listRGBA.length - 1;
            this.count = this.listFrames[this.index];
          } else {
            this.count = 0;
          }
        }
    }
  }
}
