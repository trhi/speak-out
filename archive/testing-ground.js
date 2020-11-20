var blueGreen = [18, 120, 196, 127];
var diameter = 100;
var color;

var palette = [
  [255, 223, 0, 127], // yellow
  [241, 181, 11, 127], // yellow orange
  [241, 135, 29, 127], // orange
  [241, 97, 33, 127], // orange red
  [241, 39, 39, 127], // red
  [200, 2, 134, 127], // red purple
  [109, 36, 139, 127], // purple
  [68, 54, 162, 127], // purple blue
  [18, 120, 196, 127], // blue
  [0, 168, 196, 127], // blue green
  [0, 142, 91, 127], // green
  [139, 186, 37, 127], // green yellow
]

function setup(){
  createCanvas(500, 2000);
}

function mouseClicked(){
  var color = get(mouseX, mouseY);
  console.log("Mouse clicked here: " + mouseX + ", " + mouseY);
  console.log("Color is: " + color);
  textSize(10);
  fill("black");
  text(color, mouseX, mouseY);

}

function draw(){
  strokeWeight(1);
  stroke("white");

  for (i=0; i<palette.length;i++){
    fill(palette[i]);
    ellipse(100, i*100, diameter, diameter);
    ellipse(150, i*100, diameter, diameter);
    ellipse(100, i*100, diameter, diameter);
    ellipse(100, i*100, diameter, diameter);
    ellipse(100, i*100, diameter, diameter);
    ellipse(100, i*100, diameter, diameter);
    ellipse(100, i*100, diameter, diameter);
    ellipse(100, i*100, diameter, diameter);
    ellipse(100, i*100, diameter, diameter);
    ellipse(100, i*100, diameter, diameter);
    ellipse(100, i*100, diameter, diameter);



  }

  noLoop();
}
