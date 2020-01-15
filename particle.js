//This is all the code which describes the internal life of particles

//this code is courtesy of the p5js example: jitterbug
function particle(tempX, tempY, tempDiameter) {

  this.display = function() {
    fill(this.color);
    ellipse(this.positionVector.x, this.positionVector.y, this.diameter, this.diameter);
  };

  //set the x,y coordinates of the origin of the particle
  //we can use these originX and originY coordinates to check the bugs current x,y position relative to the generator of the cell, ie. relative to the cell.
  //ie. we can measure distance between the current x,y and the generators of all the voronoicells to determine which cell the particle is currently in
  //and thus we can translate its x,y to make it "collide" away from the boundary delimiting its origin cell

  this.isAttractedTo = random(attractorQualities);
  var gravityOfAttractor;
  this.gravityOfAttractor = random(4, 10);
  this.towardsAttractor = createVector();
  //console.log("This particle is attracted to: " + this.isAttractedTo);

  this.originX = tempX;
  this.originY = tempY;
  this.originVector = createVector(tempX, tempY);
  //print("originVector is:" + this.originVector);

  //set the x,y coordinates of the particle. These are altered everytime the .move() -method is called.
  this.positionVector = createVector(tempX, tempY);
  //print("positionVector is:" + this.positionVector);
  //this.x = tempX;
  //this.y = tempY;
  this.diameter = tempDiameter;

  this.towardsHome = createVector();

  //we could use speed and factor even to set the general "propensity of the particles to move" for any particular simulation
  //This was originally called "speedvector"
  //but was later named to propensityToMove, in order to be more descriptive

  //This used to be: createVector(constrain(10 * random(), 25, 50), constrain(10 * random(), 25, 50))
  this.propensityToMove = createVector(random(-50, 50), random(-50, 50));
  //print("speedVector is:" + this.speedVector);

  //var randomSpeed = 10*random();
  //var speed = constrain(randomSpeed, 0, 5);
  //this.speed = speed;

  //This is to initialise the xoff-variable for each particle to start at position 0
  //in the perlin noise table of "random" nubers
  var xoff;
  this.xoff = random(0, 10000);

  var yoff;
  this.yoff = random(0, 10000);

  var gravityOfHome;
  this.gravityOfHome = random(2, 3);
  //print("Gravity of Home is: " + this.gravityOfHome);

  this.factor = 3 * random(1, 10);

  var cellId = voronoiGetSite(tempX, tempY, false);
  var particleBirthColor = voronoiGetColor(cellId);
  //this.color = particleBirthColor;
  this.particleBirthColor = particleBirthColor;
  this.color = particleBirthColor;

  //Do not like the way that the particles are moving. In general, they hover around
  //the generator, instead of filling the entire space of their cell as would be
  //natural...

  this.move = function() {

    /*
    //functional random noise walker
    //constrain(this.positionVector.x, 20, width-20)
    //pick a random number between negative speed and positive speed
    //and multiply it by the "factor"
    var randomX = random(-this.speedVector.x,this.speedVector.x)*this.factor;
    var randomY = random(-this.speedVector.y,this.speedVector.y)*this.factor;
    this.positionVector.add(randomX, randomY);
    //print("positionVector is now" + this.positionVector);
    */

    //In the perlin noise version, we will simply iterate through the perlin noice
    //table of numbers by incrementing the xoff and yoff variables for each particle.
    let randomXNoise = noise(this.xoff)
    this.xoff += 0.02;

    let randomYNoise = noise(this.yoff)
    this.yoff += 0.01;

    let randomXSpeedFactor = map(randomXNoise, 0, 1, -7, 7);
    let randomYSpeedFactor = map(randomYNoise, 0, 1, -7, 7);

    this.positionVector.add(randomXSpeedFactor, randomYSpeedFactor);
    this.positionVector.dot(this.propensityToMove);

    //this code will make it back into a jitter bug..... althought even crazier
    //and more jittery than before :DDDDDDD
    //this.propensityToMove.rotate(map(random(-randomXNoise, randomXNoise), 0, 1, -360, 360));
    //this.positionVector.add(this.propensityToMove);

    //In other words, I need to add random rotations to the random movement
    //but even these random rotations need to be defined by perlin noise,
    //perhaps using the second dimension of perlin noise

    /*
    //random() movement:
    var randomX = random(-this.speedVector.x,this.speedVector.x)*this.factor;
    var randomY = random(-this.speedVector.y,this.speedVector.y)*this.factor;
    this.positionVector.add(randomX, randomY);
    */

    this.positionVector.x = constrain(this.positionVector.x, drawingBorderX, width)
    this.positionVector.y = constrain(this.positionVector.y, drawingBorderY, height)

    //THIS DOES NOT WORK
    //this.goTowardsAttractor();

    this.amIOnTheEdge();

    if (!this.amIHome()) {
      this.towardsHome = p5.Vector.sub(this.originVector, this.positionVector);
      this.towardsHome.normalize();

      this.towardsHome.mult(this.gravityOfHome);
      //*this.gravityOfHome
      //print("This is the towarards home vector:" + this.towardsHome);
      //print("This is the originVector:" + this.originVector);
      this.positionVector.add(this.towardsHome);

    }

  } //close this.move()

  this.thereIsAMatch = function() {
    for (i = 0; i < attractors.length; i++) {
        //console.log(attractors[i].quality);
        console.log("Printing the quality of this attractor:" + attractors[i].quality);
        console.log("Printing what I am attracted to:" + this.isAttractedTo);
        if (attractors[i].quality === this.isAttractedTo) {
            return i;
        }//end if
    }//end for
  }//close thereIsAMatch

  //THIS DOES NOT WORK
  //Now this does work, but I've made a very awkward version,
  //in order to avoid looping through the entire "is there an attractor match" loop for
  //each particle and each attractor....
  //need to implement the model outlined in my sketchbook today 19.12.2019:
  //eg. attractorQuality: work, particles attracted to: [].
  //and then at the spawning of each attractor, assign specific particles
  //to that attractor, so that once an attractor is born,
  //at each draw() cycle,
  this.goTowardsAttractor = function(attractorIndex) {
    //var enoughIsEnough = false;

      //THIS DOES NOT WORK
      //Now it works, but of course, it crashes the entire system...
      //because you are trying to iterate through every single particle checking all
      //the matches between each particle and each attractor at each draw cycle...
      //that does not work.
      //New logic: when an attractor is born, assign x particles to it
      //during the lifespan of the attractor, at each draw cycle,
      //move the selected particles towards the attractor with some force.
      //for (i = 0; !enoughIsEnough && i < attractors.length; i++) {
        //console.log(attractors[i].quality);
        //console.log("Printing the quality of this attractor:" + attractors[i].quality);
        //console.log("Printing what I am attracted to:" + this.isAttractedTo);
        //if (attractors[i].quality === this.isAttractedTo) {
          //console.log("There is an attractor match!");
          //this.diameter += 1;

          console.log("Going towards attractor....");

          this.towardsAttractor = p5.Vector.sub(attractors[attractorIndex].attractorPosition, this.positionVector);
          this.towardsAttractor.normalize();

          //need to define this.gravityOfAttractor = random(3,8);
          //either define gravityOfAttractor as a property of the particle
          //or of the attractor itself...

          //COMMENTED OUT multiplying the towardsAttractor-vector by a scalar
          //this.towardsAttractor.mult(attractors[attractorIndex].gravityOfAttractor);
          this.positionVector.add(this.towardsAttractor);
          //enoughIsEnough = true;

        //} //close if
      //} //close for

  } //close this.goTowardsAttractor

  this.amIOnTheEdge = function() {

    if (this.positionVector.x == width) {
      this.positionVector.x = 0;
    }
    if (this.positionVector.x == 0) {
      this.positionVector.x = width;
    }

    if (this.positionVector.y == height) {
      this.positionVector.y = 0;
    }
    if (this.positionVector.y == 0) {
      this.positionVector.y = height;
    }

  } //close this.amIOnTheEdge()

  this.amIHome = function() {
    //bugColorMatchesCell is the cell color of the origin of the bug
    var colorOfTheLand = get(this.positionVector.x, this.positionVector.y);
    //print("This is the background color" + colorOfTheLand);

    //Now this works way better................
    //Particles no longer jitter around the generator...
    if (this.particleBirthColor == colorOfTheLand ||
          (this.positionVector.x == this.originX ||
            (this.positionVector.x > this.originX-10 &&
              this.positionVector.x < this.originX+10) ||
              this.positionVector.y == this.originY ||
              (this.positionVector.y > this.originY-10 &&
                this.positionVector.y < this.originY+10)
          )
        ){
      return true;
    } //close if
    else {
      return false
    } //close else

  } //close amIHome()


}//close particle()
