export class Animation {
  constructor(option) {
    this.anima = [];
    this.pos = option.pos;

    this.speed = option.speed;
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

  update(num = null) {
    if (num === null) {
      this.pos += this.speed;
      if (!(this.pos < this.anima.length)) {
        this.pos = 0;
      }
    } else {
      this.pos = Math.abs(Math.floor(num));
    }
  }

  getCurrentFrame() {
    if (this.anima.length > 0) {
      const i = Math.floor(this.pos) % this.anima.length;
      return this.anima[i];
    } else {
      return null;
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
