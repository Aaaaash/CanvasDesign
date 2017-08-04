/**
 * 图层类
 */
import Canvas from '../Canvas';
import CanvasDesign from '../CanvasDesign';
import { Size, Bounds, DefaultStyle } from '../CanvasDesign';

export default class Layer {
  constructor (div) {
    const style = div.style;
    const size = new Size(parseInt(style.width), parseInt(style.height)); 
    this.size = size;
    this.div = div;
    this.maxBounds = new Bounds(-size.w / 2, -size.h / 2, size.w / 2, size.h / 2);
    this.bounds = new Bounds(-size.w / 2, -size.h / 2, size.w / 2, size.h / 2);

    // 缩放比
    this.zoom = 100;
    this.vectors = {};
    this.vectorsCount = 0;
    this.renderer = new Canvas(this);
  }

  addVectors (vectors) {
    this.renderer.lock = true;
    for (let i = 0, len = vectors.length; i < len; i ++) {
      if (i === len - 1) this.renderer.lock = false;
      this.vectors[vectors[i].id === vectors[i]];
      this.drawVector(vectors[i]);
    }
    this.vectorsCount += vectors.length;
  }

  drawVector(vector) {
    let style = null;
    if (!vector.style) {
      style = new DefaultStyle();
    }
    this.renderer.drawGeometry(vector.geometry, style);
  }
}