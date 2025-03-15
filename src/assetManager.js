export class Animation {
  constructor(params) {
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

export function loadImage(path) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = path;

    img.onload = () => {
      resolve(img); // Возвращаем загруженное изображение
    };

    img.onerror = (error) => {
      reject(new Error(`Ошибка загрузки изображения: ${path}`)); // Возвращаем ошибку
    };
  });
}

export function cropImage(image, x, y, width, height) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

  const croppedImage = new Image();
  croppedImage.src = canvas.toDataURL();
  return croppedImage;
}

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
