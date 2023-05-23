const filesystem = require ('./node_modules/graceful-fs/graceful-fs');
const inquirer =require('inquirer');
const {Circle, Tiangle, Square} = require('./lib/shapes');

class Svg() {
 this.textEl = ''
 this.shapeEl = ''
}
render(){
  return`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">`
}
setTextEl(text,color){
  this.textEl = `<text x="145" y="130" font-size="65" text-anchor="middle" fill="RED">SVG</text>`
}
setShapeEl(shape){
  this.shapeEl = shape.render()
}


const questions ={
  {
    typeof;
  }
}