import AideCanvas from '../AideCanvas';
import { Bounds } from '../CanvasDesign';

export default class AideLayer {
  constructor (layer) {
    this.layer = layer;
    this.bounds = layer.bounds;
    this.zoom = layer.zoom;
    this.getRes = layer.getRes.bind(this);
    this.center = layer.center;
    this.size = layer.size;
    this.renderer = new AideCanvas(this);
  }

  addVectors (vectors) {
    this.vectors = vectors;
    vectors.forEach((vector) => {
      this.drawControl(vector);
      
    });
  }

  scaleTo (zoom, center) {
    this.zoom = zoom;
    if (!center) {
      center = this.center;
    }
    const res = this.getRes();
    const width = this.size.w * res;
    const height = this.size.h * res;

    const bounds = new Bounds(
      center.x - width / 2,
      center.y - height / 2,
      center.x + width / 2,
      center.y + height / 2
    );
    this.bounds = bounds;
    this.renderer.ctx.clearRect(0, 0, this.size.w, this.size.h);
    for(let id in this.vectors) {
      this.drawControl(this.vectors[id]);
    }
  }

  drawControl (vector) {
    const { geoType } = vector.geometry;
    if (geoType === 'Img') {
      let width;
      let height;
      let x = vector.geometry.point.x;
      let y = vector.geometry.point.y;
      if (typeof vector.geometry.image === 'string') {
        const image = new Image();
        image.src = vector.geometry.image;
        image.onload = () => {
          let width = 0;
          let height = 0;
          width = image.width;
          height = image.height;
          this.renderer.drawAuxiliaryLine({ width, height, x, y });
        }
      } else {
        width = vector.geometry.image.width;
        height = vector.geometry.image.height;
        this.renderer.drawAuxiliaryLine({ width, height, x, y });
      }
    }
    if (geoType === 'Circle') {
      this.renderer.drawAuxiliaryLine({
        width: vector.geometry.radius * 2,
        height: vector.geometry.radius * 2,
        x:  vector.geometry.x,
        y:  vector.geometry.y,
        id: vector.id,
      });
    }
  }
}
