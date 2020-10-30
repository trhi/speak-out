/*
[255, 0, 153], // pink
[0, 153, 153], // turquoise
[255, 255, 102], // light yellow
[153, 51, 204], // purple
[51, 204, 255], // light blue
[255, 153, 0], // orange
[0, 204, 153], // light green
[255, 0, 102], // red
[255, 204, 102], // light orange
[51, 153, 255], // dark blue
[255, 153, 153], // light red
[204, 102, 204] // light purple
*/

//pastel colors?
//saturated colors?
//give them names?
var colorPalette1 = [

  [255, 255, 102], // yellow

  [255, 204, 102], // yellow orange
  [255, 153, 0], // orange

  [255, 0, 102], // red, change this to something less intense?
  [255, 153, 153], // light red
  [255, 0, 153], // pink

  [153, 51, 204], // purple
  [204, 102, 204], // light purple

  [51, 204, 255], // light blue
  [51, 153, 255], // dark blue

  [0, 153, 153], // blue green
  [0, 204, 153], // green

]

var palette1PALE = [
  [255, 0, 153, 127], // pink
  [0, 153, 153, 127], // turquoise
  [255, 255, 102, 127], // light yellow
  [153, 51, 204, 127], // purple
  [51, 204, 255, 127], // light blue
  [255, 153, 0, 127], // orange
  [0, 204, 153, 127], // light green
  [255, 0, 102, 127], // red
  [255, 204, 102, 127], // light orange
  [51, 153, 255, 127], // dark blue
  [255, 153, 153, 127], // light red
  [204, 102, 204, 127] // light purple
]

var colorPalette2 = [

  [255, 223, 0], // yellow
  [241, 181, 11], // yellow orange

  [241, 135, 29], // orange
  [241, 97, 33], // orange red


  [241, 39, 39], // red
  [200, 2, 134], // red purple

  [109, 36, 139], // purple
  [68, 54, 162], // purple blue

  [18, 120, 196], // blue
  [0, 168, 196], // blue green

  [0, 142, 91], // green
  [139, 186, 37], // green yellow

]

var palette2PALE = [

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


function setup() {
  createCanvas(400, 400);


}

function mouseClicked(){

    var color = get(mouseX, mouseY);
    console.log("Mouse clicked here: " + mouseX + ", " + mouseY);
    console.log("Color is: " + color);
    textSize(10);
    fill("white");
    text(color, mouseX, mouseY);

}

function draw() {

  background(255, 255, 255);

  var x;
  var y;
  var boxDimension = 100;
  var colorIndex = 0;
  var palette = colorPalette2;

  for ( y = 0; y < 4; y++ ){

      for ( x = 0; x < 4; x++ ){

        fill(palette[colorIndex]);
        rect(x * 100, y * 100, boxDimension, boxDimension);
        colorIndex++;

      }

  }

/*

  fill(colorPalette[0]);
  rect(0, 0, 100, 100);

  fill(colorPalette[1]);
  rect(100, 0, 100, 100);

  fill(colorPalette[2]);
  rect(200, 0, 100, 100);

  fill(colorPalette[3]);
  rect(300, 0, 100, 100);

  //

  fill(colorPalette[4]);
  rect(0, 100, 100, 100);

  fill(colorPalette[5]);
  rect(100, 100, 100, 100);

  fill(colorPalette[6]);
  rect(200, 100, 100, 100);

  fill(colorPalette[7]);
  rect(300, 100, 100, 100);

  //

  fill(colorPalette[8]);
  rect(0, 200, 100, 100);

  fill(colorPalette[9]);
  rect(100, 200, 100, 100);

  fill(colorPalette[10]);
  rect(200, 200, 100, 100);

  fill(colorPalette[11]);
  rect(300, 200, 100, 100);

  //

  fill(colorPalette[12]);
  rect(0, 300, 100, 100);

  fill(colorPalette[0]);
  rect(100, 300, 100, 100);

  fill(colorPalette[1]);
  rect(200, 300, 100, 100);

  fill(colorPalette[2]);
  rect(300, 300, 100, 100);

  */

  noLoop();
}
