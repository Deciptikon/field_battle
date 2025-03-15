export class soundManager {
  constructor(options) {
    this.sounds = {};
    this.options = options;
  }

  loadFromStruct(struct, callback = null) {
    this.addSound(struct.key, struct.path, struct.type, struct.baseVolume)
      .then((message) => {
        console.log(message);
        if (callback !== null) callback();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Добавление звука с промисом
  addSound(name, url, type = 0, baseVolume = 1.0) {
    return new Promise((resolve, reject) => {
      const audio = new Audio(url);

      // Обработка успешной загрузки
      audio.addEventListener("canplaythrough", () => {
        this.sounds[name] = {
          audio: audio,
          type: type,
          baseVolume: baseVolume,
        };
        resolve(`Звук "${name}" успешно загружен.`);
      });

      // Обработка ошибки загрузки
      audio.addEventListener("error", (err) => {
        reject(`Ошибка загрузки звука "${name}": ${err}`);
      });

      // Начинаем загрузку
      audio.load();
    });
  }

  // Воспроизведение звука
  playSound(name, volume = null) {
    if (this.sounds[name]) {
      const optVol =
        volume === null
          ? this.options.getVolumeSound(this.sounds[name].type)
          : volume;
      const audio = this.sounds[name].audio;
      const bVol = this.sounds[name].baseVolume;

      audio.volume = Math.min(1, Math.max(0, optVol * bVol));
      audio.play();
    } else {
      console.error("Звук не найден:", name);
    }
  }

  pauseSound(name) {
    if (this.sounds[name]) {
      this.sounds[name].audio.pause();
    }
  }

  // Остановка звука
  stopSound(name) {
    if (this.sounds[name]) {
      this.sounds[name].audio.pause();
      this.sounds[name].audio.currentTime = 0;
    }
  }
}
