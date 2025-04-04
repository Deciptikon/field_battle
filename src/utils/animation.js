import { cropImage } from "./utils.js";

export class Animation {
  constructor(params) {
    console.log(`Animation`);
    this.anima = [];
    this.pos = params.pos;

    this.speed = params.speed;
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
  }

  incrementPos() {
    this.pos += this.speed;
    if (!(this.pos < this.anima.length)) {
      this.pos = 0;
    }
  }

  update(num = null) {
    if (num === null) {
      this.incrementPos();
    } else {
      this.pos = Math.abs(Math.floor(num));
    }
  }

  getCurrentFrame(increment = false) {
    if (this.anima.length > 0) {
      const i = Math.floor(this.pos) % this.anima.length;
      if (increment) this.incrementPos();
      return this.anima[i];
    } else {
      return null;
    }
  }

  draw(ctx, x, y, w = null, h = null) {
    if (this.anima.length > 0) {
      const i = Math.floor(this.pos) % this.anima.length;
      let width = w === null ? this.anima[i].width : w;
      let height = h === null ? this.anima[i].height : h;
      ctx.drawImage(this.anima[i], x, y, width, height);
    } else {
      console.log("анимация отсутствует");
    }
  }
}
