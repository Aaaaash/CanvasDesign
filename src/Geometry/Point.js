import Geometry from './index';
import CanvasDesign from '../CanvasDesign';

/**
 * 点
 */
export default class Point extends Geometry {
  constructor (x, y) {
    super();
    this.x = x;
    this.y = y;
    this.geoType = 'Point';
  }

  getBounds () {
    if (!this.bounds) {
      const x = this.x;
      const y = this.y;
      this.bounds = new CanvasDesign.bounds(x, y, x, y);
      return this.bounds;
    } else {
      return this.bounds;
    }
  }

  clone () {
    return new Point(this.x, this.y);
  }
}
