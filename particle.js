var particleDiameter;

//This is all the code which describes the internal life of particles

//this code is courtesy of the p5js example: jitterbug
//removed diameter of particle from constructor...
function particle(tempX, tempY) {

      this.display = function() {
        fill(this.color);
        ellipse(this.positionVector.x, this.positionVector.y, this.diameter, this.diameter);
      };

      //set the x,y coordinates of the origin of the particle
      //we can use these originX and originY coordinates to check the bugs current x,y position relative to the generator of the cell, ie. relative to the cell.
      //ie. we can measure distance between the current x,y and the generators of all the voronoicells to determine which cell the particle is currently in
      //and thus we can translate its x,y to make it "collide" away from the boundary delimiting its origin cell

      particleDiameter = 10;
      this.diameter = particleDiameter;

      this.isAttractedTo = random(attractorQualities);
      var gravityOfAttractor;
      this.gravityOfAttractor = random(4, 10);
      this.towardsAttractor = createVector();
      //console.log("This particle is attracted to: " + this.isAttractedTo);

      //actually we dont need originX and originally
      //we just need originVector, because we can access .x and .y through it
      this.originX = tempX;
      this.originY = tempY;
      this.originVector = createVector(tempX, tempY);
      //print("originVector is:" + this.originVector);

      //set the x,y coordinates of the particle. These are altered everytime the .move() -method is called.
      this.positionVector = createVector(tempX, tempY);
      //print("positionVector is:" + this.positionVector);
      //this.x = tempX;
      //this.y = tempY;


      this.towardsHome = createVector();

      //we could use speed and factor even to set the general "propensity of the particles to move" for any particular simulation
      //This was originally called "speedvector"
      //but was later named to propensityToMove, in order to be more descriptive

      //This used to be: createVector(constrain(10 * random(), 25, 50), constrain(10 * random(), 25, 50))
      //Actually propensityToMove should be a scalar as well....
      //If set to a vector, it will cause the particle to express a tendency
      //to move in a particular direction, ie. more towards the left, top, etc...
      //In fact, what I am thinking of with propensityToMove is actually
      //already served by this.factor...
      //this.propensityToMove = createVector(random(-50, 50), random(-50, 50));
      //console.log("My propoensity to move is:" + this.propensityToMove);

      //print("speedVector is:" + this.speedVector);

      //each particle has an acceleration.
      //This acceleration is altered in particular depending on
      //where they are located - whether at home or not.
      this.accelerationVector = createVector(1, 1);

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
      this.originalGravityOfHome = this.gravityOfHome;
      console.log("Gravity of Home is: " + this.gravityOfHome);

      this.factor = 3 * random(1, 10);
      console.log("My factor is: " + this.factor);

      var cellId = voronoiGetSite(tempX, tempY, false);

      //what format is this color being given in...
      //could be simply that this format does not match up
      //with the format that get() returns..
      //although
      var particleBirthColor = voronoiGetColor(cellId);

      this.particleBirthColor = particleBirthColor;
      console.log("Particle birth color is:" + particleBirthColor);



      //this.color = particleBirthColor;
      //console.log("Particle birth color is:" + particleBirthColor);

      //cannot use int() because it rounds the float DOWN to the nearest
      //integer.
      //this.particleBirthColor = int(particleBirthColor);

      //var roundedBirthColor = [0, 0, 0, 255];

      /*for(var i = 0; i < particleBirthColor.length; i++){
            roundedBirthColor[i] = round(particleBirthColor[i]);
      }
      this.particleBirthColor = roundedBirthColor;
      */

      var particleBirthColorSTRING = this.particleBirthColor.toString();
      console.log("This is the particle birth color as a string:" + particleBirthColorSTRING);

      //console.log("Particle birth color is now:" + this.particleBirthColor);
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

            if (!this.amIHome()) {

                  //console.log("Going towards home!");

                  //console.log("Increasing gravity of home!");
                  //if the particle is not at home, increase accelerationVector
                  //by multiplying it with the gravityOfHome vector
                  //accelerationVector will thus be incremented at each
                  //draw cycle, if the particle is not at home

                  //increment gravityOfHome for as long as they are not at home.
                  //small increments like 0.01 hardly make a huge difference

                  //IF you do not increment gravityOfHome,
                  //ie. += 0, then some Particles
                  //will venture deeper beyond home, than others, before returning
                  //all determined by their gravityOfHome -factor
                  //if you increment gravityOfHome, ALL particles will bounce
                  //back towards home much quicker.

                  //IF you increment gravityOfHome for every frame that Particles
                  //spend away from home, particles will in general tend to
                  //wander around their home rather than elsewhere,
                  //speedily returning once they realise they are away from home.
                  // eg. values like 0.1 or 0.3

                  //For next steps, I am going to continue using this rather
                  //conservative value for gravityOfHome,
                  //ie. I'll be working with a simulation where particles tend
                  //to gravitate towards their home, ie. where they tend to stay
                  //within the borders of their cells.
                  this.gravityOfHome += 0.1;
                  this.towardsHome = p5.Vector.sub(this.originVector, this.positionVector);
                  this.towardsHome.normalize();

                  this.towardsHome.mult(this.gravityOfHome);
                  //*this.gravityOfHome
                  //print("This is the towarards home vector:" + this.towardsHome);
                  //print("This is the originVector:" + this.originVector);
                  this.positionVector.add(this.towardsHome);
                  //this.positionVector.add(a)

            }//close if (!this.amIHome()

            //In the perlin noise version, we will simply iterate through the perlin noice
            //table of numbers by incrementing the xoff and yoff variables for each particle.
            let randomXNoise = noise(this.xoff)
            this.xoff += 0.02;

            let randomYNoise = noise(this.yoff)
            this.yoff += 0.01;

            let randomXSpeedFactor = map(randomXNoise, 0, 1, -7, 7);
            let randomYSpeedFactor = map(randomYNoise, 0, 1, -7, 7);

            this.positionVector.add(randomXSpeedFactor, randomYSpeedFactor);
            //this.positionVector.dot(this.propensityToMove);

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

            //so that the particles do not go off the visible canvas
            this.positionVector.x = constrain(this.positionVector.x, drawingBorderX, width)
            this.positionVector.y = constrain(this.positionVector.y, drawingBorderY, height)


            //THIS DOES NOT WORK
            //this.goTowardsAttractor();

            //this.amIOnTheEdge();



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
            } else if (this.positionVector.x == 0) {
              this.positionVector.x = width;
            }

            if (this.positionVector.y == height) {
              this.positionVector.y = 0;
            } else if (this.positionVector.y == 0) {
              this.positionVector.y = height;
            }

      } //close this.amIOnTheEdge()

      this.amIHome = function() {
            //bugColorMatchesCell is the cell color of the origin of the bug

            //get() returns a P5.Image

            //OK: Problem is this!!!!: colorOfTheLand is returning integers
            //For some inexplicable reason, particleBirthColor is returning a float....
            //The float would just need to be rounded to the nearest integers
            //And this comparison would go right.....

            //Finally, this works!!!!!
            //What I needed to do was to convert the RGBA arrays into strings
            //in order to be able to accurately compare them...
            //There was some difference, maybe difference of type or some small
            //difference in the formatting which made them appear unequal
            //even though their numberical values were equal...
            var colorOfTheLand = get(this.positionVector.x, this.positionVector.y);
            var colorOfTheLandSTRING = colorOfTheLand.toString();
            //console.log("This is the color of the land:" + colorOfTheLand);
            //console.log("This is the color of the land as a string:" + colorOfTheLandSTRING);
            //console.log("And this is the color of the particle:" + this.particleBirthColor);




            //this does not work:
            //var black = [0,0,0,255];
            //if(colorOfTheLand === black){
            //  console.log("Background is black");
            //}

            //print("This is the background color" + colorOfTheLand);

            //Now this works way better................
            //Particles no longer jitter around the generator...
            //the problem is that it is totally misinterpreting
            //whether it is in its own cell or not......
            //at some pixels distance from its generator, it already
            //jerks back towards home.......

            //not very functional if(), but kind of functional anyways:
            /*
            if (this.particleBirthColor == colorOfTheLand ||
                  (this.positionVector.x == this.originX ||
                    (this.positionVector.x > this.originX-10 &&
                      this.positionVector.x < this.originX+10) ||
                      this.positionVector.y == this.originY ||
                      (this.positionVector.y > this.originY-10 &&
                        this.positionVector.y < this.originY+10)
                  )
                )
              */


            //NEXT PROBLEM: The particle gets completely stuck at the border.
            //NOTE: I kind of like this jitter around the border, because
            //it really makes it feel like the particle is struggling against
            //the wall, and trying to seek all along it for an entrypoint
            //It looks like the particle is "trying to cross"
            //BUT: what is not nice is the jittering, it is very
            //disturbing to the eye.

            //HOWEVER: a more elegant type of decision-making might be
            //wort considering for this situation
            //HOW TO: once they reach the border, either change paths completely
            //and navigate around the rest of their cell, ie. follow along
            //the border without "trying to cross"
            //OR slow down a lot in their movement for x amount of time.

            //Finally: comparing two strings means that the particle
            //actually knows whether it is in its homeland or not!
            if (particleBirthColorSTRING == colorOfTheLandSTRING ){
                  //console.log("I am in my homeland!");
                  this.gravityOfHome = this.originalGravityOfHome;
                  return true;

            } else if (this.positionVector.equals(this.originVector)) {
                  console.log("I am at my birth spot!");
                  this.gravityOfHome = this.originalGravityOfHome;
                  return true;

            } else {
              //console.log("I am not at home");
              return false
            } //close else

      } //close amIHome()


}//close particle()
