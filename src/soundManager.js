import { STATE_APP } from "./utils/constants.js";

export class soundManager {
  constructor(options) {
    this.sounds = {};
    this.options = options;
    this.stateApp = STATE_APP.PLAY;
  }

  loadFromStruct(struct, callback = null) {
    this.addSound(
      struct.key,
      struct.path,
      struct.type,
      struct.baseVolume,
      struct.loop
    )
      .then((message) => {
        console.log(message);
        if (callback !== null) callback();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Добавление звука с промисом
  addSound(name, url, type = 0, baseVolume = 1.0, loop = false) {
    return new Promise((resolve, reject) => {
      const audio = new Audio(url);

      // Обработка успешной загрузки
      audio.addEventListener("canplaythrough", () => {
        this.sounds[name] = {
          audio: audio,
          type: type,
          baseVolume: baseVolume,
          loop: loop,
          playing: false,
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

  setStateApp(stateApp) {
    if (stateApp === this.stateApp) {
      return;
    }

    if (stateApp === STATE_APP.PAUSE && this.stateApp === STATE_APP.PLAY) {
      // нужно запаузить всю музыку
      for (let name in this.sounds) {
        this.pauseSound(name);
      }
    }
    if (stateApp === STATE_APP.PLAY && this.stateApp === STATE_APP.PAUSE) {
      // нужно стартануть всю музыку которая недоиграла (audio.currentTime !== 0)
      for (let name in this.sounds) {
        if (this.sounds[name].audio.currentTime > 0) {
          this.sounds[name].audio.play();
          this.sounds[name].playing = true;
        }
      }
    }

    this.stateApp = stateApp;
  }

  // Воспроизведение звука
  playSound(name, volume = null, loop = false) {
    if (this.sounds[name]) {
      const optVol =
        volume === null
          ? this.options.getVolumeSound(this.sounds[name].type)
          : volume;
      const audio = this.sounds[name].audio;
      const bVol = this.sounds[name].baseVolume;

      audio.volume = Math.min(1, Math.max(0, optVol * bVol));
      if (loop || this.sounds[name].loop) audio.loop = true;
      try {
        audio.play();
        this.sounds[name].playing = true;
      } catch {
        console.error("Ошибка воспроизведения:", name);
      }
    } else {
      console.error("Звук не найден:", name);
    }
  }

  pauseAll() {
    for (let name in this.sounds) {
      this.pauseSound(name);
    }
  }

  replayAll(type = null) {
    if (type === null) {
      for (let name in this.sounds) {
        this.pauseSound(name);
        if (this.sounds[name].audio.currentTime > 0) {
          this.playSound(name);
        }
      }
    } else {
      for (let name in this.sounds) {
        if (this.sounds[name].type === type) {
          this.pauseSound(name);
          if (this.sounds[name].audio.currentTime > 0) {
            this.playSound(name);
          }
        }
      }
    }
  }

  pauseSound(name) {
    if (this.sounds[name]) {
      this.sounds[name].audio.pause();
      this.sounds[name].playing = false;
    }
  }

  // Остановка звука
  stopSound(name) {
    if (this.sounds[name]) {
      this.sounds[name].audio.pause();
      this.sounds[name].audio.currentTime = 0;
      this.sounds[name].playing = false;
    }
  }

  // играет ли данная мелодия (справдливо для loop=true)
  isPlaying(name) {
    if (this.sounds[name]) {
      return this.sounds[name].playing;
    } else {
      return null;
    }
  }
}
