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
