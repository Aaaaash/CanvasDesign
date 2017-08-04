import Point from './Point';
import { Bounds } from '../CanvasDesign';

export default class Circle extends Point {
  constructor (x, y, radius) {
    super(x, y);
    this.radius = radius;
    this.geoType = 'Circle';
  }

  getBounds () {
    if (!this.bounds) {
      this.bounds = new Bounds(
        this.x - this.radius,
        this.y - this.radius,
        this.x + this.radius,
        this.y + this.radius,
      );
      return this.bounds;
    } else {
      return this.bounds;
    }
  }
}