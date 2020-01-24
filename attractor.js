/*
*
*   Describe internal life of an attractor
*
*/

function attractor(quality, attractorX, attractorY, lifespan) {

        this.quality = quality;
        this.attractorPosition = new p5.Vector(attractorX, attractorY);
        this.lifespan = lifespan;
        this.gravityOfAttractor = random(30,100);
        //console.log("My gravity is: " + this.gravityOfAttractor)
        //console.log("My lifespan is:" + this.lifespan);

        //corresponds to the cellID of the cell in which the attractor is
        this.existsIn = voronoiGetSite(this.attractorPosition.x, this.attractorPosition.y, false);
        console.log("A new attractor was created. This attractor is for: " + this.quality +
          " , and exists in cell: " + this.existsIn);

        this.attractParticles = function() {

            //console.log("Attracting particles");
            //console.log("My position is: " + this.attractorPosition);
            //particles[0].home = this.attractorPosition;
            //console.log("Particle at 0 home is now:" + particles[0].home);
            //particles[0].goTowardsHome;

            //for testing purposes only: set the .home of the first 3 particles
            //and move them towards home:
            for(i=0; i < 4; i++){
                particles[i].home = this.attractorPosition;
                particles[i].goTowardsHome;
            }


        } // close this.attractParticles

        /*
        *
        *   Display attractor
        *
        */

        //YEY! Moved the attractParticles() function to only be executed
        //in the case that the particle is not removed at that draw() cycle
        //NOW IT WORKS: once the attractor is removed, particles go back home:
        //To resolve next: how to get particles to move aroud/on attractor
        //in a more natural way... -> particle.js
        this.display = function() {
              //choose the fill color or image or logo based on
              //the quality of the attractor?
              fill("white");
              ellipse(this.attractorPosition.x, this.attractorPosition.y, 20, 20);
              this.lifespan -= 1;
              //console.log("My lifespan is now: " + this.lifespan);
              if(this.lifespan <= 0){
                console.log("Framecount = " + frameCount);
                 this.remove();
              } else {
                  this.attractParticles();
              }
        }//close this.display

        /*
        *
        *   Remove attractor from attractors [].
        *
        */

        this.remove = function(){

              var myIndex = attractors.indexOf(this);
              console.log("My index is:" + myIndex);
              attractors.splice(myIndex,1);
              console.log("Removed me! At index:" + myIndex);
              console.log("Attractors array now looks like this:" + attractors);
              console.log("attractor at i is:" + attractors[i]);
              console.log("length of attractors is: " + attractors.length);


              //for testing purposes only: reset the .home of the first 3 particles
              for(i=0; i < 4; i++){
                  particles[i].home = particles[i].birthSpot;
                  console.log("My home was changed");
              }

        }//close this.remove

}//close attractor
