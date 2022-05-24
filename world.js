var drawingBorderX = 0;
var drawingBorderY = 0;

var canvasX = window.innerWidth; // use width instead (system variable)
var canvasY = window.innerHeight; // use height instead (system variable)

var myCanvas;
var cursorPosition;
var rainbow = 0;

var iywstc;

var frameRate = 30;
var fpm = frameRate*60;
//console.log("fpm is: " + fpm);

var lang = ""; // browser language -> sets language of recogniser and all texts
var myFont; // custom font. Atm: poppins. Change also in css/speakout-interface.css

// TO-DO: create unlimited zones using fixed 12 color palette.
//atm: cannot change number of zones because creating the passports is
//hardcoded for 12 colors == 12 zones:
const zones = 12; // currently: maximum value is 12, as there are only 12 colors on the palette
//const zones = 6; // currently: maximum value is 12, as there are only 12 colors on the palette
var randomSites = [];
var theWorld;
var theWorldSites = []; //this is an array of p5.Vectors in order of cellID
var particles = [];
var attractors = [];

// TO-DO: implement repulsors.
// var repulsors = [];
// var repulsorQualititesEN = ["a bad thing"];
// var repulsorQualititesPT = ["uma coisa má"];

var worldAttractions = [];
var attractorQualities = [ //a small list, to keep it simple:
  "work", "food", "love", "more love", "even more love", "freedom", "a way out",
  "a hug", "sleep", "some rest", "deep sleep", "a glass of water", "a timeout",
  "entertainment", "peace of mind", "warmth", "a success", "a coffee",
  "a bite to eat", "a painkiller", "a flower shop", "time"
];

/*
// big list of lots of things
var attractorQualitiesEN =
[
  "a good thing", "yourself", "the impossible", "myself", "my true self",
"work", "work", "work", "work", "work", "work", "work", "work", "work", "work",
"my retirement",
"opportunity", "love", "shelter", "food",
"health",
"money", "lots of money", "some money", "a coin",
"a home", "a house", "a shelter", "a roof over my head", "a piece of land",
"a job", "a clothing store", "a park", "study",
"dignity", "freedom", "to do what I love", "to love what I do", "a place to breathe",
"a way out", "a solution",
"peace", "some peace of mind", "some time for myself", "time", "some time",
"exploration", "a mountain", "a better life",
"a flower shop", "a supermarket", "ikea", "coca cola dreams"
];
*/

var youParticle;
var lifeAchievements = 0;

var passportMode = 4;
//document.getElementById("4").focus();
var numberOfPassports = 7; //shouldn't this be 6?

// TO-DO: poetry.
// each passport mode has 6 lines of poetry, that can be recombined
//this variable is no longer used?
var passportSentences = [];

/*
* passports:
* 0 : just my cell
* 1: analogous
* 2: complementary
* 3: triad
* 4: all cells
* 5: all cells except mine
* ->6: [initial state] I access only my half of the screen
*/

function changePassportMode(){
  passportMode = round(random(0, numberOfPassports-2));
  togglePassports(passportMode);
  //document.getElementById(passportMode).focus();
  //console.log("Changed passportMode to:" + passportMode);
}

// TO-DO: 7th passport mode: "/"

// TO-DO: make it easier to continue adding passport modes
// (ie. make it so that Particle doesn't need to be aware of how many passport modes there are)
// ie. set it here, with numberOfPassports.

var worldColors = []; // index of the RGBA of all cells in order of cellID
var worldGIndex = []; // index of the G value of all cells in order of cellID


//create a deep copy of the passport rules (color mappings)
//so that passports can be built
/*
var analogousColors = JSON.parse(JSON.stringify(analogous));
var complementaryColors = JSON.parse(JSON.stringify(complementary));
var triadColors = JSON.parse(JSON.stringify(triad));
//create them as strings because why?
*/

var analogousColors = JSON.parse(JSON.stringify(texts.palettesAndPassports.analogous));
var complementaryColors = JSON.parse(JSON.stringify(texts.palettesAndPassports.complementary));
var triadColors = JSON.parse(JSON.stringify(texts.palettesAndPassports.triad));

var fontDone = false;

function preload(){
  myFont = loadFont("css/fonts/PoppinsLatin-Medium.otf", fontLoaded);
  iywstc = createAudio('sound/iywstc.mp3');
}

function fontLoaded(){
    fontDone = true;
}

function setup() {

  //console.log("I have access to texts.js, see, texts.en.poems.monochrome.regex is equal to:" + texts.en.poems.monochrome.regex);

  //iywstc.loop = false;
  //getAudioContext().suspend();
  //iywstc.play();

  //document.getElementById("4").focus();

  textFont(myFont);
  lang="en";
  worldAttractions = [...attractorQualities];
  passportSentences = [];
  passportSentences.push(
    texts.en.poems.monochrome.lines,
    texts.en.poems.analogous.lines,
    texts.en.poems.complementary.lines,
    texts.en.poems.triad.lines,
    texts.en.poems.rainbow.lines,
    texts.en.poems.cloud.lines
  );

  myCanvas = createCanvas(canvasX, canvasY);
  frameRate(30);

  doVoronoiSetupStuff();
  doInterface();
  document.getElementById(passportMode).focus();
  doPassports();

  if(fontDone){
      textFont(myFont);
  }


} // close setup()


function doVoronoiSetupStuff(){


  /*
  *
  *   Initialise world based on voronoi
  *
  */

  //Settings for drawing the voronoi diagram:
  voronoiCellStrokeWeight(1); // thin borders
  voronoiSiteStrokeWeight(0); // make site hardly visible

  //TODO: modify this function so that it spews out some random "image":
  createRandomSites(); // create randomSites for the voronoi diagram
  voronoiSites(randomSites); // create the voronoi

  //Compute voronoi according to size of canvas
  //Without jitter (false)
  voronoi(canvasX - drawingBorderX, canvasY - drawingBorderY, false);

  //Draw diagram at coordinates 0, 0 (drawingBorderX, drawingBorderY)
  //filled (true) and without jitter (false)
  voronoiDraw(drawingBorderX, drawingBorderY, true, false);

  //save the voronoiDiagram as "theWorld"
  theWorld = voronoiGetDiagram();


  /*
  *
  *   worldSites, an array of p5.Vectors of all sites, by CellID.
  *
  */

  for(var i=0;i<theWorld.cells.length;i++){
    var site = createVector(theWorld.cells[i].site.x, theWorld.cells[i].site.y);
    theWorldSites.push(site);
  }

}//close doVoronoiSetupStuff()


/*
*
*   Calculate passports.
*   TO-DO: do this in a more elegant manner,
*   considering also possibility of multiple zones with same color.
*   as well as the possibility of less zones with same color!
*   ie. first map: 1) cellID to RGBA
*
*/

function doPassports() {

  /*
  *
  *   worldColors, an array of RGBA values ordered by CellID.
  *
  */

  for(var i=0;i<texts.palettesAndPassports.palette.length;i++){ //this works
  //for(var i=0;i<palette.length;i++){ //this works
  //or just go through theWorld.cells.length //<-- but passports are harcoded for zones = 12 = palette.length
  //for(var i=0;i<theWorld.cells.length;i++){
  //for(var i=0;i<zones;i++){
    worldColors[i] = voronoiGetColor(i);
  }

  /*
  *
  *   worldGIndex, an array of G values ordered by CellID.
  *   (also serves as the monochrome passport)
  *
  */

  //for(var i=0;i<palette.length;i++){
    for(var i=0;i<texts.palettesAndPassports.palette.length;i++){

    for(var i=0;i<zones;i++){

    worldGIndex[i] = worldColors[i][1];
  }
}

    /*
    *
    *   three passports, manually.
    *
    */

  for(var i=0; i<analogousColors.length; i++){
    for(var k=0; k<analogousColors[i].length;k++){
      for(var j=0; j<worldGIndex.length; j++){
        if(analogousColors[i][k] == worldGIndex[j]){
          texts.palettesAndPassports.analogous[i][k] = j; // map g to cellID
          //analogous[i][k] = j; // map g to cellID
        }
      }
    }
  }

  for(var i=0; i<complementaryColors.length; i++){
    for(var k=0; k<complementaryColors[i].length;k++){
      for(var j=0; j<worldGIndex.length; j++){
        if(complementaryColors[i][k] == worldGIndex[j]){
          texts.palettesAndPassports.complementary[i][k] = j; // map g to cellID
          //complementary[i][k] = j; // map g to cellID
        }
      }
    }
  }

  for(var i=0; i<triadColors.length; i++){
    for(var k=0; k<triadColors[i].length;k++){
      for(var j=0; j<worldGIndex.length; j++){
        if(triadColors[i][k] == worldGIndex[j]){
          texts.palettesAndPassports.triad[i][k] = j; // map g to cellID
          //triad[i][k] = j; // map g to cellID
        }
      }
    }
  }

} //close doPassports


/*
*
*   Create attractors by clicking.
*
*/

/*
function mousePressed(){

/*
  for (let i=0; i < particles.length; i++) {
      particles[i].clicked( mouseX, mouseY );
    }
    */

/*
  //zone of passports OR zone of other buttons:
  if((mouseX > window.innerWidth-90 && mouseY < 320) || (mouseX > window.innerWidth-270 && mouseY > window.innerHeight-80)){
    //don't do anything if the user clicks in the zone of the buttons.
  } else {
    //when all movement is allowed, also allow making opportunities anywhere:
    //if(passportMode == 4){
    //when movement is restricted, allow making opportunities:
    //if(passportMode != 4){
      //before spawning new attractor: check if any attractorqualities are left:
      //if yes, spawn new attractor using one of them:
      if(frameCount > 200){ // so that the user cannot be clicking all the time to make attractors:
        if(worldAttractions.length > 0 ){
          //spawnNewAttractor(mouseX, mouseY);
        }
      }
      //then remove it from the array
      //else: do nothing
    //}
  }
  //return false;
}
*/

function draw() {

  //was doing this for each particle individually, although
  //you could be doing this universally at draw()
  cursorPosition = createVector(mouseX, mouseY);

  //a factor of 0.9 seems to be good:
  if(youParticle){
    if (keyIsDown(LEFT_ARROW)){
      youParticle.intentionVector.add(-1.3, 0);
    }
    if (keyIsDown(RIGHT_ARROW)){
      youParticle.intentionVector.add(1.3, 0);
    }
    if (keyIsDown(UP_ARROW)){
      youParticle.intentionVector.add(0, -1.3);
    }
    if (keyIsDown(DOWN_ARROW)){
      youParticle.intentionVector.add(0, 1.3);
    }
  }


  clear(); //remove trace of former particles
  cursor(ARROW);

  //Draw diagram in coordinates 0, 0
  //Filled and without jitter
  voronoiDraw(drawingBorderX, drawingBorderY, true, false);


  //textSize(18);

  //strokeWeight(1);
  //stroke("white");

  if(frameCount%5 == 0){
    rainbow++;
    if(rainbow == texts.palettesAndPassports.palette.length-1){
      rainbow = 0;
    }
  }

  fill(texts.palettesAndPassports.palette[rainbow]);

  $('#score').css("color", 'rgba( ' + texts.palettesAndPassports.palette[rainbow][0] + ',' + texts.palettesAndPassports.palette[rainbow][1] + ',' + texts.palettesAndPassports.palette[rainbow][2] + ',' + texts.palettesAndPassports.palette[rainbow][3]  + ')' );
  //$('#score').text('Score: ' + lifeAchievements);
  $('#score').text(texts[lang].instructions.scoreHTML + lifeAchievements);

  //text('score: ' + lifeAchievements, 45, 80);
  //fill('black');
  //noStroke();


  /*
  *
  *   Display all attractors.
  *
  */

  for (let i=0; i < attractors.length; i++) {
    if(attractors[i].existance == "defined"){
      attractors[i].move();
      attractors[i].display();
    }
  } //close for()


  /*
  *
  *   Display all particles.
  *
  */

  for (let i = 0; i < particles.length; i++) {
    //when youParticle.giveInformation is first,
    //colors are changed always for Score!?

    particles[i].move();
    particles[i].display();
    /*
    if (youParticle){ //once its defined==truthy, resolves as true in boolean
      youParticle.giveInformation();
    }
    */


  } //close for()

    /*
    *
    *   Change destiny of You particle every 500 or 700 frames
    *
    */


  if(frameCount % 500 == 0){
    //youParticle.isAttractedTo = random(attractorQualities);
    //console.log("Changed youParticles destiny to: " + youParticle.isAttractedTo);
  }


  /*
  *
  *   Limit number of particles in the world.
  *
  */

  if (frameCount%20 == 0) {
    if(particles.length < 100){
      spawnNewParticles();
    } else {
      //console.log(" * -- max number of particles reached --*")
    }
  } //close if(framecount)


  /*
  *
  *   Randomly change passportMode first after 2 minutes and then every 2-4 minutes.
  *
  */

  if (frameCount == fpm) { //once one minute has passed
    changePassportMode();
  } else if ( ( frameCount%( fpm*round(random(1,2)) ) ) == 0 ){
    changePassportMode();
  }//close if(framecount)




  /*
  *
  *   Spawn new attractor.
  *
  */

  if (frameCount >= 600 && frameCount%50 == 0) {
    //find Y coordinate of cell in the middle,
    //create all random attractors only above this middle

    /*
    var middleGround = theWorldSites[theWorldSites.length/2].y; //Y coordinate of middle ground
    var randomX = random(0, canvasX);
    var randomY = random(0, middleGround);
    */

    /*
    var privilegedArea = 4;
    var randomX = random(0, canvasX-70);
    var randomY = random(30, canvasY/privilegedArea);
    */

    var randomX;
    var randomY;

    randomX = random(50, width-100);
    randomY = random(50, height-100);

/*
//make attractors appear in different zones depending on passportmode:
    if(passportMode != 4){ //if its not access all areas, create opportunities in all areas:
      //if(passportMode == 4){ //if its access all areas, create opportunities in all areas:
      randomX = random(33, width-133);
      randomY = random(33, canvasY-33);
    }else { // if it [is NOT/is] restricted, only create opportunities in the center of the screen:
      randomX = random(0.33*width, 0.66*width);
      randomY = random(0.33*height, 0.66*height);
    }
    */

    if(worldAttractions.length > 0){
      if(passportMode == 1){
        //spawnNewAttractor(random(20, 100), random(30, 100));
        //change this to relative to canvasX and canvasY:
        spawnNewAttractor(random(canvasX/5, canvasX/4), random(canvasY/5, canvasY/4));

        /*
        var privilege = true;
        while(privilege){
          randomX = random(50, width-100);
          randomY = random(50, height-100);
          //check whether cellID at (randomX, randomY) is equal to
          //the cells allowed for You -particle.
          // if(randomPoint is in area allowed for You particle)
          //choose new random Point
          //once randomPoint is outside of the area allowed for YouParticle,
          */

      }else{
        spawnNewAttractor(randomX, randomY);
      }
    }
  } //close if(framecount)


  /*
  *
  *   Spawn the youParticle.
  *
  */

  if (frameCount == 15){
    youParticle = new particle(canvasX/2, canvasY/2, true);
    particles.splice(0, 0, youParticle); //can do the check based on indexOf!!! Because youParticle is always at index 0
    youParticle.isAttractedTo = random(attractorQualities);
    //youParticle.infoText = 'You';
    youParticle.lifespan = 100000; // may You have a long life
}//close if(framecount)

/* //old approach to creating youParticle:
    if(lang == "pt"){
      youParticle.infoText = "Tu";
      youParticle.isAttractedTo = "o impossível";
    } else { //otherwise show in english

      //youParticle.isAttractedTo = "the impossible";
      youParticle.isAttractedTo = random(attractorQualities);
      youParticle.infoText = 'You (' + youParticle.isAttractedTo + ')';
      console.log("Initialised: You particle is attracted to: " + youParticle.isAttractedTo);
    }
    youParticle.lifespan = 100000; // may You have a long life
    */


} //close function draw()


/*
*
*   Spawn x particles.
*
*/

function spawnNewParticles() {
  //var numberOfNewParticles = random([0,0,0,0,0,1,2]); // randomly choose how many are born, weighted at 0:
  //fill the screen immediately with lots of particles:
  //if(frameCount < 2000){
    var numberOfNewParticles = random([0,5,10,0,5,20,2]); // randomly choose how many are born, weighted at 0:
  //} else {
  //  var numberOfNewParticles = random([0,0,0,0,0,1,2]);
  //}

  for(let i = 0 ; i < numberOfNewParticles ; i++){
    //randomly choose the cell they are born into:
    var newHome = round(random(0, theWorldSites.length-1));
    var newParticle = new particle(theWorldSites[newHome].x, theWorldSites[newHome].y);

    // OR: birth particles selectively from different cells.
    // eg. lots from small ones, few from large ones.

    particles.push(newParticle);
  }
} //close spawnNewParticles()


/*
*
*   Create random sites for voronoi diagram.
*
*/

function createRandomSites() {

  let maps = Object.values(texts.maps); //make array of all maps available
  let chosenMap = random(maps); //choose random one
  chosenMap(); //implement it
  //texts.maps.attempt();

//strange result, but could work on making this algorithmic too:
  var spiral = [
      [canvasX/2, canvasY/2],
      [canvasX/4, canvasY/4],
      [canvasX/6, canvasY/6],
      [canvasX/8, canvasY/8],
      [canvasX/10, canvasY/10],
      [canvasX/12, canvasY/12],
      [(canvasX/2 + canvasX/16), (canvasY/2 + canvasY/14)],
      [(canvasX/2 + canvasX/16), (canvasY/2 + canvasY/16)],
      [(canvasX/2 + canvasX/18), (canvasY/2 + canvasY/18)],
      [(canvasX/2 + canvasX/10), (canvasY/2 + canvasY/10)],
      [(canvasX/2 + canvasX/12), (canvasY/2 + canvasY/12)],
      [(canvasX/2 + canvasX/13), (canvasY/2 + canvasY/13)]
  ];

    // TO-DO: make it so that any number of cells can be created
    // using the palette colors
    // PROBLEM: passports / goTowardsClosestAllowedZone
    // are assuming that there is only one zone of each color,
    // ie, consequent TODO:
    // rewrite goTowardsClosestAllowedZone: takes an array of allowed zones,
    // everytime passport changes,
    // create array of all allowedZones based on cellID (ie. color)
    // checks what is closest OR chooses random one

} //close createRandomSites


/*
*
*   Spawn one attractor.
*
*/

function spawnNewAttractor(attractorX, attractorY) {
  if(attractorX == undefined || attractorY == undefined){
    attractorX = random(0, canvasX);
    attractorY = random(0, canvasY);
  }
  //let quality = random(attractorQualities);
  //we've already done the check for if its possible to make an attractor,
  //so now just make it:
  //choose a random quality from the worldAttractions
  let qualityIndex = round(random(0, worldAttractions.length-1));
  //now weve chosen the index of the attractor from the attractions array: qualityIndex
  //now, set quality to
  let quality = worldAttractions[qualityIndex];
  //then remember to remove it from the worldAttractions
  worldAttractions.splice(qualityIndex, 1); //remove 1 element starting from qualityIndex
  let lifespan = random(40,60);
  attractors.push(new attractor(quality, attractorX, attractorY, lifespan));
} //close spawnNewAttractor
