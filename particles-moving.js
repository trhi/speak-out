//this is the drawing border around the world
var drawingBorderX = 0;
var drawingBorderY = 0;

//it looks absolutely wonderful when it spans a really huge width and
//you need to scroll around to see it all!
//BUT with so much canvas and so many sites, processing it all gets really slow
var canvasX = 1000;
var canvasY = 600;

var canvasX = window.innerWidth - 20;
var canvasY = window.innerHeight - 20;
//window.innerWidth;
//var h = window.innerHeight;

var myCanvas;


const zones = 12; //max 12, as there are 12 colors on the palette
var randomSites = [];
var theWorld; //global variable, can be accessed from particle.js
var theWorldSites = [];
var particles = [];
var attractors = [0];
//to give weight to creating particles that are attracted to nothing:
var attractorQualities = ["nothing", "nothing", "nothing", "nothing", "nothing",
"nothing",
"work", "work", "work", "work", "work", "work", "work", "work", "work", "work",
"opportunity", "love", "shelter", "food",
"money", "lots of money", "some money", "a coin",
"a home", "a house", "a shelter", "a child",
"a job", "a clothing store", "a park", "study",
"dignity", "freedom", "to do what I love", "to love what I do", "a place to breathe",
"peace", "some peace of mind", "some time for myself", "time", "some time",
"exploration", "a mountain", "a better life",
"a flower shop", "a supermarket", "ikea", "coca cola dreams"];
var you = ["You"];
var youParticle;

var passportModes = ["monochromatic", "analogous", "complementary", "triad"];
var passportMode = "analogous";

var worldColors = [];
var worldColorsNumberCodes = [];
var worldGIndex = [];

var paletteCopy = [
  [255, 223, 0, 127], // yellow
  [241, 181, 11, 127], // yellow orange
  [241, 135, 29, 127], // orange
  [241, 97, 33, 127], // orange red
  [241, 39, 39, 127], // red
  [200, 2, 134, 127], // red purple
  [109, 36, 139, 127], // purple
  [68, 54, 162, 127], // purple blue
  [18, 120, 196, 127], // blue
  [0, 168, 196, 127], // blue green
  [0, 142, 91, 127], // green
  [139, 186, 37, 127], // green yellow
]

var palette1 = [
  [255, 0, 153, 127], // pink
  [0, 153, 153, 127], // turquoise
  [255, 255, 102, 127], // light yellow
  [153, 51, 204, 127], // purple
  [51, 204, 255, 127], // light blue
  [255, 153, 0, 127], // orange
  [0, 204, 153, 127], // light green
  [255, 0, 102, 127], // red
  [255, 204, 102, 127], // light orange
  [51, 153, 255, 127], // dark blue
  [255, 153, 153, 127], // light red
  [204, 102, 204, 127] // light purple
]

var paletteOriginal = [
  [255, 223, 0, 127], // yellow
  [241, 181, 11, 127], // yellow orange
  [241, 135, 29, 127], // orange
  [241, 97, 33, 127], // orange red
  [241, 39, 39, 127], // red
  [200, 2, 134, 127], // red purple
  [109, 36, 139, 127], // purple
  [68, 54, 162, 127], // purple blue
  [18, 120, 196, 127], // blue
  [0, 168, 196, 127], // blue green
  [0, 142, 91, 127], // green
  [139, 186, 37, 127], // green yellow
]

var palette = [
  [255, 223, 0, 117], // yellow
  [241, 181, 11, 117], // yellow orange
  [241, 135, 29, 117], // orange
  [241, 97, 33, 117], // orange red
  [241, 39, 39, 117], // red
  [200, 2, 134, 117], // red purple
  [109, 36, 139, 117], // purple
  [68, 54, 162, 117], // purple blue
  [18, 120, 196, 117], // blue
  [0, 168, 196, 117], // blue green
  [0, 142, 91, 117], // green
  [139, 186, 37, 117], // green yellow
]

var paletteVeryPale = [
  [255, 223, 0, 100], // yellow
  [241, 181, 11, 100], // yellow orange
  [241, 135, 29, 100], // orange
  [241, 97, 33, 100], // orange red
  [241, 39, 39, 100], // red
  [200, 2, 134, 100], // red purple
  [109, 36, 139, 100], // purple
  [68, 54, 162, 100], // purple blue
  [18, 120, 196, 100], // blue
  [0, 168, 196, 100], // blue green
  [0, 142, 91, 100], // green
  [139, 186, 37, 100], // green yellow
]

var analogous = [
  [223, 181, 135, 97],
  [181, 223, 135, 97],
  [135, 223, 181, 97],
  [97, 223, 181, 135],
  [39, 97, 2, 36],
  [2, 39, 36, 54],
  [36, 2, 54, 120],
  [54, 36, 120],
  [120, 54, 168, 142],
  [168, 120, 142, 186],
  [142, 168, 186, 223],
  [186, 142, 223]
];

/*
var passport = {
  name:"analogous",
  allowed:[]
};
*/

//I give you my G number -> you give me my passport!
//SO: the world could keep a record of what g numbers are allowed to go where
//in each passport mode:
//eg. in monochrome: only g number == to my own
//eg. in all access: all g numbers OK
//eg. in analogous: for g= x: y,z,a
//                       = y: z,a,b
//                       = z: a,b,c
//and so on....
//

//an array of objects, where index == position in palette...




//This is to sort particles by attractorQuality:
//var particleAttractorIndex = {love: ["particle1", "particle2", "particle3"], work: ["particle4", "particle5", "particle6"]};
var particleAttractorIndex = [];

//var mic;

function setup() {

  myCanvas = createCanvas(canvasX, canvasY);
  noSmooth();
  //had frameRate(19); changed to frameRate(50);
  //to see how the program processes the particles
  //at a higher frame rate: does it get smoother?
  frameRate(30);

  console.log("These are the types of attractors that exist in the world:" + attractorQualities);

  //outsourced to its own function for sake of code simplicity
  doVoronoiSetupStuff();

  var audioElement = createAudio('sound/iywstc-XX.mp3');
  //audioElement.autoplay(true);

  console.log("Created audioElement. It is:");
  console.log(audioElement);

  var speak;

  button = createButton("i");
  //button.size(30);
  button.size(40,40);
  button.position(canvasX-50, canvasY-50);
  button.style("border-radius", "50%");
  button.mousePressed(infobuttonPressed);
  button.style("cursor", "pointer");
  button.style("border", "3px solid black");
  //button.style("color", "white");
  button.style("background-color", "white");
  button.style("background-color", "white");
  button.style("font-weight", "bold");


  /*
  //This is very unclear as a user interface:
  button.mouseMoved( () => {
      console.log("Went into button.mouseOver()");
      textSize(15);
      fill("black");
      var position = random()
      text("use the arrow keys to move You", 80, 45);
  });
  */


  function infobuttonPressed(){
    console.log("infobutton pressed!");
    audioElement.volume(0.02);
    audioElement.loop = false;
    audioElement.play();
    //speak.style("textContent", "Listening...");

    //button.disable;
    //var speak;



    setTimeout( () => {
      console.log("making other button!");
      speak = createButton("Speak out");
      speak.position(canvasX-150, canvasY-50);
      speak.style("cursor", "pointer");
      speak.style("border-radius", "50px");
      speak.style("background-color", "white");
      speak.size(90,40);
      speak.style("border", "3px solid black");
      speak.style("font-weight", "bold");
      //speak.style("textContent", "Listening...");

      //speak.style("color", "white");

      //speak.style("");
      //speak.class("active");


      //speak.mousePressed(speakButtonPressed);

      //this supposedly creates a checker for whether the mouse is held down
      //continuously:
      var intervalId;
      speak.mousePressed( () => {
        intervalId = setInterval(do_something, 30);
      }).mouseReleased( () => {
        clearInterval(intervalId);
        console.log("Mouse was released");
        speak.style("background-color", "white");
        speak.style("color", "black");
        //speak.style("textContent", "Speak out");



      });
      speak.mouseOut( () => {
        clearInterval(intervalId);
      });


    }, 6000);
    //speak.position(canvasX-200,30);

    }//close setTimeout

    //var foo = new p5.SpeechRec(); // speech recognition object (will prompt for mic access)
    //foo.onResult = showResult; // bind callback function to trigger when speech is recognized
    //foo.start(); // start listening

    function do_something() {
      console.log("Mouse is pressed down continually");

      //speak.class("active");

      //colors the button red while it is being held down
      //the idea here would be to "activate" speech recognition ONLY
      //when the user is holding down the *(microphone icon)
      speak.style("color", "white");
      //speak.style("textContent", "Listening...");
      speak.style("background-color", "#3333cc");
      //speak.style("background-color", "red");
      //speak.style();
    }

    function speakButtonPressed(){
      console.log("Speak out button pressed!");
      //speak.html("Listening...");

        //foo.start();

    }








  /*
  *
  *              Begin implementing particleAttractorIndex
  *
  *
  */


  /*
  *    var attractorQualities = ["nothing", "work", "love", "study", "culture", "freedom", "peace", "exploration"];
  *    var particleAttractorIndex = [];
  *   //var particleAttractorIndex = {love: ["particle1", "particle2", "particle3"], work: ["particle4", "particle5", "particle6"]};
  *    var particleAttractorIndex = [love: ["particle1", "particle2", "particle3"], work: ["particle4", "particle5", "particle6"]];
  */

  //particleAttractorIndex = {love: ["particle1", "particle2", "particle3"], work: ["particle4", "particle5", "particle6"]};
  //It should be an array of objects.
  particleAttractorIndex = [{quality: "love", particles: ["particle1", "particle2", "particle3"]}, {quality: "work", particles: ["particle4", "particle5", "particle6"]}];

  //In many ways, it would be easier to work with an array, HOWEVER,
  //for my purposes of accessing the list easily by attractorQuality,
  //I absolutely need to use an object, eg:
  //particleAttractorIndex[attractorQuality];


  //createParticleAttractorIndex();

  function createParticleAttractorIndex() {
    for (let i=0; i < attractorQualities.length; i++){
      console.log("This is the attractor quality at i: " + attractorQualities[i]);
      //let obj = {};
      //obj[]
      let keyName = attractorQualities[i];
      particleAttractorIndex.push({[keyName]:[0,1,2]});
    }
  }

  //the difference between .forEach() and .map() is that map returns an []
  console.table(particleAttractorIndex);

  //console.log("This is particleAttractorIndex: " + particleAttractorIndex);
  //console.log(particleAttractorIndex);

  //let qualityKey = "quality";
  console.log("This is what we have at index 0, behind the quality key: " + particleAttractorIndex[0].quality);
  console.log("This is the valueOf the object at that position in the array: " + particleAttractorIndex[0].valueOf());
  console.log(particleAttractorIndex[0].valueOf());


  //  console.log("This is the first particle at the index for love:" + particleAttractorIndex["love"][0]);

  //here, we can use array methods, because the "love" etc. keys within
  //the object all point towards an array:
  //particleAttractorIndex["love"].push("particle90");
  //console.log("This is the newest particle at the index for love:" + particleAttractorIndex["love"][3]);

  //let myParticles = particleAttractorIndex["love"].splice(0,2);
  //console.log(myParticles);
  //console.log(particleAttractorIndex["love"]);
  //particleAttractorIndex["love"].push(myParticles);
  //particleAttractorIndex["love"].push.apply(particleAttractorIndex["love"], myParticles);
  //console.log(particleAttractorIndex["love"]);




  /*
  //WORKS:
  //create a button
  //once pressed, this button initiates voice capture:
  button = createButton('speak');
  button.position(canvasX-100, canvasY-50);
  button.mousePressed(listenToMe);

  //initialise the microphone connect
  mic = new p5.AudioIn();
  */

  /*
  *
  *     Listen To Me -button
  *
  */

  //button = createButton('listen to me');
  //button.position(canvasX-100, canvasY-50);

  //unfortunately the p5 implementation wraps around an implementation
  //of the SpeechRecognition API that creates an instance of
  //webkitSpeechRecognition. For this reason, the new p5.SpeechRec()
  //will create a new recogniser that only works in chrome.
  //In order to work in firefox (after having enabled the flags through
  //about:config), we would need to create the instance of the speech
  //recogniser as:
  //var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  //thus firefox could point the SpeechRecognition variable to
  //SpeechRecognition, while chrome could point to webkitSpeechRecognition
  //var foo = new p5.SpeechRec(); // speech recognition object (will prompt for mic access)
  //foo.onResult = showResult; // bind callback function to trigger when speech is recognized
  //foo.start(); // start listening
  //every time that the user clicks this button,
  //they also have to allow the recogniser to listen to them...
  //OR: continous recognition, BUT, only when the user holds down the mouse
  //is when we log the recognition results.
  //foo.continuous = true;
  //button.mousePressed(listenToMe);
  //setTimeout(foo.start(), 200);
  //foo.onEnd = restart;

  /*function restart(){
    console.log("Restarting recognition");
    foo.start();
  }

  function listenToMe()
  {
    //foo.start();
  }

  function showResult()
  {
    console.log(foo.resultString); // log the result
  }
  */




} // close setup()
// close setup()// close setup()// close setup()// close setup()// close setup()
// close setup()// close setup()// close setup()// close setup()// close setup()
// close setup()// close setup()// close setup()// close setup()// close setup()
// close setup()// close setup()// close setup()// close setup()// close setup()




function doVoronoiSetupStuff(){


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
    //this method is not adding the sites in randomSites[]
    //in the same order! WHY NOT?
    /*
    for(var i=0; i<randomSites.length;i++){
      voronoiSite(randomSites[i]);
    }
    */

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
    print(theWorld);

    createTheWorldSites();
    console.log("These are the worlds' sites:");
    print(theWorldSites);
    console.log("This is the site at index 0:" + theWorldSites[1]);
    console.log("This is the site color at index 0:" + voronoiGetColor(1));
    //console.log("this is the color at index 0 in worldColors" + worldColors[0]);
    console.log("This is the color at palette index 0:" + palette[1]);
    console.log("These are the worlds colors:" + worldColors);

    //Get simplified cells without jitter, for more advanced use
    var normal = voronoiGetCells();
    //console.log(normal);

    //  <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3
    //  <3                                     <3
    //  <3             PASSPORT MODE           <3
    //  <3                                     <3
    //  <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3

    //What follows here is taking the world apart in terms of the colors of
    //the cells, in order to implement passports!

    //probably what will be sufficient is worldGIndex, which has the G value
    //of each RGBA color sorted by cellID. ie. index of worldGIndex correspons
    //to the cellID - G value of each cell color, which is enough information
    //to know what is the color of each cell, according to cellID

    //Using this information, it should be possible to build the passports

    //make an array of all the colors in the world
    //for(var i=0;i<zones;i++){
    for(var i=0;i<palette.length;i++){
      //here the position in the worldColors[] == cellID,
      //ie. cellID of 0 is color at worldColors[0];
      //remember that the G value of each color, ie worldColors[i][1]
      //is the unique identifier of each color.
      //This G value can be used to build the passports!
      worldColors[i] = voronoiGetColor(i);
      //add here as the 5th element the "colorID" of the color?
      //worldColors[i][4] = ;
    }
    console.log("World colors are:");
    console.log(worldColors);

    //make an array with number names

    //make an array with number codes
    //this is an array of just the G values:

    //the G-value of each color just happens to be unique!!!!
    //easiest way is to check against this...
    //AT THIS POINT, we should save the colorID of that color after the G value:
    for(var i=0;i<palette.length;i++){
      worldColorsNumberCodes[i] = [worldColors[i][1], 0] ;
    }

    //FIRST: identify what is the colorCode of this color?
    for(var i=0;i<zones;i++){
        for(var j=0;j<zones;j++){
          //compare the color of the cell (G) at i with color (G) at index j in palette
          if(worldColorsNumberCodes[i][0] == paletteCopy[j][1]){
            worldColorsNumberCodes[i][1] = j;
          }
        }
    }
    console.log("This is the mapping of palette colors to wolrd colors:");
    console.log(worldColorsNumberCodes);

    for(var i=0;i<palette.length;i++){
      worldGIndex[i] = worldColors[i][1];
    }

    console.log("This is the G index of world colors:");
    console.log(worldGIndex);

    //  <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3
    //  <3                                     <3
    //  <3             PASSPORT MODE           <3
    //  <3                                     <3
    //  <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3

}//close doVoronoiSetupStuff()







function createTheWorldSites(){
  //consider adding information about the color of the cell..
  for(var i=0;i<theWorld.cells.length;i++){
    var site = createVector(theWorld.cells[i].site.x, theWorld.cells[i].site.y);
    theWorldSites.push(site);
  }

}






/*
//initiate microphone input:
//note! this is not the same as speech recognition...
function listenToMe() {

mic.start();
mic.connect();
//let val = random(255);
//background(val);

} // close listenToMe()
*/



//  <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3
//  <3                                     <3
//  <3     This is Lilis idea!!!!!!!!      <3
//  <3                                     <3
//  <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3

//and whats nice is this: you can create them by clicking with your mouse
//ie. you can attempt to guide the migratory movements by creating these
//attractors in zones where you want particles to flock to.

//BUG: sometimes it doesnt work: sometimes, when you click, it simply does
//not create a sphere... why..
function mouseClicked() {
    spawnNewAttractor(mouseX, mouseY);
    return false;
}

function draw() {

  if (keyIsDown(LEFT_ARROW)){
    youParticle.userDirectionVector.add(-0.8, 0);
    //console.log("going left TWO!");
  }
  if (keyIsDown(RIGHT_ARROW)){
    youParticle.userDirectionVector.add(0.8, 0);
  }
  if (keyIsDown(UP_ARROW)){
    youParticle.userDirectionVector.add(0, -0.8);
  }
  if (keyIsDown(DOWN_ARROW)){
    youParticle.userDirectionVector.add(0, 0.8);
  }

/*
  if (keyCode === LEFT_ARROW) {
    youParticle.userDirectionVector.add(-1.5, 0);
    //console.log("keypressed!");
  } else if (keyCode === RIGHT_ARROW) {
    youParticle.userDirectionVector.add(1.5, 0);
  } else if (keyCode === UP_ARROW) {
    youParticle.userDirectionVector.add(0, -1.5);
  } else if (keyCode === DOWN_ARROW) {
    youParticle.userDirectionVector.add(0, 1.5);
  }
  */

  //removes trace of former particles
  clear();
  cursor(ARROW);

  if(frameCount >= 151){
    //youParticle.giveInformation();
  }



  /*
  //attempt to display some feedback from the microphone input:
  var myLevel = mic.getLevel().toString();
  text(myLevel, 60, 30);
  */

  //Draw diagram in coordinates 0, 0
  //Filled and without jitter
  voronoiDraw(drawingBorderX, drawingBorderY, true, false);
  //textSize(20);
  //text(frameCount, 20, 30);

  //create one attractor with the quality: repulsor!
  //for testing purposes!
  //by default: this will be the first "attractor" in the array


  /*
  if (frameCount == 10){
    let attractorX = random(0, canvasX);
    let attractorY = random(0, canvasY);
    let quality = "nothing"; //this used to be: "repulsor"
    let lifespan = random(500,1000);
    attractors.push(new attractor(quality, attractorX, attractorY, lifespan));
    console.log("Made me!");
    //attractors[0].attractorPosition.x
    //attractors[0].attractorPosition.y
  }
  */



  //BUT its nice that, alongside being able to decide where these attractors
  //emerge, they also emerge randomly. So as much as you try to control where
  //the particles flock to, sometimes their movement will be out of your
  //control.
  /*
  if (frameCount % 300 == 0) {
    //spawnNewAttractor();
    for(let i=0; i < attractors.length; i++){
      //console.log("There is a new attractor in the attractors array, with the quality: " + attractors[i].quality);
      //console.log(attractors[0].quality);
    }
  }
  */


  /*
  *
  *   Display all attractors.
  *
  */

  //for some reason this is only displaying attractor[0],
  //it is not going beyond index 0 to display 1, 2, even though the
  //other attractors exist in the array as valid objects.....
  //this currently only displays one attractor at a time....
  //why is this not looping through to display all the attractors in the
  //attractors array?
  //the problem was that this variable was possibly being confused
  //with the for() loop for particles??
  //Problem fixed by initialising i using var i =0.
  for (let i=0; i < attractors.length; i++) {

    //console.log("Length of attractors array is:" + attractors.length);
    //console.log("Displaying attractor number:" + i);
    //displays all attractors in the world
    //this was failing because at the last cycle of the attractors
    //life, the particle was first being removed (through display())
    //and only then did it try to attractParticles().....!!!
    if(attractors[i].existance == "defined"){
      //console.log("Framecount = " + frameCount);
      attractors[i].display();

    }


    /*if(frameCount > 404 && frameCount < 600){
    console.log("Second attractor is: ");
    attractors[1].display();
    console.log(attractors[1]);
  }
  if(frameCount > 606){
  attractors[2].display();
  console.log("Third attractor is: " + attractors[2]);
}
*/

} //close for


/*
*
*   Display all particles.
*
*/

for (let i = 0; i < particles.length; i++) {
  particles[i].move();
  strokeWeight(1);
  particles[i].display();

  /*
  if (frameCount >= 155 && frameCount <= 555){
    youParticle.giveInformation();
  }
  */



  if (frameCount >= 21){

    youParticle.giveInformation();
    //console.log("Cell ID that You particle is currently at:" + voronoiGetSite(youParticle.positionVector));
    var currentCellID = voronoiGetSite(youParticle.positionVector.x, youParticle.positionVector.y);
    if(currentCellID == undefined){
      //this only evaluates as undefined at the edges... grah!!!
      //at the borders it evaluates as either the one cell or the other..
      console.log("Current cell is undefined at:" + youParticle.positionVector.x);
      //currentCell = this.cellID;
    }
    //youParticle.isAttractedTo = currentCellID + ", " + youParticle.cellID;
    //SO: when the particle is located over a voronoi cell border,
    //it is understood as not being in a cell at all,
    //ie. voronoiGetSite(x,y) will return undefined.
    //
    //if(currentCellID == undefined){
      //youParticle.infoText = currentCellID;
    //}
    //youParticle.isAttractedTo = voronoiGetColor(youParticle.positionVector.x, youParticle.positionVector.y);
    //console.log("Cell ID that You particle is currently at:" + currentCellID);

    //console.log("Their colors are:" + neighborsColors);

  }

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



if (frameCount%100 == 0) {
  spawnNewParticles();
} //close if framecount



//Spawn you-particle!
if (frameCount == 20){
  youParticle = new particle(canvasX/2, canvasY/2);
  particles.splice(0, 0, youParticle);
  youParticle.isAttractedTo = "love";
  youParticle.infoText = "You";
  youParticle.passport = "analogous";
  //youParticle.diameter = 40;
  youParticle.lifespan = 100000;
  //youParticle.color = "white";
  console.log("Succesfully created you");
  console.log("You are attracted to:" + youParticle.isAttractedTo);
  console.log("Your lifespan is:" + youParticle.lifespan);
  youParticle.giveInformation();

  //find out who your immediate neighbors are:
  var yourNeighbors = voronoiNeighbors(youParticle.cellID);
  console.log("My neighbors are:" + yourNeighbors);
  var neighborsColors = [];
  for(i=0;i<yourNeighbors.length;i++){
    neighborsColors[i] = voronoiGetColor(yourNeighbors[i]);
    console.log(neighborsColors[i]);
  }

  console.log("My g is:" + youParticle.g);





  //or we could just check the G values of voronoiGetColor(theworld.cells.site[whereparticleisat])

  //let's pretend that the passport rule is: analogous
  //how do I tell youParticle where it is allowed to go?
  //I will now allow youParticle to go only into neighboring cells:


/*
  var palette = [
    [255, 223, 0, 127], // yellow
    [241, 181, 11, 127], // yellow orange
    [241, 135, 29, 127], // orange
    [241, 97, 33, 127], // orange red
    [241, 39, 39, 127], // red
    [200, 2, 134, 127], // red purple
    [109, 36, 139, 127], // purple
    [68, 54, 162, 127], // purple blue
    [18, 120, 196, 127], // blue
    [0, 168, 196, 127], // blue green
    [0, 142, 91, 127], // green
    [139, 186, 37, 127], // green yellow
  ]
*/


}//close if() for spawning youParticle







} //close function draw



/*
//THIS IS PROBLEMATIC:
//because the effect of this is super long-lasting..
function keyPressed(){
  console.log("keypressed!");
    if (keyCode === LEFT_ARROW) {
      youParticle.userDirectionVector.add(-1.5, 0);
      //console.log("keypressed!");
    } else if (keyCode === RIGHT_ARROW) {
      youParticle.userDirectionVector.add(1.5, 0);
    } else if (keyCode === UP_ARROW) {
      youParticle.userDirectionVector.add(0, -1.5);
    } else if (keyCode === DOWN_ARROW) {
      youParticle.userDirectionVector.add(0, 1.5);
    }

}

*/


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
  for(let i = 0 ; i < numberOfNewParticles ; i++){
    //chooses one of the voronoi cells:
    var newHome = round(random(0, theWorld.cells.length-1));
    var newParticle = new particle(theWorld.cells[newHome].site.x, theWorld.cells[newHome].site.y);
    particles.push(newParticle);
    //spawnNewParticle(newHome);
  }

} //close spawnNewParticles()

/*
*
*   Spawn one particle. //redundant
*
*/
/*
function spawnNewParticle(newHome){
  var newParticle = new particle(theWorld.cells[newHome].site.x, theWorld.cells[newHome].site.y);
  particles.push(newParticle);
} //close spawnNewParticle
*/

/*
*
*   Create random sites for voronoi diagram.
*
*/


function createRandomSites() {
  //for (i = 0; i < zones; i++) {
  for (i = 0; i < palette.length; i++) {
    //here: create the sites so that cellID corresponds
    //to the index of the color of the cell:
    /*var paletteIndex = round(random(0, palette.length-1));
    randomSites.push(
      [random(drawingBorderX, canvasX),
        random(drawingBorderY, canvasY),
        palette[paletteIndex]
      ]
    );
    */
    randomSites.push(
      [random(drawingBorderX, canvasX),
        random(drawingBorderY, canvasY),
        palette[i]
      ]
    );
  //palette.splice(paletteIndex, 1);

  } //close for
  console.log("These are the random sites and their colors:");
    print(randomSites);

  } //close createRandomSites

  //colorPalette


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
    let quality = random(attractorQualities);
    //sets a random lifespan
    let lifespan = random(300,600);

    if (quality == "nothing"){
      //do not create an attractor
    } else {
      attractors.push(new attractor(quality, attractorX, attractorY, lifespan));
    }
  } //close spawnNewAttractor
