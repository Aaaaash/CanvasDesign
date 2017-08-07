import CanvasDesign from './CanvasDesign';
import Layer from './Layer';
import Point from './Geometry/Point';
import Circle from './Geometry/Circle';
import Img from './Geometry/Img';
import plane from './plane.png';

import Vector from './Vector';

window.canvasDesign = new CanvasDesign();

const div = document.querySelector('#app');
const layer = new Layer(div);
var circleStyle = {fillColor:"blue", fill:true, stroke:true, fillOpacity:1, strokeOpacity:1};
var imgStyle = {fill:true, stroke:true, fillOpacity:1, strokeOpacity:1, fixedSize: false};
let vectors = [];

const c = new Circle(50, 50, 10);
const vec = new Vector(c);
vec.style = circleStyle;
vectors.push(vec);
const img = new Img(new Point(200, 200), plane);
const vecImage = new Vector(img);
vecImage.style = imgStyle;
vectors.push(vecImage);

layer.addVectors(vectors);

const circle = document.querySelector('#circle');
const point = document.querySelector('#point');
const big = document.querySelector('#big');
const small = document.querySelector('#small');
const left = document.querySelector('#left');
const right = document.querySelector('#right');

big.onclick = function() {
  let zoom = layer.zoom + 20;
  layer.moveTo(zoom);
}

small.onclick = function() {
  let zoom = layer.zoom - 20;
  layer.moveTo(zoom);
}

left.onclick = function() {
  layer.center.x-=10;
  layer.moveTo(layer.zoom);
}
right.onclick = function() {
  layer.center.x+=10;
  layer.moveTo(layer.zoom);
}

point.onclick = function addPoint() {
	var vectors = [];
	var point = new Point((Math.random()*400-200), (Math.random()*300-150));
	vectors.push(new Vector(point));
	layer.addVectors(vectors);
}

circle.onclick = function addCircle() {
	var vectors = [];
	var circle = new Circle((Math.random()*400-200), (Math.random()*300-150), Math.random()*10 + 5);
	var vector = new Vector(circle);
	vector.style = circleStyle;
	vectors.push(vector);
	layer.addVectors(vectors);
}
