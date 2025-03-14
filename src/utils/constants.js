export const PI = 3.14159;
export const APP_NAME = "Поле Битвы";
export const COLORS = {
  RED: "#FF0000",
  GREEN: "#00FF00",
  BLUE: "#0000FF",
};

export const BASE_HEIGHT = 1000;
export const BASE_WIDTH = 2500;

export const BASE_FPS = 3;

export const STATE_BUTTON = {
  NONE: "none",
  DOWN: "down",
  UP: "up",
};

export const SOURCE_IMAGE = [
  {
    key: "loader_background",
    path: "./src/img/loader_background.jpeg",
    isAnimate: false,
  },
  {
    key: "test_anima",
    path: "./src/img/seq_1.png",
    isAnimate: true,
    x0: 0,
    y0: 0,
    w: 128,
    h: 128,
    kx: 5,
    ky: 1,
    init_index: 0,
    speed: 0.2,
  },
];
