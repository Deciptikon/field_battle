import { OPTIONS } from "./utils/config.js";
import { str2obj, obj2str, isToday, isYesterday } from "./utils/utils.js";
import { getData, setData } from "./saveLoadManager.js";
import { DEBAG } from "./utils/constants.js";

export class Options {
  constructor(bridge) {
    this.bridge = bridge;

    //переменные для обновления
    this.needSave = {};

    //переменные для сигнализации о завершении загрузки данных
    this.isLoad = false;
    this.loaded = {};

    //заполняем ключи
    for (let key in OPTIONS) {
      this[key] = OPTIONS[key];
      this.needSave[key] = false;
      this.loaded[key] = false;
    }
  }

  getVolumeSound(TYPE_SOUND) {
    return this["VOLUME_SOUND"][TYPE_SOUND];
  }

  setVolumeSound(TYPE_SOUND, vol) {
    const key = "VOLUME_SOUND";
    this[key][TYPE_SOUND] = Math.min(1, Math.max(0, vol));
    this.needSave[key] = true;
  }

  loadVolumeSound() {
    this.load("VOLUME_SOUND");
  }

  saveVolumeSound() {
    this.save("VOLUME_SOUND");
  }

  getStateLoaded() {
    let p = 0;
    let q = 0;
    for (let key in OPTIONS) {
      q++;
      if (this.loaded[key]) p++;
    }
    return p / q;
  }

  getDamageDraw_Damage() {
    const key = "DAMAGE_DRAW";
    return this[key].DAMAGE;
  }

  setDamageDraw_Damage(val) {
    const key = "DAMAGE_DRAW";
    this[key].DAMAGE = val ? true : false;
    this.needSave[key] = true;
  }

  getDamageDraw_HP() {
    const key = "DAMAGE_DRAW";
    return this[key].HP;
  }

  setDamageDraw_HP(val) {
    const key = "DAMAGE_DRAW";
    this[key].HP = val ? true : false;
    this.needSave[key] = true;
  }

  getGameResource_Money() {
    const key = "GAME_RESOURCE";
    return this[key].MONEY;
  }

  setGameResource_Money(num) {
    const key = "GAME_RESOURCE";
    this[key].MONEY = num < 0 ? 0 : Math.ceil(num);
    this.needSave[key] = true;
  }

  incrementGameResource_Money(inc) {
    if (inc <= 0) return;

    const key = "GAME_RESOURCE";
    this[key].MONEY += Math.ceil(inc);
    this.needSave[key] = true;
  }

  getGameResource_Crystall() {
    const key = "GAME_RESOURCE";
    return this[key].CRYSTALLS;
  }

  setGameResource_Crystall(num) {
    const key = "GAME_RESOURCE";
    this[key].CRYSTALLS = num < 0 ? 0 : Math.ceil(num);
    this.needSave[key] = true;
  }

  incrementAdsStats_Count() {
    const key = "ADS_STATS";
    this[key].COUNT++;
    this.needSave[key] = true;
  }

  getAdsStats_MoneyForView() {
    const key = "ADS_STATS";
    return this[key].MONEY_FOR_VIEW;
  }

  updateLoginStats() {
    const key = "LOGIN_STATS";
    if (this[key].LAST_TIME === null) {
      // первый вход
      this[key].LAST_TIME = new Date();
      this[key].DAY_SERIES = 1;
      this[key].MAX_DAY_SERIES = 1;
      this.needSave[key] = true;
    } else {
      if (isToday(this[key].LAST_TIME)) {
        // если последний вход был сегодня, то ничего не делаем...
      } else if (isYesterday(this[key].LAST_TIME)) {
        // если последний вход был вчера
        this[key].LAST_TIME = new Date();
        this[key].DAY_SERIES = Number(this[key].DAY_SERIES) + 1;
        this.needSave[key] = true;
      } else {
        this[key].LAST_TIME = new Date();
        this[key].DAY_SERIES = 1;
        this.needSave[key] = true;
      }
    }

    // обновляем максимум
    if (Number(this[key].DAY_SERIES) > Number(this[key].MAX_DAY_SERIES)) {
      this[key].MAX_DAY_SERIES = Number(this[key].DAY_SERIES);
    }
  }

  load(key) {
    console.log(`load(${key})`);
    getData([key], this.bridge)
      .then((data) => {
        console.log(`Data loaded! {${key}}`);
        console.log(data);
        const obj = str2obj(data[key]);
        if (obj !== null && data !== "{}") {
          this[key] = obj;
          console.log(obj);
        }
        this.loaded[key] = true;
      })
      .catch((err) => {
        console.error(err);
      });
    if (DEBAG) this.loaded[key] = true; ///////////////////////////////////////////////////////
  }

  save(key) {
    const val = obj2str(this[key]);
    setData(key, val, this.bridge)
      .then((data) => {
        console.log(`Data saved! ${val}`);
        this.needSave[key] = false;
      })
      .catch((err) => {
        console.log("Ошибка сохранения данных");
        console.error(err);
        console.log("Будет произведена повторная попытка через 5 секунд");
        setTimeout(() => this.save(key), 5000);
      });
  }

  loadOptions() {
    console.log("loadOptions()");
    this.isLoad = true;
    // загрузка из вк хранилища
    for (let key in OPTIONS) {
      this.load(key);
    }
  }

  saveOptions() {
    // сохранение в вк хранилище
    for (let key in OPTIONS) {
      this.save(key);
    }
  }

  resaveOptions() {
    for (let key in OPTIONS) {
      if (this.needSave[key]) {
        this.save(key);
      }
    }
  }
}
