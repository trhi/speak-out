var passportButtons, speakButton, infoButton, invisibleButton;
var passportsDiv, scoreDiv, speakOutDiv, instructionsDiv;
var score;
var speechToText = "";


/*
*
*     Everything related to the interface.
*
*/

function doInterface(){

  //test whether speech recognition is supported or not:
  var isSpeechRecognitionSupported = false;
  try {
    //disable all of this if window doesn't have webkitSpeechRecognition or SpeechRecognition
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    var listener = new SpeechRecognition;
    isSpeechRecognitionSupported = true;
  } catch (err) {
    console.log("Speech recognition is not supported!!!");
    window.alert("Please view this work in Chrome if you want to speak out");
  }

/*
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    // Great, browser supports the Web Speech API - let's use it
    console.log("Browser supports SpeechRecognition");
  }else {
    console.log("Speech recognition is not supported");
    window.alert("Please view this work in Chrome");
  }
  */

//if(isSpeechRecognitionSupported){

  //iywstc = createAudio('sound/iywstc-XX.mp3');
  //iywstc = createAudio('sound/iywstc-III.m4a');
  //var sqvamtqf = createAudio('sound/sqvamtqf-XX.mp3');

  /*
  *
  *     Create score-div
  *
  */

  scoreDiv = createDiv();
  scoreDiv.addClass('score-box tooltip-top tooltip');
  scoreDiv.id('score-div'); // for mapping between button and passportMode
  //scoreDiv.attribute("title", '[fulfil the needs and desires of _You_]');
  //set it elsewhere in order to include the <em> tags around You!
  //scoreDiv text content is updated at each draw() cycle :) in world.js

  score = createP();
  score.id('score'); // for mapping between button and passportMode
  score.parent(scoreDiv);

  /*
  *
  *     Create speak-out-div
  *
  */

  speakOutDiv = createDiv();
  speakOutDiv.addClass('speak-out-box');
  speakOutDiv.id('speak-out-div');
  $("#speak-out-div").hide();

    /*
    *
    *     Create instructions-div:
    *     this is where the instructions are displayed
    *     it is a child of the speak-out-div
    *     because when not in use for displaying instructions,
    *     then the transcript of speech is displayed here.
    *
    *
    */

  instructionsDiv = createDiv();
  speakOutDiv.child(instructionsDiv);
  instructionsDiv.id('instructions-div');
  //$("#speak-out-div").hide();


  speakOutText = createP();
  speakOutText.id('speak-out-text');
  speakOutText.parent(speakOutDiv);

  /*
  *
  *     Create speak out and info buttons.
  *
  */

  //initialise all buttons and titles in english:
  passportsDiv = createDiv();
  passportsDiv.addClass('passportsDiv tooltip tooltip-left');

  passportInstructions = createButton("↡");
  passportInstructions.attribute('title', texts[lang].instructions.passportInstructionsHTML);
  passportInstructions.id("passportInstructions");
  passportInstructions.addClass("hiddeninfo buttonStyle toggle passports-toggle tooltip tooltip-left");
  passportInstructions.position("right: 40px", 'top:10px');
  passportInstructions.parent(passportsDiv);
  passportInstructions.mousePressed( () => changeTitle([0,1,2,3,4,5]) );
  //passportInstructions.mousePressed( () => changeTitle() );
  //ABOVE: this just changes the line of the poem of the current passport mode

  infoButton = createButton("i");
  infoButton.id("i-button");
  infoButton.addClass("info-toggle toggle buttonStyle tooltip")
  infoButton.attribute("title", texts[lang].instructions.iButtonTITLE);
  //infoButton.mousePressed(infoButtonPressed);

  speakButton = createButton(texts[lang].instructions.speakButtonHTML);
  speakButton.attribute("title", texts[lang].instructions.speakButtonTITLE);
  speakButton.id('speak');
  speakButton.addClass("speak-out-toggle buttonStyle tooltip");

  if(isSpeechRecognitionSupported){
    speakButton.mousePressed(speakButtonPressed);
  } else if (!isSpeechRecognitionSupported){ //or simply else:
    speakButton.attribute("title", texts[lang].instructions.speakButtonNoVUI);
    speakButton.mousePressed(() => console.log("do nothing!"));
    //$("#speak").text(" - ");
    //$("#speak").prop("disabled",true);
    //speakButton.disabled = true;
  }

/*
  if(lang=="pt"){
    speakButton = createButton("Quero falar");
    speakButton.attribute("title", "[mantenha carregado para gravar a sua voz]");
    infoButton.attribute("title", "[instruções]");
  }*/


  /*
  *
  *     Create passport buttons.
  *     TO-DO: use less lines.
  *
  */

  passport0 = createButton("@", 0).class("passportButton");//monochromatic = 0
  passport1 = createButton("€", 1).class("passportButton");//analogous = 1
  passport2 = createButton(">", 2).class("passportButton");//complementary = 2
  passport3 = createButton("§", 3).class("passportButton");//triad = 3
  passport4 = createButton("⊙", 4).class("passportButton");//all = 4
  passport4.addClass('passports-toggle-focus');
  passport5 = createButton("!", 5).class("passportButton");//exile = 5
  passportButtons = selectAll(".passportButton");

  for (let i = 0; i < passportButtons.length; i++) {
    passportButtons[i].parent(passportsDiv);
    passportButtons[i].addClass("buttonStyle toggle passports-toggle tooltip tooltip-left");
    if(isSpeechRecognitionSupported || !isSpeechRecognitionSupported){
      passportButtons[i].mousePressed(iywstcPlay); // trigger iywstc if they try to click the passports
      //passportButtons[i].mousePressed( () => changeTitle( [i] ) );
      // ABOVE: scramble new line, but this didnt work very well because
      //  the title disappeared way too quickly!
    } else {
      //passportButtons[i].mousePressed(passportChosen); // for others: allow them to select a passport by clicking
    }
    passportButtons[i].attribute('title', '"' + random(passportSentences[i]) + '"'); //TODO: substitute passportSentences for texts... etc?
    passportButtons[i].position("right: 40px", i*50+70); // to leave space for raums top tab
    passportButtons[i].id(i); // for mapping between button and passportMode
  }


  /*
  *
  *     Define infobutton
  *
  */

$("#instructions-div").html( texts.instructionsDIV ); //initialise buttons and instructionsP under (i)
$("#instructionsP").html( texts[lang].instructions.instructionsP ); //add instructionsP in lang

var langButtons = selectAll(".lang-button");
$("#lang-en").addClass("lang-button-selected"); //initialise in english

$("#x-button").click( () =>  {
   $("#instructions-div").hide();
    $("#speak-out-div").hide();
  });

/*
/
/     Switch language:
/
/
*/

  $("#lang-en").click( () =>  {
    lang = "en";
    updateLanguage();
  });

    //update language to fi:
  $("#lang-fi").click( () =>  {
    lang = "fi";
    updateLanguage();
  });

    //update language to pt:
  $("#lang-pt").click( () =>  {
    lang = "pt";
    updateLanguage();
  });

    //update language to de:
    $("#lang-de").click( () =>  {
      lang = "de";
      updateLanguage();
    });

      function updateLanguage(){

        for(let i=0; i < langButtons.length; i++){//dehighlight all lang buttons:
          langButtons[i].removeClass("lang-button-selected");
        }
        $("#lang-" + lang).addClass("lang-button-selected"); //highlight selected lang button

        for(let i=1; i < particles.length; i++){//at 0 we have the you particle!
          particles[i].infoText = random(texts[lang].particle.someoneElse) + ' (' + texts[lang].attractor[particles[i].isAttractedTo] + ')';
        }

        $("#passportInstructions").tooltipster('content', texts[lang].instructions.passportInstructionsHTML );
        $("#i-button").tooltipster('content', texts[lang].instructions.iButtonTITLE );
        $("#speak").tooltipster('content', texts[lang].instructions.speakButtonTITLE );
        $('.tooltip-top').tooltipster('content', texts[lang].instructions.scoreTITLE);
        speakButton.html(texts[lang].instructions.speakButtonHTML);
        if (!isSpeechRecognitionSupported){ //or simply else:
          speakButton.attribute("title", texts[lang].instructions.speakButtonNoVUI);
        }

        //instruction text:
        $("#instructionsP").html( texts[lang].instructions.instructionsP );

        //poems:
        passportSentences = [];
        passportSentences.push(
          texts[lang].poems.monochrome.lines,
          texts[lang].poems.analogous.lines,
          texts[lang].poems.complementary.lines,
          texts[lang].poems.triad.lines,
          texts[lang].poems.rainbow.lines,
          texts[lang].poems.cloud.lines
        );
        changeTitle([0,1,2,3,4,5]);//change title of all passports
      }


  infoButton.mousePressed( () => {
    $("#instructions-div").show();
    $("#speak-out-div").show();
  }).mouseOut( () => {//do nothing atm
  });



  /*
  *
  *     Initialise tooltipster for both sets of buttons.
  *
  */



  $('.speak-out-toggle').tooltipster({
    theme: 'tooltipster-noir',
    delay: 0,
  });

  $('.info-toggle').tooltipster({
    theme: 'tooltipster-noir',
    delay: 0,
  });

  $('.tooltip-left').tooltipster({
    theme: 'tooltipster-noir',
    position: 'left',
    autoClose: 'true',
    delay: 200,
    animation: 'fade',
    timer: 5000
  });

  /*$('#score-div').tooltipster({
            });
*/

  $('.tooltip-bottom').tooltipster({
    theme: 'tooltipster-noir',
    position: 'bottom',
    delay: 0
  });


  $('.tooltip-top').tooltipster({
    //content: $('<span>[fulfil the needs and desires of <em>You</em>]</span>'),
    content: texts[lang].instructions.scoreTITLE,
    theme: 'tooltipster-noir',
    position: 'top',
    delay: 0,
    animation: 'fade',
    speed: 100

  });

  function stopAndClear(){
    if(isSpeechRecognitionSupported){
      listener.stop();
    }
    //if displaying instructions, do not hide the div:
    if( $("#instructions-div").is(':visible') ){
      //console.log("instructionsDiv is visible");
    } else {
      $("#speak-out-text").text("");
      $("#speak-out-div").hide();
    }
  }

  /*
  *
  *     Create listener (speech recogniser).
  *
  */

  if (isSpeechRecognitionSupported){
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    var listener = new SpeechRecognition;
    listener.lang = 'en-US'; //set to english by default
    listener.interimResults = true;
    listener.continuous = true;

    speakButton.mousePressed( () => {

      listener.lang = texts[lang].listenerLANG;

      $("#speak-out-text").text("");
      $("#speak-out-div").show();
      speakButtonPressed();
    }).mouseReleased( () => {
      stopAndClear();
    });

    speakButton.mouseOut( () => {
      stopAndClear();
    });

    function speakButtonPressed(){
      instructionsDiv.hide();
      iywstc.pause();
      iywstc.currentTime = 0;
      listener.start();
  }

  listener.onresult = (event) => {
    speechToText = event.results[0][0].transcript;
    $("#speak-out-text").text('"' + speechToText + '"');
    detectSelection(speechToText);
  }

  /*
  *
  *     Detect which button was "pressed".
  *
  */

  function detectSelection(speechToText) {

    var found = [
      speechToText.match(texts[lang].poems.monochrome.regex),
      speechToText.match(texts[lang].poems.analogous.regex),
      speechToText.match(texts[lang].poems.complementary.regex),
      speechToText.match(texts[lang].poems.triad.regex),
      rainbowText = speechToText.match(texts[lang].poems.rainbow.regex),
      cloudText = speechToText.match(texts[lang].poems.cloud.regex)
    ];

    for(let i=0; i<found.length; i++){
      if( found[i] ){ //if there is a match for one of the lines of the six poems
        //document.getElementById(i).focus(); //select that passport
        togglePassports(i);
      }
    }

  }// close function detectSelection

} // close if ( isSpeechRecognitionSupported

} // close doInterface()

function togglePassports(passport){
  for(let j=0; j < passportButtons.length; j++){
    $("#" + j).removeClass('passports-toggle-focus')
  }
  document.getElementById(passport).classList.add('passports-toggle-focus');
  passportMode = passport;
  changeTitle(); //and display a new line from the poem
}

/*
*
*     Change to new line of poem
*
*/

//TODO: make this function such that we can pass it all the passports ==
//then it updates the title of all (when language is changed)
//OR: if we pass it just one passport, then it just updates that button title:
//if (passports) then changes all titles (ie. when language is changed)
//if not, changes the title of the current passport mode
function changeTitle(passports){ //(expects an array)
  if (passports){ //if it is passed a parameter:
    //change title of all passports that are passed to it:
    for(let i=0; i<passports.length; i++){
      $('#' + passports[i].toString()).tooltipster('content', '"' + random( passportSentences[ passports[i] ]) + '"').tooltipster('show');
    }
  } else { //if not, change title of the passport currently in vigor:
    $('#' + passportMode.toString()).tooltipster('content', '"' + random(passportSentences[ passportMode ]) + '"').tooltipster('show');
  }
}

/*
*
*     Play iywstc.
*
*/

function iywstcPlay(){
    iywstc.volume(0.1);
    iywstc.loop = false;
    iywstc.play();
} // close function iywstcPlay()
