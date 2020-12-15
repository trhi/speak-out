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

//Reprogram this so that you can actually create any number of zones,
//the zones after 12 will just be assigned the same colors:
const zones = 12; //max 12, as there are 12 colors on the palette
var randomSites = [];
var theWorld; //global variable, can be accessed from particle.js
var theWorldSites = []; //this is an array of p5.Vectors in order of cellID
var particles = [];
var repulsors = [];
var repulsorQualities = ["a bad thing"];

var attractors = [0];
//to give weight to creating particles that are attracted to nothing:
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

var passportModes = ["monochromatic", "analogous", "complementary", "triad", "all"];
//var passportMode = passportModes[1];
var passportMode = 1;


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

/*
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
*/

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

var analogousColors = [
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

var complementaryColors = [
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

var triadColors = [
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

//var mic;

var lang = ""; //use this to set the language of the speech recogniser as well
//NEED TO check for all browsers here!!!
//IF chrome = use voice interface
//if chrome for android = do not use voice interface
//if firefox = do not use voice interface
//if safari = do not use voice interface
//if explorer = do not use voice interface
var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

var raumPatron;

var passportButtons;
var passportsDiv;

var speakButton;

var speechToText = "";

var showPassportOptions = false;
var passportHover = "";

var passportSentencesPT = [
  ['"Eu só quero ficar aqui"', '"Eu só posso ficar aqui"', '"Eu só posso ficar aqui"',
    '"Eu só posso ficar aqui"', '"Eu só posso ficar aqui"', '"Eu só posso ficar aqui"'], //A: monochromatic
  ['"Os meus vizinhos são como tu"', '"Os meus vizinhos são como eu"', '"Os meus vizinhos são como eu"',
    '"Os meus vizinhos são como eu"', '"Os meus vizinhos são como eu"', '"Os meus vizinhos são como eu"'], //B: analogous
  ['"Ao fundo do corredor são as ex-países"', '"Ao fundo do corredor são as ex-colónias"', '"Ao fundo do corredor são as ex-colónias"',
    '"Ao fundo do corredor são as ex-colónias"', '"Ao fundo do corredor são as ex-colónias"', '"Ao fundo do corredor são as ex-colónias"'], //C: complementary
  ['"Eu vivo numa fortaleza"', '"Eu vivo num união"', '"Eu vivo num união"',
    '"Eu vivo num união"', '"Eu vivo num união"', '"Eu vivo num união"'], //D: triad
  ['"Eu posso ir onde quero"', '"Eu posso ir onde quero"', '"Eu posso ir onde quero"',
    '"Eu posso ir onde quero"', '"Eu posso ir onde quero"', '"Eu posso ir onde quero"'], //E: open borders
  ['"Nunca mais posso voltar a minha terra"', '"Nunca mais posso voltar a minha terra"', '"Nunca mais posso voltar a minha terra"',
    '"Nunca mais posso voltar a minha terra"', '"Nunca mais posso voltar a minha terra"', '"Nunca mais posso voltar a minha terra"']  //F: exile
];

var passportSentencesEN = [
  ['"I can only stay here"', '"I can only stay here"', '"I can only stay here"',
    '"I can only stay here"', '"I can only stay here"', '"I can only stay here"'], //A: monochromatic
  ['"My neighbors are so similar to you"', '"My neighbors are so similar to me"', '"My neighbors are so similar to me"',
    '"My neighbors are so similar to me"', '"My neighbors are so similar to me"', '"My neighbors are so similar to me"'], //B: analogous
  ['"There is a bridge to our former colonies"', '"There is a bridge to our former colonies"', '"There is a bridge to our former colonies"',
    '"There is a bridge to our former colonies"', '"There is a bridge to our former colonies"', '"There is a bridge to our former colonies"'], //C: complementary
  ['"I live in a fortress"', '"I live in a union"', '"I live in a union"',
    '"I live in a union"', '"I live in a union"', '"I live in a union"'], //D: triad
  ['"I can go whereever I want"', '"I can go whereever I want"', '"I can go whereever I want"',
    '"I can go whereever I want"', '"I can go whereever I want"', '"I can go whereever I want"'], //E: open borders
  ['"I can never return"', '"I can never return"', '"I can never return"',
    '"I can never return"', '"I can never return"', '"I can never return"']  //F: exile
];

var textDisplayCounter = 0;
var saturation = 255;

function windowResized() {
    console.log("Reloading!");
  //  window.location.reload();
}


function preload(){
  raumPatron = loadFont('css/fonts/patron/PatronWEB-Medium.woff');
}

function setup() {


  if (window.parent.location.href.indexOf("/en/") > -1) {
    //if the string "/en/ is included in the href of the parent window"
    //ie if the url above the iframe is ...raum.pt/en/terhi-marttila, then:
    //raum always refreshes when the user selects a new language
        lang = "en";
        attractorQualities = [...attractorQualitiesEN];
        //console.log("Changed attractorQualities to attractorQualitiesEN!");
  } else {
        //for testing:
        lang = "pt";
        attractorQualities = [...attractorQualitiesPT];
        //lang = "pt";
        //attractorQualities = [...attractorQualitiesPT];
        //console.log("Changed attractorQualities to attractorQualitiesPT!")
  }
  //console.log("Language of the parent window is:" + lang);

  myCanvas = createCanvas(canvasX, canvasY);

  //had frameRate(19); changed to frameRate(50);
  //to see how the program processes the particles
  //at a higher frame rate: does it get smoother?
  frameRate(30);
  //outsourced to its own function for sake of code simplicity
  doVoronoiSetupStuff();

  var iywstc = createAudio('sound/iywstc-XX.mp3');
  //var sqvamtqf = createAudio('sound/sqvamtqf-XX.mp3');

  passport0 = createButton("A", 0);//monochromatic = 0
  passport1 = createButton("B", 1);//analogous = 1
  passport2 = createButton("C", 2);//complementary = 2
  passport3 = createButton("D", 3);//triad = 3
  passport4 = createButton("E", 4);//all = 4
  passport5 = createButton("F", 5);//all but my own = 5

  passportsDiv = createDiv();
  passport0.class("passportButton");
  passport1.class("passportButton");
  passport2.class("passportButton");
  passport3.class("passportButton");
  passport4.class("passportButton");
  passport5.class("passportButton");

  passportButtons = selectAll(".passportButton");
  for (let i = 0; i < passportButtons.length; i++) {
        passportButtons[i].parent(passportsDiv);
        passportButtons[i].addClass("buttonStyle toggle passports-toggle tooltip tooltip-left");
        //not in user anymore, using tooltips now:
        //passportButtons[i].mouseOver(showPassportInfo);
        //passportButtons[i].mouseOut(hidePassPortInfo);
        if(is_chrome){
              passportButtons[i].mousePressed(iywstcPlay);//for chrome users,
              //passportButtons[i].mouseOver();
        } else {
              passportButtons[i].mousePressed(passportChosen);
        }
        if(lang == "en"){
            passportButtons[i].attribute('title', random(passportSentencesEN[i]));
        } else if (lang == "pt"){
            var randomTitle = random(passportSentencesPT[i]);
            //console.log("Setting passport attribute title to:", randomTitle);
            passportButtons[i].attribute('title', randomTitle);
        }
        passportButtons[i].position("right: 40px", i*50+30);
        passportButtons[i].id(i);
  }

  //not in use anymore:
  function showPassportInfo() {
        showPassportOptions = true;
        passportHover = this.id();
  }

  //not in use anymore:
  function hidePassPortInfo() {
        showPassportOptions = false;
  }

  function passportChosen() {
        //passportMode = passportID;
        //this.value();
        //console.log("This is what the function passed to me: ");
        //console.log(this.id());
        passportMode = this.id();
        for (let i = 0; i < passportButtons.length; i++) {
            passportButtons[i].style("background-color", "white");
            passportButtons[i].style("color", "black");
        }
        this.style("background-color", "#3333cc");
        this.style("color", "white");
        //console.log("Passport changed to: " + passportMode);
  }

  if(lang=="pt"){
        speakButton = createButton("Quero falar");
        speakButton.attribute("title", "[mantenha carregado para gravar a sua voz]");
  } else if (lang=="en"){
        speakButton = createButton("Speak out");
        speakButton.attribute("title", "[press continuously to record your voice]");
  }

  if(!is_chrome) {
        speakButton.hide();
  }

  speakButton.addClass("speak-out-toggle buttonStyle tooltip");
  $('.tooltip').tooltipster({
      theme: 'tooltipster-noir'
    });

  /*
  $('.tooltipstered').tooltipster();
  $('.tooltipstered').tooltipster({
    theme: 'tooltipster-noir'
  });
  */
  speakButton.mousePressed(speakButtonPressed);

    /*
    *
    *     Listen To Me -button
    *
    */

    //continous recognition, BUT, og the recognition results
    //only when the user holds down the mouse
    //and turn off recogniser once the user lets go of the mouse
    //foo.continuous = true;
    //button.mousePressed(listenToMe);
    //setTimeout(foo.start(), 200);
    //foo.onEnd = restart;

    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    var listener = new SpeechRecognition;
    if(lang == "en"){//listener expects to hear english
          listener.lang = 'en-US';
    }
    if(lang == "pt"){//listener expects to hear portuguese
          listener.lang = 'pt-PT';
    } else {//if lang is not either of these, defaults to english:
        listener.lang = 'en-US';
    }
    listener.interimResults = true;
    listener.continuous = true;
    var transcript = '';
    var final_transcript = '';

  var intervalId;
  speakButton.mousePressed( () => {
        $("#speak-out-text").text("");
        $("#speak-out-div").show();
        speakButtonPressed();
        intervalId = setInterval(do_something, 30);
        //console.log("Started listening");
  }).mouseReleased( () => {
        clearInterval(intervalId);
        console.log("Mouse was released");
        listener.stop();
        $("#speak-out-text").text("");
        $("#speak-out-div").hide();
        console.log(" *** Stopping listener");
  });
  speakButton.mouseOut( () => {
        speechToText = "";
        listener.stop();
        clearInterval(intervalId);
        speechToText = "";
        $("#speak-out-div").hide();
        console.log(" *** mouseOut of button");
  });


  listener.onresult = (event) => {
      speechToText = event.results[0][0].transcript;
      $("#speak-out-text").text('"' + speechToText + '"');
      console.log(" *** *** " + speechToText);
      detectSelection(speechToText);
  }

  function detectSelection(speechToText) {

    //A
    if(speechToText.includes("ficar aqui") || speechToText.includes("can only") ){
          console.log("They selected A");
          for (let i = 0; i < passportButtons.length; i++) {
              //passportButtons[i].style(
              passportButtons[i].style("background-color", "white");
              passportButtons[i].style("color", "black");
          }
          passport0.style("background-color", "#3333cc");
          passport0.style("color", "white");
          passportMode = 0;
    }
    //B
    if(speechToText.includes("vizinhos") || speechToText.includes("neighbors")){
          console.log("They selected B");
          for (let i = 0; i < passportButtons.length; i++) {
              passportButtons[i].style("background-color", "white");
              passportButtons[i].style("color", "black");
          }
          passport1.style("background-color", "#3333cc");
          passport1.style("color", "white");
          passportMode = 1;
    }
    //C
    if(speechToText.includes("corredor") || speechToText.includes("bridge")){
          console.log("They selected C");
          for (let i = 0; i < passportButtons.length; i++) {
              passportButtons[i].style("background-color", "white");
              passportButtons[i].style("color", "black");
          }
          passport2.style("background-color", "#3333cc");
          passport2.style("color", "white");
          passportMode = 2;
    }
    //D
    if(speechToText.includes("União") || speechToText.includes("fortaleza")|| speechToText.includes("Fortaleza") || speechToText.includes("união")
   || speechToText.includes("union") || speechToText.includes("fortress")){
          console.log("They selected D");
          for (let i = 0; i < passportButtons.length; i++) {
              passportButtons[i].style("background-color", "white");
              passportButtons[i].style("color", "black");
          }
          passport3.style("background-color", "#3333cc");
          passport3.style("color", "white");
          passportMode = 3;
    }
    //E
    if(speechToText.includes("posso ir") || speechToText.includes("wherever")
   || speechToText.includes("where ever")){
          console.log("They selected E");
          for (let i = 0; i < passportButtons.length; i++) {
              passportButtons[i].style("background-color", "white");
              passportButtons[i].style("color", "black");
          }
          passport4.style("background-color", "#3333cc");
          passport4.style("color", "white");
          passportMode = 4;
    }
    //F
    if(speechToText.includes("Nunca mais posso voltar") || speechToText.includes("never return")){
          console.log("They selected F");
          for (let i = 0; i < passportButtons.length; i++) {
              passportButtons[i].style("background-color", "white");
              passportButtons[i].style("color", "black");
          }
          passport5.style("background-color", "#3333cc");
          passport5.style("color", "white");
          passportMode = 5;
    }


  }

  function do_something() {
        console.log("Mouse is pressed down continually");
  }

  function speakButtonPressed(){
        console.log("Speak out button pressed!");
        /*if(lang == "pt"){
              sqvamtqf.pause();
              sqvamtqf.currentTime = 0;
        } else {*/
              iywstc.pause();
              iywstc.currentTime = 0;
        //}
        listener.start();
        //console.log(" *** Starting listener");
  }

  //make a nicer track for
  function iywstcPlay(){
        console.log("playing iywstcPlay/sqvamtqf!");
        /*if(lang == "pt"){
            sqvamtqf.volume(0.05);
            sqvamtqf.loop = false;
            sqvamtqf.play();
        } else {
        */
            iywstc.volume(0.02);
            iywstc.loop = false;
            iywstc.play();
        //}
  }

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
    //console.log("This is the world: " + theWorld);
    //print(theWorld);

    createTheWorldSites();
    //console.log("These are the worlds' sites:");
    //print(theWorldSites);
    //console.log("This is the site at index 0:" + theWorldSites[1]);
    //console.log("This is the site color at index 0:" + voronoiGetColor(1));
    //console.log("this is the color at index 0 in worldColors" + worldColors[0]);
    //console.log("This is the color at palette index 0:" + palette[1]);
    //console.log("These are the worlds colors:" + worldColors);

    //console.log("This is the length of palette");
    //console.log(palette.length);

    //Get simplified cells without jitter, for more advanced use
    //var normal = voronoiGetCells();
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

    //THESE ARE ALL THE COLORS IN THE WORLD, ordered by cellID = index:
    //worldColors //all colors of world (RGBA), index = cellID
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
    //console.log("World colors are:");
    //console.log(worldColors);

    //make an array with number names

    //make an array with number codes
    //this is an array of just the G values:

    //the G-value of each color just happens to be unique!!!!
    //easiest way is to check against this...
    //AT THIS POINT, we should save the colorID of that color after the G value:
    //I think we don't need the color ID at all.....
    //making an array that has: cellID = index of array, at position 0 we have:
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
    //console.log("Unnecessary variable: worldColorsNumberCodes, the mapping of palette colors (by index) to wolrd colors:");
    //console.log(worldColorsNumberCodes);

    for(var i=0;i<palette.length;i++){
      worldGIndex[i] = worldColors[i][1];
    }

    //Now, what I could already do at this point is: map the
    //different passports into cellIDs:
    //console.log("Logging analogousColors");
    //console.log("Length of analogousColors" + analogousColors.length);

    //console.log("PASSPORT MODE IS:" + passportMode);

    //console.log("This is the monochrome passport written in g values");
    //console.log(worldGIndex);

    for(var i=0; i<analogousColors.length; i++){
      for(var k=0; k<analogousColors[i].length;k++){
        for(var j=0; j<worldGIndex.length; j++){
          if(analogousColors[i][k] == worldGIndex[j]){
            //map g to cellID:
            analogous[i][k] = j;
          }
        }
      }
    }
    //console.log("This is the analogousColors passport written in g values");
    //console.log(analogousColors);
    //console.log("This is the analogous passport written in cellIDs");
    //console.log(analogous);

    for(var i=0; i<complementaryColors.length; i++){
      for(var k=0; k<complementaryColors[i].length;k++){
        for(var j=0; j<worldGIndex.length; j++){
          if(complementaryColors[i][k] == worldGIndex[j]){
            //map g to cellID:
            complementary[i][k] = j;
          }
        }
      }
    }
    //console.log("This is the complementaryColors passport written in g values");
    //console.log(complementaryColors);
    //console.log("This is the complementary passport written in cellIDs");
    //console.log(complementary);



    for(var i=0; i<triadColors.length; i++){
      for(var k=0; k<triadColors[i].length;k++){
        for(var j=0; j<worldGIndex.length; j++){
          if(triadColors[i][k] == worldGIndex[j]){
            //map g to cellID:
            triad[i][k] = j;
          }
        }
      }
    }
    //console.log("This is the triad passport written in g values");
    //console.log(triadColors);
    //console.log("This is the triad passport written in cellIDs");
    //console.log(triad);

    //THIS IS A VERY IMPORTANT VARIABLE:
    //console.log("This is the G index of world colors:");
    //console.log(worldGIndex);

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
//and why does this return false...

function mousePressed(){ //works better across browsers
    /*console.log("Passports div is positioned at:");
    console.log(buttonDiv.position());
    console.log("MouseY is at:");
    console.log(mouseY);
*/  //describe the zone of the A B C D E F buttons, 320 IF THERE ARE 6 BUTTONS
    //then describe the zone of the speak out butotn
    if((mouseX > window.innerWidth-70 && mouseY < 320) || (mouseX > window.innerWidth-190 && mouseY > window.innerHeight-80)){
      //do not create an attractor (in the zone of the buttons)
    } else {
          spawnNewAttractor(mouseX, mouseY);
    }
    return false;
}

/*
function mouseClicked() { //may behave differently across browsers
    spawnNewAttractor(mouseX, mouseY);
    return false;
}
*/

function draw() {



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

  //removes trace of former particles
  clear();
  cursor(ARROW);

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
    } //close for


/*
*
*   Display all particles.
*
*/

for (let i = 0; i < particles.length; i++) {
  particles[i].move();
  //strokeWeight(1);
  particles[i].display();

  if (frameCount >= 21){
      youParticle.giveInformation();
      //console.log("Cell ID that You particle is currently at:" + voronoiGetSite(youParticle.positionVector));
      //var currentCellID = voronoiGetSite(youParticle.positionVector.x, youParticle.positionVector.y);
      //if(currentCellID == undefined){
        //this only evaluates as undefined at the edges... grah!!!
        //at the borders it evaluates as either the one cell or the other..
        //console.log("Current cell is undefined at:" + youParticle.positionVector.x);
        //currentCell = this.cellID;
      //}
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
  }

} //close for

if(showPassportOptions == true){
      //attempt to make instructions pulse, but doesn't work:
      //BECAUSE, while holding the quero falar -button down,
      //the recogniser is listening to you...

      //BETTER IDEA: make the sentence to be spoken out appear when the
      //user hovers over the button:

      //console.log("Text display counter is:" + textDisplayCounter);
      //textDisplayCounter += 1;
      //if(textDisplayCounter > 0 && textDisplayCounter < 150){
            //maybe make this text shimmer/pulse/etc:
            if(lang == "pt"){

                  //textSize(30);
                  //text("Diz assim:", canvasX-450, 0*50+55-25);

                  //HERE: create various sentences that can be randomly chosen!!!
                  //Each will trigger the button!! Because they will all share
                  //a common word:

                  textSize(20);
                  textFont(raumPatron);
                  text(random(passportSentencesPT[passportHover]), canvasX/4, canvasY/2);
                  /*
                  if(passportHover == 0){
                      //problem is that this is being redrawn at every draw() cycle....
                      //passportHover =
                      //show text for this button
                      //text('"Eu só posso ficar aqui"', canvasX/4, canvasY/2);
                      text(random(passportSentencesPT[passportHover]), canvasX/4, canvasY/2);
                      //text('"Eu só preciso de ficar aqui"', canvasX/4, canvasY/2);
                      //text('"Eu só preciso de ficar aqui"', canvasX-400, 0*50+55);
                      //passportHover = this.;
                  }
                  if(passportHover == 1){
                      text('"Os meus vizinhos são como eu"', canvasX/4, canvasY/2);
                      //text('"Os meus vizinhos são como eu"', canvasX-400, 1*50+55);
                  }
                  if(passportHover == 2){
                      text('"Ao fundo do corredor são as ex-colónias"', canvasX/4, canvasY/2);
                      //text('"Ao fundo do corredor são as ex-colónias"', canvasX-400, 2*50+55);
                  }
                  if(passportHover == 3){
                      text('"Eu vivo num união"', canvasX/4, canvasY/2);
                      //text('"Eu vivo num união"', canvasX-400, 3*50+55);
                  }
                  if(passportHover == 4){
                      text('"Eu posso ir onde quero"', canvasX/4, canvasY/2);
                      //text('"Eu posso ir onde quero"', canvasX-400, 4*50+55);

                  }
                  if(passportHover == 5){
                      text('"Nunca mais posso voltar a minha terra"', canvasX/4, canvasY/2);
                      //text('"Nunca mais posso voltar a minha terra"', canvasX-400, 5*50+55);
                  }
                  */


                  //textDisplayCounter += 1;
                  console.log("*** DRAW *** Speak button is pressed!, drawing text.");
                  //textSize(20);
                  //textSize(20);
                  //fill(0, 0, 0, saturation);
                  //  rotate(QUARTER_PI);
                  /*
                  push();
                  translate(canvasX-450, 0*50+47-30);
                  rotate(HALF_PI);
                  text("Diz uma destas frases:", 0,0);
                  //rotate(radians(270));
                  pop();
                  */
                  /*
                  //textAlign(LEFT);
                  textSize(20);
                  //A: monochromatic
                  text('"Eu só preciso de ficar aqui"', canvasX-400, 0*50+55);
                  //B: analogous
                  text('"Os meus vizinhos são tão similares"', canvasX-400, 1*50+55);
                  //C: complementary
                  text('"Ao fundo do corredor são as ex-colónias"', canvasX-400, 2*50+55);
                  //D: triad //south-south, north-north
                  text('"Eu vivo num união"', canvasX-400, 3*50+55);
                  //E: access all areas
                  text('"Eu posso ir onde quero"', canvasX-400, 4*50+55);
                  //F: exile
                  text('"Nunca mais posso voltar a minha terra"', canvasX-400, 5*50+55);
                  */
                //  saturation -= 5;

            } else { //show instructions in english:

                  textSize(20);
                  textFont(raumPatron);
                  text(random(passportSentencesEN[passportHover]), canvasX/4, canvasY/2);
                  /*
                  //A: monochromatic
                  text("'I don't need to go anywhere'", canvasX-400, 0*50+55);
                  //B: analogous
                  text("'My neighbors are so similar to me'", canvasX-400, 1*50+55);
                  //C: complementary
                  text("'There is a bridge to our former colonies'", canvasX-400, 2*50+55);
                  //D: triad //south-south, north-north
                  text("'I live in a union'", canvasX-400, 3*50+55);
                  //E: access all areas
                  text("'I can go whereever I want'", canvasX-400, 4*50+55);
                  //F: exile
                  text("'I can never return'", canvasX-400, 5*50+55);
                  */
            }

    //  } else if (textDisplayCounter > 150){
    //        textDisplayCounter = 0;
    //        saturation = 255;
      //}

}



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



if (frameCount%20 == 0) {
      if(particles.length < 100){//limit the maximum number of particles in the world:
            spawnNewParticles();
      } else {
        console.log(" * -- max number of particles reached --*")
      }
} //close if framecount


if (frameCount%200 == 0) {
            //have to give it an x and a y!
            var randomX = random(0, canvasX);
            var randomY = random(0, canvasY);;
            spawnNewAttractor(randomX, randomY);
            //var randomSite = random(theWorldSites);
            //spawnNewAttractor(randomSite.x, randomSite.y);
} //close if framecount



//Spawn you-particle!
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
  //youParticle.passport = "analogous";
  //youParticle.diameter = 40;
  youParticle.lifespan = 100000;
  //youParticle.color = "white";
  //console.log("Succesfully created you");
  //console.log("You are attracted to:" + youParticle.isAttractedTo);
  //console.log("Your lifespan is:" + youParticle.lifespan);
  //youParticle.giveInformation();
  //console.log("My g is:" + youParticle.g);
}//close if() for spawning youParticle





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
      //console.log("These are the random sites and their colors:");
      //print(randomSites);

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
    //sets a random lifespan
    let lifespan = random(100,500);
    attractors.push(new attractor(quality, attractorX, attractorY, lifespan));
  } //close spawnNewAttractor
