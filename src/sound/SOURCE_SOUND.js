import { TYPE_SOUND } from "../utils/constants.js";

export const SOURCE_SOUND = [
  {
    key: "main_theme",
    path: "./src/sound/main_theme.mp3",
    type: TYPE_SOUND.MUSIC,
    baseVolume: 1.0,
    loop: true,
    size: 5.5, //5.5 MB
  },
  {
    key: "battle_theme",
    path: "./src/sound/battle_theme.mp3",
    type: TYPE_SOUND.MUSIC,
    baseVolume: 1.0,
    loop: true,
    size: 2.8, //2.8 MB
  },
  {
    key: "btt_click",
    path: "./src/sound/btt_click.mp3",
    type: TYPE_SOUND.INTERFACE,
    baseVolume: 1.0,
    loop: false,
    size: 0.0, // MB
  },
];
