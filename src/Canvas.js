/**
 * canvas绘图类
 */
import CanvasDesign, { Position } from './CanvasDesign';
import Point from './Geometry/Point';
import Circle from './Geometry/Circle';

export default class Canvas {
  constructor (layer) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.lock = true;
    this.layer = layer;
    this.setSize(layer.size);
    this.geometrys = {};
    layer.div.appendChild(this.canvas);
  }

  setSize (size) {
    this.canvas.width = size.w;
    this.canvas.height = size.h;
    this.canvas.style.width = `${size.w}px`;
    this.canvas.style.height = `${size.h}px`;
  }

  drawGeometry (geometry, style) {
    this.geometrys[geometry.id] = [geometry, style];

    if (!this.lock) {
      this.redraw();
    }
  }

  redraw() {
    this.context.clearRect(0, 0, this.layer.size.w, this.layer.size.h);
    let geometry;
    let style;
    if (!this.lock) {
      for (let id in this.geometrys) {
        if (this.geometrys.hasOwnProperty(id)) {
          geometry = this.geometrys[id][0];
          style = this.geometrys[id][1];
          this.draw(geometry, style, geometry.id);
        }
      }
    }
  }

  draw (geometry, style, id) {
    if (geometry.geoType === 'Point') {
      this.drawPoint(geometry, style, id);
    }
    if (geometry.geoType === 'Circle') {
      this.drawCircle(geometry, style, id);
    }
    if (geometry.geoType === 'Img') {
      this.drawImage(geometry, style, id);
    }
  }

  drawPoint (geometry, style, id) {
    const radius = style.pointRadius;
    const twoPi = Math.PI * 2;
    const pt = this.getLocalXY(geometry);
    
    if (style.fill) {
      this.setCanvasStyle('fill', style);
      this.context.beginPath();
      this.context.arc(pt.x, pt.y, radius, 0, twoPi, true);
      this.context.fill();
    }

    if (style.stroke) {
      this.setCanvasStyle('stroke', style);
      this.context.beginPath();
      this.context.arc(pt.x, pt.y, radius, 0, twoPi, true);
      this.context.stroke();
    }

    this.setCanvasStyle('reset');
  }

  drawCircle (geometry, style, id) {
    const radius = geometry.radius;
    const twoPi = Math.PI * 2;
    const pt = this.getLocalXY(geometry);
    if (style.fill) {
      this.setCanvasStyle('fill', style);
      this.context.beginPath();
      this.context.arc(pt.x, pt.y, radius / this.layer.res, 0, twoPi, true);
      this.context.fill();
    }

    if (style.stroke) {
      this.setCanvasStyle('stroke', style);
      this.context.beginPath();
      this.context.arc(pt.x, pt.y, radius / this.layer.res, 0, twoPi, true);
      this.context.stroke();
    }

    this.setCanvasStyle('reset');
  }

  drawImage (geometry, style, id) {
    let img;
    const canvas = this;
    if (!geometry.useUrl) {
      img = geometry.image;
      imageLoad();
    } else {
      img = new Image();
      img.src = geometry.image;
      img.onload = imageLoad;
    }

    function imageLoad () {
      canvas.setCanvasStyle("fill", style);
      var fixedSize = style.fixedSize;
      var pt = canvas.getLocalXY(geometry.point);
      var width = style.width || img.width;
      var height = style.width || img.height;
      if (fixedSize) {
        var offsetX = width / 2;
        var offsetY = height / 2;
        canvas.context.drawImage(img, pt.x - offsetX, pt.y - offsetY, width, height);
      } else {
        var res = canvas.layer.getRes();
        var offsetX = width / 2 / res;
        var offsetY = height / 2 / res;
        canvas.context.drawImage(img, pt.x - offsetX, pt.y - offsetY, width / res, height / res);
      }
      if (geometry.useUrl) {
        geometry.useUrl = false;
        geometry.image = img;
      }
      canvas.setCanvasStyle("reset");
    }
  }

  setCanvasStyle (type, style) {
    if (type === "fill") {     
      this.context.globalAlpha = style['fillOpacity'];
      this.context.fillStyle = style['fillColor'];
    } else if (type === "stroke") {  
      this.context.globalAlpha = style['strokeOpacity'];
      this.context.strokeStyle = style['strokeColor'];
      this.context.lineWidth = style['strokeWidth'];
    } else {
      this.context.globalAlpha = 0;
      this.context.lineWidth = 1;
    }
  }

  getLocalXY (point) {
    const resolution = this.layer.getRes();
    const extent = this.layer.bounds;
    const x = (point.x / resolution + (-extent.left / resolution));
    const y = ((extent.top / resolution) - point.y / resolution);
    return {x: x, y: y};
  }
}
