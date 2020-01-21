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
var attractorQualities = ["nothing", "work", "love", "study", "culture", "freedom", "peace", "exploration"];

var particleAttractorIndex = {};

function setup() {

        createCanvas(canvasX, canvasY);
        noSmooth();
        frameRate(30);

        console.log("These are the attractors that exist in the world:" + attractorQualities);

        /*
        *
        *   Initialise world based on voronoi
        *
        */

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

        //save the voronoiDiagram as theWorld
        theWorld = voronoiGetDiagram();

        //printing the voronoi diagram generated(full detailed diagram):
        console.log("This is the world: " + theWorld);
        console.log("This is the number of cells I have:" + theWorld.cells.length);

        //Get simplified cells without jitter, for more advanced use
        var normal = voronoiGetCells();
        //console.log(normal);

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
          spawnNewAttractor();
          //console.log("There is a new attractor in the attractors array, with the quality: " + attractors[0].quality);
          //console.log(attractors[0].quality);
        }

        /*
        *
        *   Display all attractors.
        *
        */

        for (i = 0; i < attractors.length; i++) {
          //displays all attractors in the world
          attractors[i].display();
        } //close for

        /*
        *
        *   Display all particles.
        *
        */

        for (i = 0; i < particles.length; i++) {
          particles[i].move();
          particles[i].display();
        } //close for


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

/*
*
*   Spawn x particles.
*
*/

function spawnNewParticles() {

    //choose how many particles to spawn this time around:
    //currently manually weighted at zero particles:
    var numberOfNewParticles = random([0,0,0,0,0,1,2]);

    //for each of the particles to be born, assigns random cell to be born into:
    for( i = 0 ; i < numberOfNewParticles ; i++){
          //chooses one of the voronoi cells:
          var newHome = round(random(0, theWorld.cells.length-1));
          spawnNewParticle(newHome);
    }

} //close spawnNewParticles()

/*
*
*   Spawn one particle.
*
*/

function spawnNewParticle(newHome){
        var newParticle = new particle(theWorld.cells[newHome].site.x, theWorld.cells[newHome].site.y);
        particles.push(newParticle);
} //close spawnNewParticle

/*
*
*   Create random sites for voronoi diagram.
*
*/

function createRandomSites() {
      for (i = 0; i < numSites; i++) {
        randomSites.push([random(drawingBorderX, canvasX),
          random(drawingBorderY, canvasY),
          [round(random(0, 255)), round(random(0, 255)), round(random(0, 255)), 255]]);
        print(randomSites);
      } //close for
} //close createRandomSites

/*
*
*   Spawn one attractor.
*
*/

function spawnNewAttractor() {

        var attractorX = random(0, width);
        var attractorY = random(0, height);
        var quality = random(attractorQualities);
        //sets a random lifespan
        var lifespan = random(600,1000);

        attractors.push(new attractor(quality, attractorX, attractorY, lifespan));

} //close spawnNewAttractor
