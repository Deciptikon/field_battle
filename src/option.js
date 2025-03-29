import { TYPE_SOUND, OPTIONS_KEYS } from "./utils/constants.js";
import { str2obj, obj2str } from "./utils/utils.js";
import { getData, setData } from "./saveLoadManager.js";

export class Options {
  constructor(bridge) {
    this.bridge = bridge;

    //console.log(OPTIONS_KEYS);

    this[OPTIONS_KEYS.VOLUME_SOUND] = {};
    //значения по умолчанию
    this[OPTIONS_KEYS.VOLUME_SOUND][TYPE_SOUND.MUSIC] = 1.0;
    this[OPTIONS_KEYS.VOLUME_SOUND][TYPE_SOUND.EFFECT] = 1.0;
    this[OPTIONS_KEYS.VOLUME_SOUND][TYPE_SOUND.INTERFACE] = 1.0;

    //переменные для обновления
    this.needSave = {};

    //переменные для сигнализации о завершении загрузки данных
    this.isLoad = false;
    this.loaded = {};

    //заполняем ключи
    for (let key in OPTIONS_KEYS) {
      this.needSave[key] = false;
      this.loaded[key] = false;
    }
  }

  getVolumeSound(TYPE_SOUND) {
    return this[OPTIONS_KEYS.VOLUME_SOUND][TYPE_SOUND];
  }

  setVolumeSound(TYPE_SOUND, vol) {
    const key = OPTIONS_KEYS.VOLUME_SOUND;
    this[key][TYPE_SOUND] = Math.min(1, Math.max(0, vol));
    this.needSave[key] = true;
  }

  loadVolumeSound() {
    this.load(OPTIONS_KEYS.VOLUME_SOUND);
  }

  saveVolumeSound() {
    this.save(OPTIONS_KEYS.VOLUME_SOUND);
  }

  getStateLoaded() {
    let p = 0;
    let q = 0;
    for (let key in OPTIONS_KEYS) {
      q++;
      if (this.loaded[key]) p++;
    }
    return p / q;
  }

  load(key) {
    console.log(`load(${key})`);
    getData(key, this.bridge)
      .then((data) => {
        console.log("Data loaded!");
        const obj = str2obj(data);
        if (obj !== null && data !== "{}") {
          this[key] = obj;
          this.loaded[key] = true;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  save(key) {
    const val = obj2str(this[key]);
    setData(key, val, this.bridge)
      .then((data) => {
        console.log("Data saved!");
        this.needSave[key] = false;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  loadOptions() {
    console.log("loadOptions()");
    this.isLoad = true;
    // загрузка из вк хранилища
    for (let key in OPTIONS_KEYS) {
      this.load(key);
    }
  }

  saveOptions() {
    // сохранение в вк хранилище
    for (let key in OPTIONS_KEYS) {
      this.save(key);
    }
  }

  updateOptions() {
    for (let key in OPTIONS_KEYS) {
      if (this.needSave[key]) {
        this.save(key);
      }
    }
  }
}
