export default class AideCanvas {
  constructor (aidelayer) {
    this.aidelayer = aidelayer;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.setSize(aidelayer.layer.size);
    aidelayer.layer.div.insertBefore(this.canvas, aidelayer.layer.renderer.canvas);
  }

  setSize (size) {
    this.canvas.style.boder = 'none';
    this.canvas.style.position = 'absolute';
    this.canvas.style.width = `${size.w}px`;
    this.canvas.style.height = `${size.h}px`;
    this.canvas.width = size.w;
    this.canvas.height = size.h;
  }

  drawAuxiliaryLine (control) {
    // this.ctx.clearRect(0, 0, this.aidelayer.size.w, this.aidelayer.size.h);
    const { width, height, x, y } = control;
    const pt = this.getLocalXY({ x, y });
    const res = this.aidelayer.getRes();
    const offsetX = width / 2 / res;
    const offsetY = height / 2 / res;
    this.ctx.fillStyle = 'rgba(0,0,0,0.3)';
    this.ctx.fillRect(pt.x - offsetX, pt.y - offsetY, width / res, height / res);
  }

  getLocalXY (point) {
    const resolution = this.aidelayer.getRes();
    const extent = this.aidelayer.bounds;
    const x = (point.x / resolution + (-extent.left / resolution));
    const y = ((extent.top / resolution) - point.y / resolution);
    return { x, y };
  }
}
