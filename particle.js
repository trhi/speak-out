/*
*
*     TODO:      this.goTowardsAttractor
*
*/


var particleDiameter = 10;

/*
*
*   Describe internal life of a particle
*
*/

function particle(tempX, tempY) {

      /*
      *
      *   Initialise all random variables related to particle.
      *
      */

      this.lifespan = random(100,2000);
      this.counter = 0;
      //console.log("this.counter is:" + this.counter);

      //particleDiameter = 10;
      this.diameter = particleDiameter;

      //choose random attractorQuality to be attracted towards:
      this.isAttractedTo = random(attractorQualities);
      //console.log("This particle is attracted to: " + this.isAttractedTo);

      //set random number for how much the particle is attracted to the attractor
      this.gravityOfAttractor = random(4, 10);
      //console.log("Gravity of attractor is: " + this.gravityOfAttractor);

      //setting random factor for how attracted the particle is to its home
      this.gravityOfHome = random(2, 3);
      //initiate a variable that stores its initial gravityOfHome,
      //to revert back to everytime the particle enters its homeland again.
      this.originalGravityOfHome = this.gravityOfHome;
      //console.log("Gravity of Home is: " + this.gravityOfHome);

      //used to be: 3 * random(1, 10);
      //lets see what happens to the particles' movement when it is set to
      //lower values.. ie. between 1 and 10.
      //set random "factor" which influences the particles speed:
      this.factor = random(1, 10);
      //console.log("My factor is: " + this.factor);

      //This is to initialise the xoff-variable for each particle to start at position 0
      //in the perlin noise table of "random" nubers
      this.xoff = random(0, 10000);
      //console.log("This.xoff is: " + this.xoff);
      this.yoff = random(0, 10000);
      //console.log("This.yoff is: " + this.yoff);

      /*
      *
      *   This is to set the birth color and create a string.
      *
      */

      var cellId = voronoiGetSite(tempX, tempY, false);
      this.cellId = cellId;
      var particleBirthColor = voronoiGetColor(this.cellId);

      this.particleBirthColor = particleBirthColor;
      //console.log("Particle birth color is:" + particleBirthColor);

      var particleBirthColorSTRING = this.particleBirthColor.toString();
      this.particleBirthColorSTRING = particleBirthColorSTRING;
      //console.log("This is the particle birth color as a string:" + particleBirthColorSTRING);

      //console.log("Particle birth color is now:" + this.particleBirthColor);
      this.color = this.particleBirthColor;

      /*
      *
      *   Initialise all vectors related to particle:
      *
      */

      //saves coordinates of particles' origin
      //deleted this.originX, this.originY.
      //we just need this.birthSpot/this.home, because we can access .x and .y through it:
      //we save two: this.birthSpot and this.home
      //they are fundamentally different in the course of a particles' lifetime:
      //this.birthSpot will forever be the particles' birthspot, no question about it
      //HOWEVER, over the course of its lifetime, this.home can change, as the
      //particle moves(migrates) and passes its framecounts(life) at an attractor.
      this.birthSpot = createVector(tempX, tempY);
      this.home = this.birthSpot;
      //console.log("this.birthSpot is:" + this.birthSpot);
      //console.log("this.home is:" + this.home);

      //set the x,y coordinates of the particle. These are altered everytime the .move() -method is called.
      this.positionVector = createVector(tempX, tempY);
      //print("positionVector is:" + this.positionVector);

      //initialises vector that pulls towards the attractor
      this.towardsAttractor = createVector();

      //initialises the towardsHome vector:
      this.towardsHome = createVector();

      /*
      *
      *   Determine how the particle is visualised.
      *
      */

      this.display = function() {
        fill(this.color);

        //as particle is born, it gradually grows into its full size
        if(this.counter < 10){
          this.diameter = this.counter;
        } else {
          this.diameter = particleDiameter;
        }

        //as particle is dying, it gradually fades out:
        //starting at lifespan = 300, we fade them out:
        //if(this.lifespan < 100){
        //  this.diameter += 1;
        //}

        ellipse(this.positionVector.x, this.positionVector.y, this.diameter, this.diameter);
        this.lifespan -= 0.1;
        this.counter += 0.1;

        //now they just pop out of the world:
        if(this.lifespan <= 0){
           this.remove();
        }



      };

      /*
      *
      *   Determine how the particles move.
      *
      */

      this.move = function() {

            //if the particle is not at home, we make it move towards home
            //before we add the movement determined by perlin noise:
            if (!this.amIHome()) {

                  this.goTowardsHome();

            }//close if (!this.amIHome()


            //In the perlin noise version, we will simply iterate through the perlin noice
            //table of numbers by incrementing the xoff and yoff variables for each particle.
            let randomXNoise = noise(this.xoff)
            this.xoff += 0.02;

            let randomYNoise = noise(this.yoff)
            this.yoff += 0.01;

            //we are adding a random speed factor based on perlin noise:
            let randomXSpeedFactor = map(randomXNoise, 0, 1, -7, 7);
            let randomYSpeedFactor = map(randomYNoise, 0, 1, -7, 7);

            this.positionVector.add(randomXSpeedFactor, randomYSpeedFactor);

            //so that the particles do not go off the visible canvas
            this.positionVector.x = constrain(this.positionVector.x, drawingBorderX, width)
            this.positionVector.y = constrain(this.positionVector.y, drawingBorderY, height)

            //for flipping particles to the other side:
            //does not really work, particles start zooming all over the world..
            //this.amIOnTheEdge();

      } // close this.move()


      this.goTowardsHome = function(){

        console.log("Going towards home!");

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
        //console.log("Increasing gravity of home!");

        //An attractor will take over the this.home as well as
        //this.gravityOfHome in order to propel the particle
        //towards itself:
        this.towardsHome = p5.Vector.sub(this.home, this.positionVector);
        this.towardsHome.normalize();

        this.towardsHome.mult(this.gravityOfHome);
        //print("This is the towarards home vector:" + this.towardsHome);
        //print("This is the home vector:" + this.home);
        this.positionVector.add(this.towardsHome);

      } // close this.goTowardsHome


      /*
      *
      *   Move particle towards attractor.
      *
      */

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


      } //close this.goTowardsAttractor


      /*
      *
      *   Flip particles over edges of canvas.
      *
      */

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

      /*
      *
      *   Check whether particle is at home.
      *
      */

      this.amIHome = function() {

            //get the color of the current pixel that the particle is in:
            var colorOfTheLand = get(this.positionVector.x, this.positionVector.y);
            var colorOfTheLandSTRING = colorOfTheLand.toString();
            //console.log("This is the color of the land:" + colorOfTheLand);
            //console.log("This is the color of the land as a string:" + colorOfTheLandSTRING);
            //console.log("And this is the color of the particle:" + this.particleBirthColor);


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

            //Need to change RGBA to type string in order to compare them
            //reliably...
            if (this.particleBirthColorSTRING == colorOfTheLandSTRING ){
                  //console.log("I am in my homeland!");
                  this.gravityOfHome = this.originalGravityOfHome;
                  return true;

            } else if (this.positionVector.equals(this.birthSpot)) {
                  //console.log("I am at my birth spot!");
                  this.gravityOfHome = this.originalGravityOfHome;
                  return true;

            } else {
              //console.log("I am not at home");
              return false
            } //close else

      } //close amIHome()

      /*
      *
      *   Remove particle from particles [].
      *
      */

      this.remove = function(){
        var myIndex = particles.indexOf(this);
        //console.log(myIndex);
        particles.splice(myIndex,1);
        console.log("Removed me! At index:" + myIndex);
        //console.log("Particles array now looks like this:");
        //console.log(attractors);

      }//close this.remove

      /*
      *
      *   Flickers particle out before removing.
      *
      */

      this.flickerOut = function(){

        if(this.lifespan <= 10){
          this.color = [255, 255, 255, 255];
          this.particleBirthColorSTRING = this.color.toString();
        }

        if(this.lifespan <= 6){
          this.color = [0, 0, 0, 255];
        }

        if(this.lifespan <= 4){
          this.color = [255, 255, 255, 255];
        }

        if(this.lifespan <= 3.5){
          this.color = [0, 0, 0, 255];
        }

        if(this.lifespan <= 3){
          this.color = [255, 255, 255, 255];
        }

        if(this.lifespan <= 2.5){
          this.color = [255, 255, 255, 255];
        }

        if(this.lifespan <= 2){
          this.color = [0, 0, 0, 255];
        }

        if(this.lifespan <= 1.5){
          this.color = [255, 255, 255, 255];
        }

        if(this.lifespan <= 1){
          this.color = [0, 0, 0, 255];
        }

        if(this.lifespan <= 0.5){
          this.color = [255, 255, 255, 255];
        }

        if(this.lifespan <= 0){
           this.remove();
        }//endif


      }//close this.flickerOut

}//close particle()
