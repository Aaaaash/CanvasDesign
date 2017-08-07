import drawDashRect from './utils/drawDashLine';

export default class AideCanvas {
  constructor (aidelayer) {
    this.aidelayer = aidelayer;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.lock = true;
    this.controls = {};
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
    this.controls[control.id] = control;
    if (!this.lock) {
      this.redraw();
    }    
  }

  redraw () {
    this.ctx.clearRect(0, 0, this.aidelayer.size.w, this.aidelayer.size.h);
    if (!this.lock) {
      for (let id in this.controls) {
        if (this.controls.hasOwnProperty(id)) {
          this.draw(this.controls[id]);
        }
      }
    }
  }

  draw (control) {
    const { width, height, x, y } = control;
    const pt = this.getLocalXY({ x, y });
    const res = this.aidelayer.getRes();
    const offsetX = width / 2 / res;
    const offsetY = height / 2 / res;
    this.ctx.strokeStyle = '#666';
    drawDashRect(this.ctx, pt.x - offsetX, pt.y - offsetY, width / res, height / res);
  }

  getLocalXY (point) {
    const resolution = this.aidelayer.getRes();
    const extent = this.aidelayer.bounds;
    const x = (point.x / resolution + (-extent.left / resolution));
    const y = ((extent.top / resolution) - point.y / resolution);
    return { x, y };
  }
}
