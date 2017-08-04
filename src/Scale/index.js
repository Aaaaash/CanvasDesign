import stopEventBubble from '../utils/stopEventBubble';
import bindAsEventListener from '../utils/bindAsEventListener';
import { Position } from '../CanvasDesign';

export default class Scale {
  constructor (layer) {
    this.layer = layer;
    this.div = layer.div;
    this.Events = [["mousewheel", Scale.prototype.wheelChange],["DOMMouseScroll", Scale.prototype.DOMScroll]];
    this.active();
  }

  wheelChange (e) {
    const layer = this.layer;
    const delta = (e.wheelDelta / 120) * 30;
    const deltalX = layer.size.w / 2 - (e.offsetX || e.layerX);
    const deltalY = (e.offsetY || e.layerY) - layer.size.h / 2;

    const px = {x: (e.offsetX || e.layerX), y:(e.offsetY || e.layerY)};
    const zoomPoint = this.layer.getPositionFromPX(px);
    const zoom = this.layer.zoom + delta;
    const newRes = this.layer.getResFromZoom(zoom);

    const center = new Position(zoomPoint.x + deltalX * newRes, zoomPoint.y + deltalY * newRes);
    this.layer.moveTo(zoom, center);
    stopEventBubble(e);
  }

  DOMScroll (e) {
    stopEventBubble(e);
  }

  active () {
    for (let i = 0, len = this.Events.length; i < len; i ++) {
      const type = this.Events[i][0];
      let listener = this.Events[i][1];
      listener = bindAsEventListener(listener, this);
      this.div.addEventListener(type, listener, true);
    }
  }
}