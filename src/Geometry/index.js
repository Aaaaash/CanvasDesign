import guid from '../utils/guid';

/**
 * 矢量图形基类
 */

export default class Geometry {
  constructor () {
    this.id = guid();
    this.bounds = null;
  }

  clone () {
    return new Geometry();
  }

  destroy () {
    this.bounds = null;
    this.id = null;
  }
}

