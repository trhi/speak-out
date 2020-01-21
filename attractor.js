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

        /*
        *
        *   Display attractor
        *
        */

        this.display = function() {
              //choose the fill color or image or logo based on
              //the quality of the attractor?
              fill("white");
              ellipse(this.attractorPosition.x, this.attractorPosition.y, 20, 20);
              this.lifespan -= 1;
              //console.log("My lifespan is now: " + this.lifespan);
              if(this.lifespan <= 0){
                 this.remove();
              }//endif
        }//close this.display

        /*
        *
        *   Remove attractor from attractors [].
        *
        */

        this.remove = function(){
              var myIndex = attractors.indexOf(this);
              console.log(myIndex);
              attractors.splice(myIndex,1);
              console.log("Removed me! At index:" + myIndex);
              console.log("Attractors array now looks like this:");
              console.log(attractors);

        }//close this.remove

}//close attractor
