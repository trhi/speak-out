/*
*
*   Describe internal life of an attractor.
*
*/

var attractorDiameter = 40;

function attractor(quality, attractorX, attractorY, lifespan) {

  this.quality = quality;
  this.attractorPosition = new p5.Vector(attractorX, attractorY);
  this.lifespan = lifespan;
  this.gravityOfAttractor = random(2,8);
  this.existance = "defined";

  this.existsIn = voronoiGetSite(this.attractorPosition.x, this.attractorPosition.y, false);

  /*
  *
  *   Display information about attractor.
  *
  */

  this.giveInformation = function () {
    textSize(20);
    fill("black");
    noStroke();
    //textFont(myFont);
    text(this.quality, this.attractorPosition.x + 0.75*attractorDiameter, this.attractorPosition.y + 0.21*attractorDiameter);
  }


  /*
  *
  *   Display attractor
  *
  */

  this.display = function() {

    this.lifespan -= 0.1;
    if(this.lifespan <= 0){
      //instead of removing them from the array,
      //set their existance to "undefined"
      this.existance = "undefined";

    } else {
      noFill();
      if(this.quality == "repulsor"){ // not using atm
        fill(0);
      }
      stroke("white");
      ellipse(this.attractorPosition.x, this.attractorPosition.y, attractorDiameter, attractorDiameter);
    }

    var cursorPosition = createVector(mouseX, mouseY);
    var attractorCursorDistance = p5.Vector.dist(this.attractorPosition, cursorPosition);
    if(attractorCursorDistance < attractorDiameter/2){
      this.giveInformation();
    }
  }//close this.display

}//close attractor
