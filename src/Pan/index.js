import stopEventBubble from '../utils/stopEventBubble';
import bindAsEventListener from '../utils/bindAsEventListener';

export default class pan {
  constructor (layer) {
    this.layer = layer;
    this.div = layer.div;
    this.dragging = false;
    this.Events = [
      ["mousedown", this.startPan],
      ["mousemove", this.pan],
      ["mouseup", this.endPan],
    ];
    this.active();
  }

  startPan (e) {
    // if (e.button === 2) {
      stopEventBubble(e);
      this.dragging = true;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      this.layer.div.style.cursor = 'move';
    // }
  }

  pan (e) {
    if (this.dragging) {
      const layer = this.layer;
      const dx = e.clientX - this.lastX;
      const dy = e.clientY - this.lastY;
      this.lastX = e.clientX;
      this.lastY = e.clientY;
      layer.center.x -= dx * layer.res;
      layer.center.y += dy * layer.res;
      layer.moveTo(layer.zoom, layer.center);
    }
    stopEventBubble(e);
  }

  endPan (e) {
    this.layer.div.style.cursor = 'default';
    this.dragging = false;
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