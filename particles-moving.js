var particleDiameter;

var drawingBorderX = 0;
var drawingBorderY = 0;

var canvasX = 800;
var canvasY = 500;

var numSites = 9;
var randomSites = [];
var theWorld;
var particles = [];
var attractors = [];
var attractorQualities = [];

function setup() {

  createCanvas(canvasX, canvasY);
  noSmooth();
  frameRate(30);

  //initialising particle diameter to 10px
  //and the qualitites of the attractors which exist in this world
  particleDiameter = 10;
  attractorQualities = ["nothing", "work", "love", "study", "culture", "freedom", "peace", "exploration"];

  createRandomSites();

  //create a new object: world
  //this world can be defined in any way we want, but in our case,
  //its going to be a voronoi
  var theWorld = new world();


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
  voronoiSites(randomSites);

  //Add array of custom sites
  //voronoiSites([site1,site2,site3,site4]);

  //Compute voronoi diagram with size 500 by 300
  //Without a prepared jitter structure (false)
  voronoi(canvasX - drawingBorderX, canvasY - drawingBorderY, false);

  //Draw diagram in coordinates 0, 0,
  //filled (true), without jitter (false)
  voronoiDraw(drawingBorderX, drawingBorderY, true, false);
  //voronoiDraw(0, 0, true, false);


  theWorld = voronoiGetDiagram();

  //printing the voronoi diagram generated(full detailed diagram):
  console.log("This is the world: ");
  console.log(theWorld);

  //implementing a for loop which initialises by generating
  //a new particle at each voronoicell site):
  particles = [];

  //this initiates the map with one particle at each generator
  /*
  for (i = 0; i < voronoiGetCells().length; i++) {
    particles.push(new particle(theWorld.cells[i].site.x, theWorld.cells[i].site.y, particleDiameter));
  }
  */

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



  //spawnNewParticles method
  if (frameCount % 10 == 0) {
    spawnNewParticles();
  } //close if framecount

} //close function draw

function spawnNewAttractor() {

  var attractorX = random(0, width);
  var attractorY = random(0, height);
  var quality = random(attractorQualities);
  //sets a random lifespan
  var lifespan = random(600,1000);

  attractors.push(new attractor(quality, attractorX, attractorY, lifespan));

}

//moved attractor to attractor.js

function spawnNewParticles() {
  for (i = 0; i < voronoiGetCells().length; i++) {
    var birthX;
    var birthY;
    var newParticle;
    /*
    //create a new method which will spawn a new particle at any point within the cell
    //so that then particles will "fill the cell" and move all around it. Albeit still
    //gravitate towards the originator once they foray outside of their cell.
    birthX = constrain(canvasX*random(), drawingBorderX, drawingBorderX+canvasX-1);
    birthY = constrain(canvasY*random(), drawingBorderY, drawingBorderY+canvasY-1);
    newParticle = [birthX, birthY, particleDiameter);
    */

    //for creating new particles at the voronoi sites:
    newParticle = new particle(theWorld.cells[i].site.x, theWorld.cells[i].site.y, particleDiameter);
    var randomPointID = voronoiGetSite(theWorld.cells[i].site.x, theWorld.cells[i].site.y, false);


    //this is a functioning particle generating logic
    //this new if() structure has radically reduced the amount of particles spawned
    if ((randomPointID == 0 && frameCount % 100 == 0) ||
        (randomPointID == 1 && frameCount % 300 == 0) ||
        (randomPointID % 2 == 0 && frameCount % 500 == 0) ||
        (randomPointID % 3 == 0 && frameCount % 200 == 0) ||
        (randomPointID == 5 && frameCount % 170 == 0)
       ) {
      //particles.push(new particle(birthX, birthY, particleDiameter));
      particles.push(newParticle);
      console.log("my speed is:" + newParticle.propensityToMove);
    }


    /*
    //this new if() structure has radically reduced the amount of particles spawned
    if (randomPointID == 0 && frameCount % 100 == 0){
      //particles.push(new particle(birthX, birthY, particleDiameter));
      particles.push(newParticle);
      console.log("my speed is:" + newParticle.propensityToMove);
    }
    */



  } //close for
} //close spawnNewParticles()

function createRandomSites() {
  for (i = 0; i < numSites; i++) {
    randomSites.push([random(drawingBorderX, canvasX), random(drawingBorderY, canvasY), [random(0, 255), random(0, 255), random(0, 255)]]);
    print(randomSites);
  } //close for

} //close return random sites

//moved particle to particle.js
