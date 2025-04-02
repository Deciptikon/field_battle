import { STATE_BUTTON } from "./constants.js";

export function drawRect(ctx, x, y, w, h, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

export function isEmpty(list) {
  return list.length === 0 ? true : false;
}

export function rgb2String(rgb, a = 1.0) {
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})`;
}

export function RGB(R, G, B) {
  return { r: R, g: G, b: B };
}

export function A(NONE = 1.0, DOWN = 0.7, UP = 0.4) {
  const a = {};
  a[STATE_BUTTON.NONE] = NONE;
  a[STATE_BUTTON.DOWN] = DOWN;
  a[STATE_BUTTON.UP] = UP;
  return a;
}

function lin(v1, v2, k) {
  return v1 * (1.0 - k) + v2 * k;
}

export function summRGBA(firstRGBA, secondRGBA, k) {
  const color = {
    rgb: {
      r: lin(firstRGBA.rgb.r, secondRGBA.rgb.r, k),
      g: lin(firstRGBA.rgb.g, secondRGBA.rgb.g, k),
      b: lin(firstRGBA.rgb.b, secondRGBA.rgb.b, k),
    },
    a: lin(firstRGBA.a, secondRGBA.a, k),
  };

  return color;
}

export function fontFromStruct(struct) {
  let font = `${struct.fontSize}px ${struct.font}`;
  if (struct.isBold) font = `bold ${font}`;
  if (struct.isItalic) font = `italic ${font}`;

  return font;
}

export function obj2str(obj) {
  return JSON.stringify(obj);
}

export function str2obj(str) {
  let obj = null;
  try {
    obj = JSON.parse(str);
    return obj;
  } catch {
    return null;
  }
}

export function isYesterday(date) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1); // Вчерашняя дата

  // Обнуляем часы, минуты, секунды, миллисекунды
  const inputDate = new Date(date);
  inputDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);

  return inputDate.getTime() === yesterday.getTime();
}

export function isToday(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Обнуляем время

  const inputDate = new Date(date);
  inputDate.setHours(0, 0, 0, 0);

  return inputDate.getTime() === today.getTime();
}
