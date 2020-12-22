var passportButtons;
var passportsDiv;

var speakButton;
var speechToText = "";

var iywstc;

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
    console.log("Speech recognition is not supported");
  }

  //iywstc = createAudio('sound/iywstc-XX.mp3');
  iywstc = createAudio('sound/iywstc-III.m4a');
  //var sqvamtqf = createAudio('sound/sqvamtqf-XX.mp3');


  /*
  *
  *     Create speak out button.
  *
  */

  if(lang=="pt"){
    speakButton = createButton("Quero falar");
    speakButton.attribute("title", "[mantenha carregado para gravar a sua voz]");
  } else if (lang=="en"){
    speakButton = createButton("Speak out");
    speakButton.attribute("title", "[press continuously to record your voice]");
  }

  speakButton.mousePressed(speakButtonPressed);
  speakButton.addClass("speak-out-toggle buttonStyle tooltip");

  if(!isSpeechRecognitionSupported){
    speakButton.hide();
  }

  passportsDiv = createDiv();

  /*
  *
  *     Create passport buttons.
  *     TO-DO: use less lines.
  *
  */

  passport0 = createButton("@", 0);//monochromatic = 0
  passport1 = createButton("€", 1);//analogous = 1
  passport2 = createButton(">", 2);//complementary = 2
  passport3 = createButton("§", 3);//triad = 3
  passport4 = createButton("⊙", 4);//all = 4
  passport5 = createButton("!", 5);//exile = 5

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
    if(isSpeechRecognitionSupported){
      passportButtons[i].mousePressed(iywstcPlay); // trigger iywstc if they try to click the passports
    } else {
      passportButtons[i].mousePressed(passportChosen); // for others: allow them to select a passport by clicking
    }
    passportButtons[i].attribute('title', random(passportSentences[i]));
    passportButtons[i].position("right: 40px", i*50+70); // to leave space for raums top tab
    passportButtons[i].id(i); // for mapping between button and passportMode
  }

  function passportChosen() {
    passportMode = this.id();
    for (let i = 0; i < passportButtons.length; i++) {
      passportButtons[i].style("background-color", "white");
      passportButtons[i].style("color", "black");
    }
    this.style("background-color", "#3333cc");
    this.style("color", "white");
  }


  /*
  *
  *     Initialise tooltipster for both sets of buttons.
  *
  */

  $('.speak-out-toggle').tooltipster({
    theme: 'tooltipster-noir',
    delay: 0,
  });

  $('.tooltip-left').tooltipster({
    theme: 'tooltipster-noir',
    position: 'left',
    delay: 0
  });


  /*
  *
  *     Create listener (speech recogniser).
  *
  */

  if (isSpeechRecognitionSupported){
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    var listener = new SpeechRecognition;
    if(lang == "en"){ // listener expects to hear english
      listener.lang = 'en-US';
    }
    if(lang == "pt"){ // listener expects to hear portuguese
      listener.lang = 'pt-PT';
    } else { // if lang is not either of these, defaults to english:
      listener.lang = 'en-US';
    }
    listener.interimResults = true;
    listener.continuous = true;

    speakButton.mousePressed( () => {
      $("#speak-out-text").text("");
      $("#speak-out-div").show();
      speakButtonPressed();
    }).mouseReleased( () => {
      stopAndClear();
    });

    speakButton.mouseOut( () => {
      stopAndClear();
    });

    function stopAndClear(){
      listener.stop();
      $("#speak-out-div").hide();
    }

    function speakButtonPressed(){
      /*if(lang == "pt"){
      sqvamtqf.pause();
      sqvamtqf.currentTime = 0;
    } else {*/
    iywstc.pause();
    iywstc.currentTime = 0;
    //}
    listener.start();
  }

  listener.onresult = (event) => {
    speechToText = event.results[0][0].transcript;
    $("#speak-out-text").text('"' + speechToText + '"');
    //console.log(" *** *** " + speechToText);
    detectSelection(speechToText);
  }


  /*
  *
  *     Detect which button was "pressed".
  *
  */

  function detectSelection(speechToText) {
    //checking against keywords:

    //@
    if(speechToText.includes("ficar aqui")
    || speechToText.includes("irei partir")
    || speechToText.includes("não preciso ir")
    || speechToText.includes("não quero ficar aqui")
    || speechToText.includes("nunca poderei sair")
    || speechToText.includes("can only") ){
      document.getElementById("0").focus();
      passportMode = 0;

      //this can change many times during one utterance, which is fine:
      var newTitle = random(passportSentences[0]);
      $('#0').tooltipster('content', newTitle).tooltipster('show');
    }

    //€
    if(speechToText.includes("somos parecidos")
    || speechToText.includes("não tenho medo")
    || speechToText.includes("integramos algo")
    || speechToText.includes("outros são diferentes")
    || speechToText.includes("quem são os outros")
    || speechToText.includes("não podem entrar")
    || speechToText.includes("neighbors")){
      document.getElementById("1").focus();
      passportMode = 1;

      var newTitle = random(passportSentences[1]);
      $('#1').tooltipster('content', newTitle).tooltipster('show');
    }
    //>
    if(speechToText.includes("o descobrimento")
    || speechToText.includes("a colonização")
    || speechToText.includes("tem o poder")
    || speechToText.includes("quem está mais fraco")
    || speechToText.includes("era a nossa")
    || speechToText.includes("continua a nossa")
    || speechToText.includes("bridge")){
      document.getElementById("2").focus();
      passportMode = 2;

      var newTitle = random(passportSentences[2]);
      $('#2').tooltipster('content', newTitle).tooltipster('show');
    }
    //§
    if(speechToText.includes("fortaleza")
    || speechToText.includes("uma porta")
    || speechToText.includes("a não abro")
    || speechToText.includes("preciso ar")
    || speechToText.includes("respirar cá fora")
    || speechToText.includes("nasci aqui")
    || speechToText.includes("union")
    || speechToText.includes("fortress")){
      document.getElementById("3").focus();
      passportMode = 3;

      var newTitle = random(passportSentences[3]);
      $('#3').tooltipster('content', newTitle).tooltipster('show');
    }
    //⊙
    if(speechToText.includes("posso ir")
    || speechToText.includes("vou ir")
    || speechToText.includes("onde posso")
    || speechToText.includes("posso querer ir")
    || speechToText.includes("que fosse")
    || speechToText.includes("agora vou")
    || speechToText.includes("tenho terra")
    || speechToText.includes("wherever")
    || speechToText.includes("where ever")){
      document.getElementById("4").focus();
      passportMode = 4;

      var newTitle = random(passportSentences[4]);
      $('#4').tooltipster('content', newTitle).tooltipster('show');
    }
    //!
    if(speechToText.includes("muito medo de voltar")
    || speechToText.includes("posso voltar")
    || speechToText.includes("ninguém me espera")
    || speechToText.includes("a minha terra")
    || speechToText.includes("já não é minha")
    || speechToText.includes("já não é minha")
    || speechToText.includes("never return")){
      document.getElementById("5").focus();
      passportMode = 5;

      var newTitle = random(passportSentences[5]);
      $('#5').tooltipster('content', newTitle).tooltipster('show');
    }

  }// close function detectSelection

} // close if ( isSpeechRecognitionSupported


} // close doInterface()


/*
*
*     Play iywstc.
*
*/

function iywstcPlay(){
  //console.log("playing iywstcPlay/sqvamtqf!");
  //TO-DO: create PT version, or not.
  /*if(lang == "pt"){
  sqvamtqf.volume(0.02);
  sqvamtqf.loop = false;
  sqvamtqf.play();
} else {
*/
//iywstc.volume(0.02);
iywstc.volume(0.1);
iywstc.loop = false;
iywstc.play();
//}
} // close function iywstcPlay()
