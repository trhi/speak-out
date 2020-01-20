//this is the drawing border around the world
var drawingBorderX = 0;
var drawingBorderY = 0;

//it looks absolutely wonderful when it spans a really huge width and
//you need to scroll around to see it all!
//BUT with so much canvas and so many sites, processing it all gets really slow
var canvasX = 1200;
var canvasY = 600;

var numSites = 6;
var randomSites = [];
var theWorld;
var particles = [];
var attractors = [];
var attractorQualities = [];

function setup() {

        createCanvas(canvasX, canvasY);
        noSmooth();
        frameRate(30);

        //and the qualitites of the attractors which exist in this world
        attractorQualities = ["nothing", "work", "love", "study", "culture", "freedom", "peace", "exploration"];

        //
        //
        //
        //
        //
        //
        //INITIALISE VORONOI WORLD::::

        //create randomSites for the voronoi diagram
        createRandomSites();

        //Settings for drawing(these are the default values)
        //Set Cell Stroke Weight
        voronoiCellStrokeWeight(1);
        //Set Site Stroke Weight
        voronoiSiteStrokeWeight(0);
        //Set Cell Stroke
        voronoiCellStroke(0);
        //Set Site Stroke
        voronoiSiteStroke(0);
        //Set flag to draw Site
        //voronoiSiteFlag(true);

        //Maximum distance between jitters
        voronoiJitterStepMax(20);
        //Minimum distance between jitters
        voronoiJitterStepMin(5);
        //Scales each jitter
        voronoiJitterFactor(3);
        //Jitter edges of diagram
        voronoiJitterBorder(false);

        //after running createRandomSites();
        //set the voronoiSites
        voronoiSites(randomSites);

        //Compute voronoi diagram with size 500 by 300
        //Without a prepared jitter structure (false)
        voronoi(canvasX - drawingBorderX, canvasY - drawingBorderY, false);

        //Draw diagram in coordinates 0, 0,
        //filled (true), without jitter (false)
        voronoiDraw(drawingBorderX, drawingBorderY, true, false);
        //voronoiDraw(0, 0, true, false);

        //we saved the voronoiDiag
        theWorld = voronoiGetDiagram();

        //printing the voronoi diagram generated(full detailed diagram):
        console.log("This is the world: ");
        console.log(theWorld);
        console.log("This is the number of cells I have:" + theWorld.cells.length);

        //Get simplified cells without jitter, for more advanced use
        var normal = voronoiGetCells();
        //console.log(normal);

        //
        //
        //
        //
        //
        //
        // VORONOI WORLD INITIALISED


}


function draw() {

        //removes trace of former particles
        clear();

        //Draw diagram in coordinates 0, 0
        //Filled and without jitter
        voronoiDraw(drawingBorderX, drawingBorderY, true, false);
        textSize(20);
        text(frameCount, 20, 30);

        if (frameCount % 200 == 0) {
          //spawnNewAttractor();
          //console.log("There is a new attractor in the attractors array, with the quality: " + attractors[0].quality);
          //console.log(attractors[0].quality);
        }

        for (i = 0; i < attractors.length; i++) {
          //displays all attractors in the world
          attractors[i].display();
        } //close for loop

        //once 50 particles have been created, we start zoning them towards attractors..
        /*
        if(particles.length > 7){
          particles[0].diameter = 15;
          particles[0].goTowardsAttractor[0];
          /*
           for(i=0; i<particles.length; i++){
             if(i%2==0){
                  particles[i].diameter = 15;
                  particles[i].goTowardsAttractor[0];
                  console.log("Going towards attractor 0!");
              }
             if(i%3==0){
                particles[i].diameter = 15;
                particles[i].goTowardsAttractor[1];
                console.log("Going towards attractor 1!");
              }*/
        //}//close if(particles.length >7)


        for (i = 0; i < particles.length; i++) {
          //also try to create a new method for how the particles move...
          //so that it looks better... possibly using perlian noise
          particles[i].move();
          particles[i].display();
        } //close for loop


        //new method: spawnNewParticle - for testing purposes originally
        /*
        if (frameCount == 20){
              spawnNewParticle();
        }
        */


        //spawnNewParticles method
        //here, we set the frequency at which particles are spawned
        //at 30 frames per second, %120 frames means there is a chance
        //of new particles spawning every four seconds:
        if (frameCount%10 == 0) {
          spawnNewParticles();
        } //close if framecount


} //close function draw


//moved particle to particle.js
//moved attractor to attractor.js

//only spawns one particle, for testing purposes only:
function spawnNewParticle(){
        var newParticle = new particle(theWorld.cells[3].site.x, theWorld.cells[3].site.y);
        var randomPointID = voronoiGetSite(theWorld.cells[3].site.x, theWorld.cells[3].site.y, false);
        particles.push(newParticle);

}

function createRandomSites() {
      for (i = 0; i < numSites; i++) {
        //note! I can also round the random number generated
        //between 0 and 255 before passing it to voronoi...!
        //and also: passing the color as RGBA to voronoi
        //so that the color is comparable later with what get() returns
        //when we compare the background color to the particle birth color
        randomSites.push([random(drawingBorderX, canvasX),
          random(drawingBorderY, canvasY),
          [round(random(0, 255)), round(random(0, 255)), round(random(0, 255)), 255]]);
        print(randomSites);
      } //close for
} //close createRandomSites


function spawnNewAttractor() {

        var attractorX = random(0, width);
        var attractorY = random(0, height);
        var quality = random(attractorQualities);
        //sets a random lifespan
        var lifespan = random(600,1000);

        attractors.push(new attractor(quality, attractorX, attractorY, lifespan));

}

//IMPLEMENT: ARRAY OF 10.000 RANDOM POINTS PER VORONOI CELL,
//SPAWN NEW PARTICLE (POP FROM ARRAY)

function spawnNewParticles() {

    //makeover for spawnNewParticles() to make particle distribution more random
    //Due to particles no longer jittering around their generators, we can just
    //spawn them around their voronoi site..

    //first: at every x:th framecount, decide how many particles will be spawned:
    //        now, it is choosing between zero and the number of cells that exist
    //        in the voronoi...
    //       var newParticles = round(random(0, theWorld.cells.length));
    //
    //second: after choosing number of particles to spawn, choose randomly which
    //       sites they will be spawned at:
    //       for every particle to be spawned, decide which voronoi it will be
    //       generated at:
    //       for( i=0 ; i < newParticles ; i++){
    //            //chooses one of the voronoi cells:
    //            var newHome = round(random(0, theWorld.cells.length-1));
    //            var newParticle = new particle(theWorld.cells[newHome].site.x, theWorld.cells[newHome].site.y);
    //            particles.push(newParticle);
    //        }

    //        now, it is choosing between zero and the number of cells that exist
    //        in the voronoi.. eg. between 0 and 6.
    var numberOfNewParticles = random([0,0,0,0,0,1,2]);

    //for each of the particles to be born, assigns random cell to be born into:
    for( i = 0 ; i < numberOfNewParticles ; i++){
          //chooses one of the voronoi cells:
          var newHome = round(random(0, theWorld.cells.length-1));
          var newParticle = new particle(theWorld.cells[newHome].site.x, theWorld.cells[newHome].site.y);
          particles.push(newParticle);
    }


/*
      for (i = 0; i < voronoiGetCells().length; i++) {
            var birthX;
            var birthY;
            var newParticle;

            //for creating new particles at the voronoi sites:
            newParticle = new particle(theWorld.cells[i].site.x, theWorld.cells[i].site.y);
            var randomPointID = voronoiGetSite(theWorld.cells[i].site.x, theWorld.cells[i].site.y, false);

            //this if() structure tries to spawn particles relatively equally
            //between the existing voronoisites..
            if ((randomPointID == 0 && frameCount % 100 == 0) ||
                  (randomPointID == 1 && frameCount % 300 == 0) ||
                  (randomPointID % 2 == 0 && frameCount % 500 == 0) ||
                  (randomPointID % 3 == 0 && frameCount % 200 == 0) ||
                  (randomPointID == 5 && frameCount % 170 == 0)
               ) {
              particles.push(newParticle);

            }//close if()

      } //close for()
*/


} //close spawnNewParticles()
