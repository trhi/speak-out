var drawingBorderX = 0;
var drawingBorderY = 0;

var canvasX = window.innerWidth;
var canvasY = window.innerHeight;

var myCanvas;

var lang = ""; // browser language -> sets language of recogniser and all texts
var raumPatron; // raum.pt font

// TO-DO: create unlimited zones using fixed 12 color palette.
const zones = 12; // currently: maximum value is 12, as there are only 12 colors on the palette
var randomSites = [];
var theWorld;
var theWorldSites = []; //this is an array of p5.Vectors in order of cellID
var particles = [];
var attractors = [];

// TO-DO: implement repulsors.
// var repulsors = [];
// var repulsorQualititesEN = ["a bad thing"];
// var repulsorQualititesPT = ["uma coisa má"];

var attractorQualities = [];
var attractorQualitiesEN = ["nothing", "nothing", "nothing", "nothing", "nothing",
"a good thing", "yourself", "the impossible", "myself", "my true self",
"work", "work", "work", "work", "work", "work", "work", "work", "work", "work",
"my retirement",
"opportunity", "love", "shelter", "food",
"health",
"money", "lots of money", "some money", "a coin",
"a home", "a house", "a shelter", "a roof over my head", "a piece of land",
"a job", "a clothing store", "a park", "study",
"dignity", "freedom", "to do what I love", "to love what I do", "a place to breathe",
"peace", "some peace of mind", "some time for myself", "time", "some time",
"exploration", "a mountain", "a better life",
"a flower shop", "a supermarket", "ikea", "coca cola dreams"];

var attractorQualitiesPT = ["nada", "nada", "nada", "nada", "nada",
"o impossível", "eu próprio", "ela", "ele",
"uma coisa boa", "uma surpresa",
"a minha família",
"o autocarro", "o onibus", "o meu carro",
"trabalho", "trabalho", "trabalho", "trabalho", "trabalho", "trabalho", "emprego",
"almoço", "jantar", "comida", "um café",
"algo", "?", "?", "?",
"a escola", "a universidade", "o creche", "o meu lar", "o escritório", "a obra",
"dinheiro", "um pouco dinheiro", "muito dinheiro",
"tempo para mim", "tempo", "mais tempo",
"uma casa", "um abrigo", "um terreno",
"um parque", "o meu sonho", "uma floresta",
"ikea", "uma loja", "um café", "uma florista",
"liberdade", "um sítio seguro", "segurança", "respirar sem medo", "um começo", "um começo"];

var you = ["You"];
var youParticle;

var passportMode = 3;
var numberOfPassports = 6;

var worldColors = []; // index of the RGBA of all cells in order of cellID
var worldGIndex = []; // index of the G value of all cells in order of cellID

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

var complementary = [
  [223, 36],
  [181, 54],
  [135, 120],
  [97, 168],
  [39, 142],
  [2, 186],
  [36, 223],
  [54, 181],
  [120, 135],
  [168, 97],
  [142, 39],
  [186, 2]
];

var triad = [
  [223, 39, 120],
  [181, 2, 168],
  [135, 36, 142],
  [97, 54, 186],
  [39, 120, 223],
  [2, 168, 181],
  [36, 142, 135],
  [54, 186, 97],
  [120, 223, 39],
  [168, 181, 2],
  [142, 135, 36],
  [186, 97, 54]
];

//create a deep copy of the passport rules (color mappings)
//so that passports can be built
var analogousColors = JSON.parse(JSON.stringify(analogous));
var complementaryColors = JSON.parse(JSON.stringify(complementary));
var triadColors = JSON.parse(JSON.stringify(triad));

// TO-DO: poetry.
// each passport mode has 6 lines of poetry, that can be recombined
var passportSentences = [];
var passportSentencesPT = [
  ['"quero ficar aqui"',
  '"ou: só posso ficar aqui?"',
  '"nunca irei partir"',
  '"porque não preciso ir"',
  '"não quero ficar aqui"',
  '"mas nunca poderei sair"'], //@: monochromatic
  ['"somos parecidos"',
  '"não tenho medo"',
  '"integramos algo maior"',
  '"os outros são diferentes"',
  '"quem são os outros?"',
  '"felizmente não podem entrar"'], //€: analogous
  ['"qual a diferença entre o descobrimento e a colonização?"',
  '"só um de nós é que tem o poder"',
  '"qual a diferença entre a colonização e o descobrimento?"',
  '"é fácil conquistar quem está mais fraco"',
  '"esta terra era a nossa"',
  '"esta terra continua a nossa"'], //>: complementary
  ['"vivo numa fortaleza"',
  '"vejo uma porta"',
  '"mas a não abro"',
  '"preciso ar"',
  '"tento respirar cá fora"',
  '"nasci aqui"'], //§: triad
  ['"posso ir onde quero"',
  '"vou ir"',
  '"poderei querer ir"',
  '"posso ir onde quer que fosse"',
  '"agora vou"',
  '"não tenho terra"'], //⊙: open borders
  ['"tenho muito medo de voltar"',
  '"nunca mais posso voltar"',
  '"ninguém me espera"',
  '"a minha terra já não é minha"',
  '"tenho saudades da minha terra"',
  '"nunca mais posso voltar à minha terra"']  //!: exile
];

var passportSentencesEN = [
  ['"I can only stay here"',
  '"I can only stay here"',
  '"I can only stay here"',
  '"I can only stay here"',
  '"I can only stay here"',
  '"I can only stay here"'], //@: monochromatic
  ['"My neighbors are so similar to you"',
  '"My neighbors are so similar to me"',
  '"My neighbors are so similar to me"',
  '"My neighbors are so similar to me"',
  '"My neighbors are so similar to me"',
  '"My neighbors are so similar to me"'], //€: analogous
  ['"There is a bridge to our former colonies"',
  '"There is a bridge to our former colonies"',
  '"There is a bridge to our former colonies"',
  '"There is a bridge to our former colonies"',
  '"There is a bridge to our former colonies"',
  '"There is a bridge to our former colonies"'], //>: complementary
  ['"I live in a fortress"',
  '"I live in a union"',
  '"I live in a union"',
  '"I live in a union"',
  '"I live in a union"',
  '"I live in a union"'], //§: triad
  ['"I can go whereever I want"',
  '"I can go whereever I want"',
  '"I can go whereever I want"',
  '"I can go whereever I want"',
  '"I can go whereever I want"',
  '"I can go whereever I want"'], //⊙: open borders
  ['"I can never return"',
  '"I can never return"',
  '"I can never return"',
  '"I can never return"',
  '"I can never return"',
  '"I can never return"']  //!: exile
];

function preload(){
  raumPatron = loadFont('css/fonts/patron/PatronWEB-Medium.woff');
}

function setup() {

  if (window.parent.location.href.indexOf("/en/") > -1) {
    //for raum.pt:
    //if the string "/en/ is included in the href of the parent window"
    //ie if the url above the iframe is ...raum.pt/en/terhi-marttila, then:
    //(raum always refreshes when the user selects a new language)
    lang = "en";
    attractorQualities = [...attractorQualitiesEN];
    passportSentences = [...passportSentencesEN];
  } else { // for raum:
    lang = "pt";
    attractorQualities = [...attractorQualitiesPT];
    passportSentences = [...passportSentencesPT];
  }

  myCanvas = createCanvas(canvasX, canvasY);
  frameRate(30);
  doVoronoiSetupStuff();
  doInterface();
  doPassports();

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
*
*/

function doPassports() {

  /*
  *
  *   worldColors, an array of RGBA values ordered by CellID.
  *
  */

  for(var i=0;i<palette.length;i++){
    worldColors[i] = voronoiGetColor(i);
  }

  /*
  *
  *   worldGIndex, an array of G values ordered by CellID.
  *   (also serves as the monochrome passport)
  *
  */

  for(var i=0;i<palette.length;i++){
    worldGIndex[i] = worldColors[i][1];
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
          analogous[i][k] = j; // map g to cellID
        }
      }
    }
  }

  for(var i=0; i<complementaryColors.length; i++){
    for(var k=0; k<complementaryColors[i].length;k++){
      for(var j=0; j<worldGIndex.length; j++){
        if(complementaryColors[i][k] == worldGIndex[j]){
          complementary[i][k] = j; // map g to cellID
        }
      }
    }
  }

  for(var i=0; i<triadColors.length; i++){
    for(var k=0; k<triadColors[i].length;k++){
      for(var j=0; j<worldGIndex.length; j++){
        if(triadColors[i][k] == worldGIndex[j]){
          triad[i][k] = j; // map g to cellID
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

function mousePressed(){
  //zone of passports OR zone of other buttons:
  if((mouseX > window.innerWidth-90 && mouseY < 320) || (mouseX > window.innerWidth-270 && mouseY > window.innerHeight-80)){
    //don't do anything if the user clicks in the zone of the buttons.
  } else {
    spawnNewAttractor(mouseX, mouseY);
  }
  return false;
}

function draw() {

  if (keyIsDown(65) || keyIsDown(66) || keyIsDown(67)  || keyIsDown(68)  || keyIsDown(69)  || keyIsDown(70) ){
    iywstcPlay();
  }

  if (keyIsDown(LEFT_ARROW)){
    youParticle.userDirectionVector.add(-0.9, 0);
  }
  if (keyIsDown(RIGHT_ARROW)){
    youParticle.userDirectionVector.add(0.9, 0);
  }
  if (keyIsDown(UP_ARROW)){
    youParticle.userDirectionVector.add(0, -0.9);
  }
  if (keyIsDown(DOWN_ARROW)){
    youParticle.userDirectionVector.add(0, 0.9);
  }

  clear(); //remove trace of former particles
  cursor(ARROW);

  //Draw diagram in coordinates 0, 0
  //Filled and without jitter
  voronoiDraw(drawingBorderX, drawingBorderY, true, false);


  /*
  *
  *   Display all attractors.
  *
  */

  for (let i=0; i < attractors.length; i++) {
    if(attractors[i].existance == "defined"){
      attractors[i].display();
    }
  } //close for()


  /*
  *
  *   Display all particles.
  *
  */

  for (let i = 0; i < particles.length; i++) {
    particles[i].move();
    particles[i].display();
    if (frameCount >= 21){
      youParticle.giveInformation();
    }
  } //close for()


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
  *   Spawn new attractor.
  *
  */

  if (frameCount%200 == 0) {
    var randomX = random(0, canvasX);
    var randomY = random(0, canvasY);;
    spawnNewAttractor(randomX, randomY);
  } //close if(framecount)


  /*
  *
  *   Spawn the youParticle.
  *
  */

  if (frameCount == 20){
    youParticle = new particle(canvasX/2, canvasY/2);
    particles.splice(0, 0, youParticle);
    if(lang == "pt"){
      youParticle.infoText = "Tu";
      youParticle.isAttractedTo = "o impossível";
    } else { //otherwise show in english
      youParticle.infoText = "You";
      youParticle.isAttractedTo = "the impossible";
    }
    youParticle.lifespan = 100000; // may You have a long life
  }//close if(framecount)

} //close function draw()


/*
*
*   Spawn x particles.
*
*/

function spawnNewParticles() {
  var numberOfNewParticles = random([0,0,0,0,0,1,2]); // randomly choose how many are born, weighted at 0:
  for(let i = 0 ; i < numberOfNewParticles ; i++){
    //randomly choose the cell they are born into:
    var newHome = round(random(0, theWorld.cells.length-1));
    var newParticle = new particle(theWorld.cells[newHome].site.x, theWorld.cells[newHome].site.y);
    particles.push(newParticle);
  }
} //close spawnNewParticles()


/*
*
*   Create random sites for voronoi diagram.
*
*/

function createRandomSites() {
  for (i = 0; i < zones; i++) {
    randomSites.push(
      [random(drawingBorderX, canvasX),
        random(drawingBorderY, canvasY),
        palette[i]
      ]
    );
    /*
    // TO-DO: make it so that any number of cells can be created
    // using the palette colors
    // PROBLEM: passports / goTowardsClosestAllowedZone
    // are assuming that there is only one zone of each color
    // randomSites.push(
    //      [random(drawingBorderX, canvasX),
    //        random(drawingBorderY, canvasY),
    //        random(palette)
    //      ]
    // );
    */
  } //close for
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
  let quality = random(attractorQualities);
  let lifespan = random(100,500);
  attractors.push(new attractor(quality, attractorX, attractorY, lifespan));
} //close spawnNewAttractor
