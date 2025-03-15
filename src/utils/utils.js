export function drawRect(ctx, x, y, w, h, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

export function isEmpty(list) {
  return list.length === 0 ? true : false;
}
