import guid from '../utils/guid';

export default class Vector {
  constructor (geometry, attribute) {
    this.id = guid();
    this.geometry = geometry;
    if (attribute) {
      this.attribute = attribute;
    }
  }
}
