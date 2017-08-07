import Geometry from './index';
import { Bounds } from '../CanvasDesign';

export default class Img extends Geometry {
  constructor (point, image) {
    super();
    this.point = point;
    if (typeof image === 'image') {
      this.useUrl = false;
      this.image = image;
    } else {
      this.useUrl = true;
      this.image = image;
    }
    this.geoType = 'Img';
  }

  getBounds () {
    return new Bounds(this.point.x, this.point.y, this.point.x, this.point.y);
  }
}