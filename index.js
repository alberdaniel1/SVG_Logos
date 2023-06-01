const filesystem = require ('./node_modules/graceful-fs/graceful-fs');
const inquirer =require('inquirer');
const {Circle, Triangle, Square} = require('./lib/shapes');

class Svg {
  constructor(){
 this.textEl = ''
 this.shapeEl = ''
}
render(){
  return`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeEl}${this.textEl}</svg>`
}
setTextEl(text,color) {
  this.textEl = `<text x="145" y="130" font-size="65" text-anchor="middle" fill="${color}">${text}</text>`
}
setShapeEl(shape) {
  this.shapeEl = shape.render()
}
}
// prompted questions to create the logo
const questions = [
  {
    type: 'input',
    name: 'text-color',
    message: 'TEXT COLOR: enter a color keyword:',
  },
  {
    type: 'input',
    name: ' text',
    message: ' TEXT: Enter up to 3 charecters:',
  },
  {
    type: 'input',
    name: 'shape',
    message: 'SHAPE COLOR: Enter a color keyword:',
  },
  {
    type: 'list',
    name: 'pixel-image',
    message: 'Choose which Pixal Image you would like.',
    choices: ['Circle', 'Square', 'Triangle'],
  },
];


// function write data to file
function writeToFile(fileName, data ) {
  console.log("Writing [" + data + "] to file [" + fileName +"]")
  filesystem.writeToFile(fileName, data, function (err) {
    if(err) {
      return console.log(err);
    }
    console.log("Logo.sgv has been created!");
  });
}

async function init() {
  console.log("Initiating init");
  var svgString = "";
  var svg_File = "logo.svg";


  const answers = await inquirer.prompt(questions);

  // User text
  var user_text = "";
  if(answers.text.length > 0 && answers.text.length < 4) {
    user_text = answers.text;
  } else {
    console.log('Invalid user text. Enter 1-3 Characters only');
    return;
  }

console.log("User text: [" + user_text +"]");
// font color
user_font_color = answers["text-color"];
console.log("User font color: [" + user_font_color +"]");
// shape color
user_shape_color = answers.shape;
console.log("User shape color: [" + user_shape_color +"]");
// shape type
user_shape_type = answers["pixel-image"];
console.log("User shape type: [" + user_shape_type +"]");


//user shape
let user_shape;
if(user_shape_type === "Square"  || user_shape_type === "square"){
  user_shape = new Square();
  console.log ("User selected Square shape");
}
else if (user_shape_type === "Circle"|| user_shape_type === "circle") {
 user_shape = new Circle();
 console.log("User selected Circle ")
} 
else if (user_shape_type === "Triangle"|| user_shape_type === "triangle") {
  user_shape = new Triangle();
  console.log("User selected triangle ")
 } 
 else {
  console.log("Invalid shape");
 }
 user_shape.setColor(user_shape_color);


 var svg = new Svg();
 svg.setTextEl(user_text, user_font_color);
 svg.setShapeEl(user_shape);
 svgString = svg.render();

 console.log("Display shape:\n\n"+ svgString);


 console.log("Shape gneration complete!");
 console.log("Writing shape to file...");
 writeToFile(svg_File,svgString);
}
init()