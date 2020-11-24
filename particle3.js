var particleDiameter = 15;

function particle(tempX, tempY) {

        this.lifespan = random(100,2000);
        this.counter = 0;

        this.diameter = particleDiameter;
        this.infoText = "";
        this.selected = false;

        this.cellID = voronoiGetSite(tempX, tempY, false);
        this.particleBirthColor = voronoiGetColor(this.cellID);
        this.g = this.particleBirthColor[1];
        //this.color = this.particleBirthColor;
        this.currentCellID = this.cellID; //later: this is changed to the ID of the cell I am in.
        this.currentG = this.g;
        this.passports = [];

        this.isAttractedTo = random(attractorQualities);
        this.gravityOfAttractor = random(4, 10);
        this.myDestiny = "undefined";

        this.gravityOfHome = random(2, 3);
        this.originalGravityOfHome = this.gravityOfHome;

        this.factor = random(1, 10);
        this.xoff = random(0, 10000);
        this.yoff = random(0, 10000);

        this.birthSpot = createVector(tempX, tempY);
        this.home = createVector(tempX, tempY);
        this.positionVector = createVector(tempX, tempY);
        this.userDirectionVector = createVector(0, 0);
        this.towardsAttractor = createVector();
        this.towardsAllowedCell = createVector(); //!!! used to be called this.towardsHome

        //in fact, it would be a good idea to link the cellID at this point also,
        //since they do not change
        //eg. a second array
        //put the same element twice here.........
        //hopefully this will not cause problems in the future!
        this.passports[0] = [this.cellID, this.cellID];
        //this.passports[0][0] = this.cellID;
        for(var i=0;i<analogous.length;i++){
                if(this.cellID == analogous[i][0]){
                    this.passports[1] = analogous[i];
                    //console.log("Putting analogous in passport.");
                }
        }
        //need to convert to an array of cellIDs for these as well:
        for(var i=0;i<complementary.length;i++){
                if(this.cellID == complementary[i][0]){
                    this.passports[2] = complementary[i];
                    //console.log("Putting complementary in passport.");

                }
        }
        for(var i=0;i<triad.length;i++){
                if(this.cellID == triad[i][0]){
                    this.passports[3] = triad[i];
                    //console.log("Putting triad in passport.");
                }
        }
        this.passports.push([]);
        for(var i=0;i<theWorldSites.length;i++){
                    //build an array with all the cellIDs:

                    this.passports[4].push(i);
        }
        console.log("This is the access all areas passport:" + this.passports[4]);
        this.passports.push([]);
        for(var i=0;i<theWorldSites.length;i++){
                //build the same array as before BUT
                //splice one element == this.cellID
                //build an array with all the cellIDs except my own!
                this.passports[5].push(i);
        }
        this.passports[5].splice(this.cellID, 1);

        console.log("This is my passport collection:");
        console.log(this.passports);

        this.remove = function(){
              var myIndex = particles.indexOf(this);
              particles.splice(myIndex,1);
        }//close this.remove

        this.giveInformation = function () {
              textSize(particleDiameter);
              noStroke();
              smooth();
              fill("black");
              if(this.infoText == ""){
                    this.infoText = this.isAttractedTo;
              }
              text(this.infoText, this.positionVector.x + 1.0*particleDiameter, this.positionVector.y + 0.5*particleDiameter);
        }

        this.display = function() {
              //if particle has been selected, thick white stroke:
              //remove this functionality:
              if(this.selected){
                    strokeWeight(3);
              } else {
                    strokeWeight(1);
              }

              if(this.counter < particleDiameter){
                    this.diameter = this.counter;
              } else {
                    this.diameter = particleDiameter;
              }

              var cursorPosition = createVector(mouseX, mouseY);
              var particleCursorDistance = p5.Vector.dist(this.positionVector, cursorPosition);
              if(particleCursorDistance < particleDiameter){
                    cursor(HAND);
                    if(this.infoText == "You"){
                      //do nothing, because its already displaying information
                          }else{
                              this.giveInformation();
                          }
                          //this.giveInformation();
                    // EITHER) stop the particle when you mouse over it:
                    this.positionVector = cursorPosition;
                    // OR) select it == easier to follow it on the screen
                    /*if(this.selected == true){
                      this.selected = false;
                    } else {
                      this.selected = true;
                    }*/
              } else {
                //cursor arrow
              }

              //actually draw the particle:
              fill(this.particleBirthColor);
              strokeWeight(2);
              stroke("white");
              ellipse(this.positionVector.x, this.positionVector.y, this.diameter, this.diameter);

              //and finally, decrese its lifetime:
              this.lifespan -= 0.1;
              this.counter += 0.1;

              if(this.lifespan <= 0){
                    this.remove();
              }
        }//close this.display

        this.move = function() {

              this.currentCellID = voronoiGetSite(this.positionVector.x, this.positionVector.y);
              //this.currentG = voronoiGetColor(this.currentCellID)[1];
              //PROBLEM: when particle goes off the edges: it doesnt have a cellID!
              //SOLUTION: limit movement to canvasX- some pixels..
              //probably will not need these:
              //var currentCellColor = voronoiGetColor(this.currentCellID);
              //this.currentG = currentCellColor[1];
              //are no longer using color at this point,
              //only when initialising the world in particles-moving
              //console.log("The G of my current cell is " + this.currentG);

              if(this.amIAllowedToBeHere()){
                    //yes:
                    if(this.doIFeelThePullOfAnAttractor()){
                          //yes:
                          //go towards the attractor,
                          //this.goTowardsAttractor();
                          //then, move randomly
                          //this.moveRandomly();
                    }else{
                          //no:
                          //then, move randomly
                          //this.infoText = "";
                          this.moveRandomly();
                    }

              }else{
                    //this.infoText = "NOT ALLOWED TO BE HERE!";
                    //this.moveRandomly();
                //no:
                //go towards the closest site that you are allowed to be at,
                this.goTowardsClosestAllowedZone(); //take sites of all allowed
                this.moveRandomly();
                //then, move randomly
                //this.moveRandomly();
              }

        }//close this.move

        this.amIAllowedToBeHere = function(){
              if(this.positionVector.x <= 0 || this.positionVector.y <= 0){
                this.goTowardsClosestAllowedZone;

              /*if(this.cellID == this.currentCellID){//always allowed to be in your birth cell...
                //might change this so that there is a mode in which you are
                //not allowed to be in your home cell:
                console.log("I am home");
                return true;*/
              } else if (passportMode == 0){//monochromatic
                  if(this.currentCellID == this.passports[0][0]){
                          console.log("I am in my home cell");
                          this.gravityOfHome = this.originalGravityOfHome;
                          return true;
                  }

                //universal code to check if I am allowed to be here:
              //} for(var i=0; i<this.passports[passportMode];i++){
              //            if(this.currentCellID == this.passports[passportMode][i]){
                                //    console.log("I am allowed to be here");
                                    //return true;
          //  }
            //}


              } else if (passportMode == 1){//analogous
                //console.log("Passport mode is analogous");
                  for(var i=0;i<this.passports[1].length;i++){
                          if(this.currentCellID == this.passports[1][i]){
                              //console.log(this.currentCellID + " I am not in my home cell, BUT I am in an analogous colored cell");
                              this.gravityOfHome = this.originalGravityOfHome;
                              return true;
                          }
                  }
              } else if (passportMode == 2){//analogous
                //console.log("Passport mode is complementary");
                  for(var i=0;i<this.passports[2].length;i++){
                          if(this.currentCellID == this.passports[2][i]){
                              //console.log("I am not in my home cell, BUT I am in a complementary colored cell");
                              this.gravityOfHome = this.originalGravityOfHome;
                              return true;
                          }
                  }
              } else if (passportMode == 3){//analogous
                //console.log("Passport mode is triad");
                  for(var i=0;i<this.passports[3].length;i++){
                          if(this.currentCellID == this.passports[3][i]){
                              //console.log("I am not in my home cell, BUT I am in one of my triad color cells");
                              this.gravityOfHome = this.originalGravityOfHome;
                              return true;
                          }
                  }
              } else if (passportMode == 4) {//all
                //IMPLEMENT: a record in passports[4] that represents this:
                //an array of all the cellIDs
                //console.log("Passport mode is all!");
                    for(var i=0;i<this.passports[4].length;i++){
                            if(this.currentCellID == this.passports[4][i]){
                                //console.log("I am not in my home cell, BUT I am in one of my triad color cells");
                                this.gravityOfHome = this.originalGravityOfHome;
                                return true;
                            }
                    }
                    //this.gravityOfHome = this.originalGravityOfHome;
                    //return true;
              } else if (passportMode == 5) {//all but my own
                //console.log("Passport mode is all but my own!");
                //IMPLEMENT: a record in passports[5] that represents this:
                //an array of all the cellIDs
                      for(var i=0;i<this.passports[5].length;i++){
                              if(this.currentCellID == this.passports[5][i]){
                                  //console.log("I am not in my home cell, BUT I am in one of my triad color cells");
                                  this.gravityOfHome = this.originalGravityOfHome;
                                  return true;
                              }
                      }
                    /*if(this.currentCellID != this.cellID){
                          this.gravityOfHome = this.originalGravityOfHome;
                          return true;
                    }*/
              } else {

                  return false;
              }
        }//close amIAllowedToBeHere

        //inside this function: is there a repulsor in one of my allowed cells?
        this.doIFeelThePullOfAnAttractor = function(){
              return false;
        }

        this.goTowardsAttractor = function(){

        }

        this.goTowardsClosestAllowedZone = function(){
          var distancesToAllowedZones = [];
          //loop through all the cellIDS and
          //make an array of distances between my current position and
          //the site of the allowed cells:
          for(var i=0; i<this.passports[passportMode].length; i++){
                //here, I will have the site of a cell
                var distanceToSite;
                //THIS FAILS!!! Because there is nothing at passports[0][0],
                //because the first slot in this array only has one item...
                distanceToSite = this.positionVector.dist(theWorldSites[this.passports[passportMode][i]]);
                distancesToAllowedZones.push(distanceToSite);
          }
          //console.log("These are the distances to my allowed zones");
          //console.log(distancesToAllowedZones);

          var indexOfSmallest = 0;
          var smallest = distancesToAllowedZones[0];
          for(var j=0; j<distancesToAllowedZones.length; j++){
                if(distancesToAllowedZones[j] < smallest){
                    smallest = distancesToAllowedZones[j];
                    indexOfSmallest = j;
                }
          }

          //console.log("index of smallest is:" + indexOfSmallest);
          var closestAllowedCellID = this.passports[passportMode][indexOfSmallest];
          //var closestAllowedCellSite = voronoiGetSite(closestAllowedCellID);
          var closestAllowedCellSite = theWorldSites[closestAllowedCellID]; //this is already an array of p5.vectors..
          //console.log("The CellID of the closest allowed cell is: " + closestAllowedCellID);
          //console.log("The site of the closest allowed cell is: " + closestAllowedCellSite);

          var towardsAllowed = createVector();
          towardsAllowed = p5.Vector.sub(closestAllowedCellSite, this.positionVector);
          //console.log("This is the vector towards the allowed cell: " + towardsAllowed);
          towardsAllowed.normalize();
          this.gravityOfHome += 0.05;
          towardsAllowed.mult(this.gravityOfHome);
          this.positionVector.add(towardsAllowed);

          this.moveRandomly();
        }//close goTowardsClosestAllowedZone

        this.moveRandomly = function(){
              let randomXNoise = noise(this.xoff);
              this.xoff += 0.02;
              let randomYNoise = noise(this.yoff);
              this.yoff += 0.01;

              //generate random number based on perlin noise:
              let randomXSpeedFactor = map(randomXNoise, 0, 1, -7, 7);
              let randomYSpeedFactor = map(randomYNoise, 0, 1, -7, 7);

              //unnecessary:
              //this.lastMovementVector.x = (randomXSpeedFactor);
              //this.lastMovementVector.y = (randomYSpeedFactor);

              //add random number to the position vector:
              this.positionVector.add(randomXSpeedFactor, randomYSpeedFactor);

              //if the user hasnt pressed the keys:
              if(this.userDirectionVector == (0,0)){
                    //do nothing
              }else{
                    //else, move the particle, diminsh the effect of
                    //the users movement:
                    this.positionVector.add(this.userDirectionVector);
                    //diminish the effect of the users input over time:
                    //0.99 seems to be a good factor:
                    this.userDirectionVector.mult(0.99);
                    //limit to magnitude 6 seems to be a good value:
                    //this keeps the particle from bouncing back
                    //too much from the border of a wrong cell..
                    this.userDirectionVector.limit(6);
              }
              //finally, don't let the particles go off the canvas:
              this.positionVector.x = constrain(this.positionVector.x, drawingBorderX+2, canvasX-2)
              this.positionVector.y = constrain(this.positionVector.y, drawingBorderY+2, canvasY-2)
        }//close this.move



}//close function particle()
