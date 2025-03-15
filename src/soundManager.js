export class soundManager {
  constructor() {
    this.sounds = {};
  }

  loadFromStruct(struct, callback = null) {
    this.addSound(struct.key, struct.path)
      .then((message) => {
        console.log(message);
        if (callback !== null) callback();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Добавление звука с промисом
  addSound(name, url) {
    return new Promise((resolve, reject) => {
      const audio = new Audio(url);

      // Обработка успешной загрузки
      audio.addEventListener("canplaythrough", () => {
        this.sounds[name] = audio;
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
  playSound(name) {
    if (this.sounds[name]) {
      this.sounds[name].play();
    } else {
      console.error("Звук не найден:", name);
    }
  }

  // Остановка звука
  stopSound(name) {
    if (this.sounds[name]) {
      this.sounds[name].pause();
      this.sounds[name].currentTime = 0;
    }
  }
}
