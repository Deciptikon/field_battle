import { TYPE_SOUND } from "./constants.js";

export const OPTIONS = {
  // статистика посещений
  LOGIN_STATS: {
    LAST_TIME: null, //      дата последноего входа
    DAY_SERIES: 0, //        количество дней подряд
    MAX_DAY_SERIES: 0, //    количество дней подряд
  },

  // статистика просмотренной рекламы
  ADS_STATS: {
    COUNT: 0, // количество просмотренной рекламы
  },

  // статистика боевая
  BATTLE_STATS: {
    KILLS_COUNT: 0, // количество уничтоженых монстров
    BATTLE_COUNT: 0, // количество сыгранных боёв
    LVL_BATTLE: 0, // текущий уровень боёв
  },

  // настройки громкости звука
  VOLUME_SOUND: {
    [TYPE_SOUND.MUSIC]: 1.0, //       громкость музыки
    [TYPE_SOUND.EFFECT]: 1.0, //      громкость эффектов
    [TYPE_SOUND.INTERFACE]: 1.0, //   громкость интерфейса
  },

  // настройки отображения
  DAMAGE_DRAW: {
    DAMAGE: true, //   рисуем дамаг
    HP: true, //       рисуем ХП
  },
};
