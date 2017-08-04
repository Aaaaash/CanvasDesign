import CanvasDesign from './CanvasDesign';
import Layer from './Layer';
import Point from './Geometry/Point';
import Vector from './Vector';

window.canvasDesign = new CanvasDesign();

const div = document.querySelector('#app');
const layer = new Layer(div);
console.log(layer);
let vectors = [];
for(var i = 0; i<1000; i++) {
  var point = new Point((Math.random()*800-400), (Math.random()*600-300));
  vectors.push(new Vector(point));
}

layer.addVectors(vectors);
let differ = 1;

const timer = setInterval(function(){
  layer.zoom -= differ; 
  layer.renderer.redraw();
  if(layer.zoom < 50){
    differ = -1;
  }
  if(layer.zoom > 200) {
    differ = 1;
  }
},30);