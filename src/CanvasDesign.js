

export default class CanvasDesign {
  defaultStyle () {
    this.fill = true;
    this.stroke = true;
    this.pointRadius = 5;
    this.fillOpacity = 0.6;
    this.strokeOpacoty = 1;
    this.fillColor = '#FF004F';
    this.strokeColor = '#333';
  }

  bounds (...args) {
    return new Bounds(...args);
  }

  position (...args) {
    return new Position(...args);
  }

  size (...args) {
    return new Size(w, h);
  }
}

export class Bounds {
  constructor (x1, y1, x2, y2) {
    this.leftBottom = new Position(x1, y1);
    this.rightTop = new Position(x2, y2);
    this.leftTop = new Position(x1, y2);
    this.rightBottom = new Position(x2, y1);

    this.left = x1;
    this.right = x2;
    this.bottom = y1;
    this.top = y2;
  }
}


export class Position {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Size {
  constructor (w, h) {
    this.w = w;
    this.h = h;
  }
}

export class DefaultStyle {
  constructor () {
    this.fill = true;
    this.stroke = true;
    this.pointRadius = 5;
    this.fillOpacity = 0.6;
    this.strokeOpacoty = 1;
    this.fillColor = '#FF004F';
    this.strokeColor = '#333';
  }
}