export class Data {
  constructor(bridge) {
    this.bridge = bridge;
  }

  loadAllData() {
    // загружает все данные с сервера
  }

  saveAllData() {
    // сохраняет все данные на сервер
  }

  loadParameter(key) {
    //
  }

  saveParameter(key, val = null) {
    if (val !== null) {
      // сохраняем на сервер параметр из аргумента
    } else {
      // сохраняем на сервер параметр из внутренней структуры
    }
  }
}
