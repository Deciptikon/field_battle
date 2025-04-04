import { Animation } from "./utils/animation.js";
import { loadImage } from "./utils/utils.js";

export class assetManager {
  constructor(options) {
    this.options = options;
    this.obj = {};
  }

  get(key) {
    if (key in this.obj) {
      return this.obj[key];
    } else {
      return null;
    }
  }

  loadFromStruct(data, callback = null) {
    if (data.isAnimate) {
      loadImage(data.path)
        .then((img) => {
          console.log(`Изображение ${data.key} загружено.`);
          this.obj[data.key] = new Animation({
            pos: data.init_index,
            speed: data.speed,
          });
          this.obj[data.key].fromSequention(
            img,
            data.w,
            data.h,
            data.kx,
            data.ky,
            data.x0,
            data.y0
          );

          if (callback !== null) callback();
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      loadImage(data.path)
        .then((img) => {
          console.log(`Изображение ${data.key} загружено.`);
          this.obj[data.key] = img;
          if (callback !== null) callback();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }
}
