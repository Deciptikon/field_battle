import { cropImage } from "./utils.js";

export class Animation {
  constructor(params) {
    console.log(`Animation`);
    this.anima = [];
    this.pos = params?.pos || 0;

    this.speed = params?.speed || 0;
    this.isAnimate = true;
  }

  fromImage(img) {
    if (img === null) {
      return;
    }

    this.anima.push(img);
    this.pos = 0;
    this.speed = 0;
    this.isAnimate = false;
  }

  fromSequention(seq, w, h, kx, ky, x0 = 0, y0 = 0) {
    if (seq === null) {
      return;
    }

    this.anima = [];
    for (let i = 0; i < ky; i++) {
      for (let j = 0; j < kx; j++) {
        const frame = cropImage(seq, x0 + w * j, y0 + h * i, w, h);
        this.anima.push(frame);
      }
    }
    this.isAnimate = true;
  }

  incrementPos() {
    if (this.speed === 0 || !this.isAnimate) return;

    this.pos += this.speed;
    if (!(this.pos < this.anima.length)) {
      this.pos = 0;
    }
  }

  init() {
    //
  }

  restate() {
    this.pos = 0;
  }

  update(num = null) {
    if (!this.isAnimate) return;

    if (num === null) {
      this.incrementPos();
    } else {
      this.pos = Math.abs(Math.floor(num));
    }
  }

  getCurrentFrame(increment = false) {
    if (this.anima.length > 0) {
      if (this.isAnimate) {
        const i = Math.floor(this.pos) % this.anima.length;
        if (increment) this.incrementPos();
        return this.anima[i];
      } else {
        return this.anima[0];
      }
    } else {
      return null;
    }
  }

  draw(ctx, x, y, w = null, h = null) {
    if (this.anima.length > 0) {
      if (this.isAnimate) {
        const i = Math.floor(this.pos) % this.anima.length;
        let width = w === null ? this.anima[i].width : w;
        let height = h === null ? this.anima[i].height : h;
        ctx.drawImage(this.anima[i], x, y, width, height);
      } else {
        let width = w === null ? this.anima[0].width : w;
        let height = h === null ? this.anima[0].height : h;
        ctx.drawImage(this.anima[0], x, y, width, height);
      }
    } else {
      console.log("анимация отсутствует");
    }
  }
}
