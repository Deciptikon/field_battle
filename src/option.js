import { TYPE_SOUND } from "./utils/constants.js";

export class Options {
  constructor(bridge) {
    this.bridge = bridge;

    this.volumeSound = {};

    this.volumeSound[TYPE_SOUND.MUSIC] = 1.0;
    this.volumeSound[TYPE_SOUND.EFFECT] = 1.0;
    this.volumeSound[TYPE_SOUND.INTERFACE] = 1.0;
  }

  getVolumeSound(TYPE_SOUND) {
    return this.volumeSound[TYPE_SOUND];
  }

  setVolumeSound(TYPE_SOUND, vol) {
    this.volumeSound[TYPE_SOUND] = Math.min(1, Math.max(0, vol));
  }

  loadOptions() {
    // загрузка из вк хранилища
  }

  saveOptions() {
    // сохранение в вк хранилище
  }
}
