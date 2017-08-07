const drawDashLine = function (ctx, x1, y1, x2, y2, dashLen) {
  dashLen = dashLen === undefined ? 2 : dashLen;
  const beveling = getBeveling(x2 - x1,y2 - y1);  
  const num = Math.floor(beveling / dashLen);
  ctx.beginPath();
  for(let i = 0 ; i < num; i ++) {
    ctx[i % 2 == 0 ? 'moveTo' : 'lineTo'](x1 + (x2 - x1) / num * i, y1 + (y2 - y1) / num * i);  
  }
  ctx.closePath();
  ctx.stroke();
}

const getBeveling = (x,y) => Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

const drawDashRect = (ctx, x, y, width, height) => {
  drawDashLine(ctx, x, y, width + x, y);
  drawDashLine(ctx, width + x, y, width + x, height + y);
  drawDashLine(ctx, width + x, height + y, x, height + y);
  drawDashLine(ctx, x, height + y, x, y);
}

export default drawDashRect;