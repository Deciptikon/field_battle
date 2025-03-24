export function getData(listKeys, bridge) {
  //console.log(`getData(key)`);
  return new Promise((resolve, reject) => {
    bridge
      .send("VKWebAppStorageGet", {
        keys: listKeys, // Передаём массив с одним ключом
      })
      .then((response) => {
        let rezult = {};
        if (response.keys.length > 0) {
          response.keys.forEach((data, index) => {
            rezult[data.key] = data.value;
          });
        }
        resolve(rezult); // Возвращаем значение
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
        reject(error); // Пробрасываем ошибку
      });
  });
}

export function getKeys(offset, limit, bridge) {
  //console.log(`getKeys()`);
  return new Promise((resolve, reject) => {
    bridge
      .send("VKWebAppStorageGetKeys", {
        count: limit,
        offset: offset,
      })
      .then((response) => {
        if (response.keys.length > 0) {
          resolve(response.keys); // Возвращаем массив ключей
        } else {
          resolve([]); // Если ключей нет, возвращаем пустой массив
        }
      })
      .catch((error) => {
        console.error("Ошибка при получении ключей:", error);
        reject(error); // Пробрасываем ошибку
      });
  });
}

export function setData(key, value, bridge) {
  return new Promise((resolve, reject) => {
    bridge
      .send("VKWebAppStorageSet", {
        key: key,
        value: value,
      })
      .then((response) => {
        console.log(response);
        resolve(response.data.result);
      })
      .catch((error) => {
        console.error("Ошибка при сохранении:", error);
        reject(error); // Пробрасываем ошибку
      });
  });
}

export function setListData(listData, bridge, index = 0) {
  if (index < listData.length) {
    const { key, value } = listData[index];
    setData(key, value, bridge)
      .then((result) => {
        if (result) {
          // данные сохранены, идём дальше
          console.log("Данные успешно сохранены!");
          setListData(listData, bridge, index + 1);
        } else {
          // данные не сохранены
          console.log(`Данные не были сохранены. index = ${index}`);
          //setListData(listData, bridge, index);
        }
      })
      .catch((error) => {
        console.error("Произошла ошибка:", error.message);
      });
  }
}
