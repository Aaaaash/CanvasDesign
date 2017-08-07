import Geometry from './index';

export default class Line extends Geometry {
  constructor (points) {
    this.points = points;
    this.geoType = "Line";
  }
}