var texts = {
  "maps": {
    "gradient" : function () {
      for (let i = 0; i < zones; i++) {
        if(i == 11){
          randomSites.push(
            [-2 + i*canvasX/12,
              -2 + i*canvasY/12,
              texts.palettesAndPassports.palette[i] ]
          );
        } else {
          randomSites.push(
            [20 + i*canvasX/12,
              20+ i*canvasY/12,
              texts.palettesAndPassports.palette[i] ]);
          }}},//end "gradient"
      "leftBunch" : function () {
        for (let i = 0; i < zones; i++) {
        randomSites.push(
          [random(1, canvasX/2),
            random(1, canvasY/2),
            texts.palettesAndPassports.palette[i] ]);
          }},//end "leftBunch"
        "twoSpaces" : function () {
          let twoSpaces = [ //
              [ (canvasX/7), canvasY/2],
              [ (2*canvasX/7), canvasY/2],
              [ (2.5*canvasX/7), canvasY/2],
              [ (3*canvasX/7), canvasY/2],
              [canvasX/2, canvasY/2], //RED
              [ (canvasX/2 + 1/9*canvasX), canvasY/2], //REDPURPLE
              [ (canvasX/2 + 2/9*canvasX), canvasY/2], //PURPLE
              [ (canvasX/2 + 4/9*canvasX), (canvasY/2) ], //BLUERED
              [ (canvasX/2 + 2/9*canvasX), (canvasY/2 + 1/3*canvasY) ], //BLUE
              [ (canvasX/2 + 1/100*canvasX), (canvasY/2 - 1/3*canvasY) ], //BLUEGREEN
              [ (canvasX/2 + 2/9*canvasX), (canvasY/2 - 1/3*canvasY) ],
              [ (canvasX/2 + 1/100*canvasX), (canvasY/2 + 1/3*canvasY) ] //GREENYELLOW
          ];
          for (var i=0; i<zones; i++){
              randomSites.push(
                [ twoSpaces[i][0],
                  twoSpaces[i][1],
                  texts.palettesAndPassports.palette[i] ]);
          }//end for
        },//end "twoSpaces"
        "random" : function () {
          for (var i=0; i<zones; i++){
            randomSites.push(
              [random(drawingBorderX, canvasX),
                random(drawingBorderY, canvasY),
                texts.palettesAndPassports.palette[i]]);
          }
        } //end "random"
      },
  "palettesAndPassports" : {
    "palette" : [
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
    ],
    // analogous, complementary and triad represent hard-coded rules about what colors can go where
  "complementary" : [
    [223, 36, 181, 54],
    [181, 54, 223, 36],
    [135, 120, 97, 168],
    [97, 168, 135, 120],
    [39, 142, 2, 186],
    [2, 186, 39, 142],
    [36, 223, 181, 54],
    [54, 181, 36, 223],
    [120, 135, 168, 97],
    [168, 97, 120, 135],
    [142, 39, 186, 2],
    [186, 2, 186, 2]
  ],
  "analogous" : [
    [223, 97, 135, 181, 39, 2],
    [181, 223, 135, 97, 39, 2],
    [135, 223, 97, 181, 39, 2],
    [97, 223, 135, 181, 39, 2],
    [39, 223, 135, 181, 97, 2],
    [2, 223, 135, 181, 39, 97],
    [36, 54, 120, 168, 142, 186],
    [54, 36, 120, 168, 142, 186],
    [120, 54, 36, 168, 142, 186],
    [168, 54, 120, 36, 142, 186],
    [142, 54, 120, 168, 36, 186],
    [186, 54, 120, 168, 142, 36]
  ],
  "triad" : [
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
  ]
  },
  "instructionsDIV": "<button style='float:right; margin-top: -25px; margin-right: -15px;' id='x-button' class='lang-button'>x</button>" //x-button
+ "<p id='instructionsP'></p>" //instructions in different languages
+ "<button id='lang-en' class='lang-button'>en</button>" + //language buttons
"<span>&nbsp&nbsp</span>" +
"<button id='lang-fi' class='lang-button'>fi</button>" +
"<span>&nbsp&nbsp</span>" +
"<button id='lang-pt' class='lang-button'>pt</button>" +
"<span>&nbsp&nbsp</span>" +
"<button id='lang-de' class='lang-button'>de</button>",
  "en":
  {
    "poems":
    { "monochrome":
      {
        "regex": /I want to stay here|or maybe that is my only choice|I will never leave|Because I do not need to go|I do not want to stay here|but I can never leave/ig,
        "lines":
        ['I want to stay here',
        'or maybe that is my only choice?',
        'I will never leave',
        'because I do not need to go',
        'I do not want to stay here',
        'but I can never leave']
      },
      "analogous":
      {
        "regex": /we are very similar|I am not scared|we are part of something greater|the others are different|who are the others|they cannot enter/ig,
        "lines":
        ['we are very similar',
        'I am not scared',
        'we are part of something greater',
        'the others are different',
        'who are the others?',
        'they cannot enter']
      },
      "complementary":
      {
        "regex": /what is the difference between exploration and colonization|only one of us is in a position of power|what is the difference between colonization and exploration|it is easy to conquer the|this was our land|this land continues to be ours/ig,
        "lines":
        ['what is the difference between exploration and colonization?',
        'only one of us is in a position of power',
        'what is the difference between colonization and exploration?',
        'it is easy to conquer the weak',
        'this was our land',
        'this land continues to be ours']
      },
      "triad":
      {
        "regex": /I live in a fortress|I see a door|I do not open the door|I need air|I try to breathe out here|I was born here/ig,
        "lines":
        ['I live in a fortress',
        'I see a door',
        'I do not open the door',
        'I need air',
        'I try to breathe out here',
        'I was born here']
      },
      "rainbow":
      {
        "regex": /I can go where I want|I will go|I may want to go|I can go wherever I want|I will go now|I have no land/ig,
        "lines":
        ['I can go where I want',
        'I will go',
        'I may want to go',
        'I can go whereever I want',
        'I will go now',
        'I have no land']
      },
      "cloud":
      {
        "regex": /I am scared of returning|I can never return|nobody is waiting for me|I am no longer wanted|I long to linger|I no longer belong/ig,
        "lines":
        ['I am scared of returning',
        'I can never return',
        'nobody is waiting for me',
        'I am no longer wanted',
        'I long to linger',
        'I no longer belong']
        }
      },
      "instructions":
      {
        "instructionsP" :
          "Move <em>You</em>  with the arrow keys on the keyboard [ ◄ ▲ ▼ ►]"
          + "<br><br>"
          + "Increase your score by moving <em>You</em> to the large circles"
          + "<br><br>"
          + "<em>Speak out</em> to change the rules"
          + "<br><br>"
          + "Where can <em>You</em> move?"
          + "<br><br>"
          + "And what are <em>You</em> looking for?"
          + "<br><br>",
        "passportInstructionsHTML" : "[speak these sentences to change the rules, click to change the sentences]",
        "speakButtonHTML" : "Speak out",
        "speakButtonTITLE" : "[press continuously, speak the sentences ↟, observe]",
        "speakButtonNoVUI" : "[view work in Chrome to speak out]",
        "iButtonTITLE" : "[instructions]",
        "scoreHTML" : 'Score: ',
        "scoreTITLE" : $('<span>[fulfil the needs and desires of <em>You</em>]</span>')
      },
      "listenerLANG" : "en-US",
      "particle":
        {"you" : "You",
        "someoneElse" : ["Someone else", "Another person", "They"]
      },
      "attractor" :
        {"work" : "work",
         "food" : "food",
         "love" : "love",
         "more love" : "more love",
         "even more love" : "even more love",
         "freedom" : "freedom",
         "a way out" : "a way out",
         "time" : "time",
          "a hug" : "a hug",
          "sleep" : "sleep",
          "some rest" : "some rest",
          "deep sleep" : "deep sleep",
          "a glass of water" : "a glass of water",
          "a timeout" : "a timeout",
          "entertainment" : "entertainment",
          "peace of mind" : "peace of mind",
          "warmth" : "warmth",
          "a success" : "a success",
          "a coffee" : "a coffee",
          "a bite to eat" : "a bite to eat",
          "a painkiller" : "a painkiller",
          "a good thing" : "a good thing" ,
          "yourself" : "yourself",
          "the impossible" : "the impossible",
          "myself" : "myself",
          "my true self" : "my true self",
          "my retirement" : "my retirement",
          "opportunity" : "opportunity",
          "health" : "health",
          "money" : "money",
          "lots of money" : "lots of money",
          "some money" : "some money",
          "a coin" : "a coin",
          "a home" : "a home",
          "a house" : "a house",
          "a shelter" : "a shelter",
          "a roof over my head" : "a roof over my head",
          "a piece of land" : "a piece of land",
          "a job" : "a job",
          "a clothing store" : "a clothing store",
          "a park" : "a park",
          "study" : "study",
          "dignity" : "dignity",
          "to do what I love" : "to do what I love",
          "to love what I do" : "to love what I do",
          "a place to breathe" : "a place to breathe",
          "a solution" : "a solution",
          "peace" : "peace",
          "some time for myself" : "some time for myself",
          "some time" : "some time",
          "exploration" : "exploration",
          "a mountain" : "a mountain",
          "a better life" : "a better life",
          "a flower shop" : "a flower shop",
          "a supermarket" : "a supermarket",
          "ikea" : "ikea",
          "coca cola dreams" : "coca cola dreams"
        }
    },
"fi":
    {
      "poems":
      { "monochrome":
        {
          "regex": /tahdon täältä pois|päästäkää minut pois|miksi en voi lähteä|en tahdo mennä minnekään|minun on hyvä olla täällä|olenko vapaa valitsemaan/ig,
          "lines":
          ['tahdon täältä pois',
          'päästäkää minut pois',
          'miksi en voi lähteä?',
          'en tahdo mennä minnekään',
          'minun on hyvä olla täällä',
          'olenko vapaa valitsemaan?']
        },
        "analogous":
        {
          "regex": /olemme samankaltaisia|en pelkää|olemme osa jotakin suurempaa|ne muut ovat erilaisia|keitä ne muut ovat|emme päästä heitä sisään/ig,
          "lines":
          ['olemme samankaltaisia',
          'en pelkää',
          'olemme osa jotakin suurempaa',
          'ne muut ovat erilaisia',
          'keitä ne muut ovat?',
          'emme päästä heitä sisään']
        },
        "complementary":
        {
          "regex": /mitä eroa on tutkimusmatkailulla ja kolonisaatiolla|vain yhdellä meistä on valta-asema|mitä eroa on kolonisaatiolla ja tutkimusmatkailulla|on helppoa valloittaa itseään heikompi|tämä oli meidän maa|tämä maa on edelleen meidän/ig,
          "lines":
          ['mitä eroa on tutkimusmatkailulla ja kolonisaatiolla?',
          'vain yhdellä meistä on valta-asema',
          'mitä eroa on kolonisaatiolla ja tutkimusmatkailulla?',
          'on helppoa valloittaa itseään heikompi',
          'tämä oli meidän maa',
          'tämä maa on edelleen meidän']
        },
        "triad":
        {
          "regex": /elän linnoituksessa|näen oven|en avaa ovea|tarvitsen ilmaa|yritän hengittää|synnyin täällä/ig,
          "lines":
          ['elän linnoituksessa',
          'näen oven',
          'en avaa ovea',
          'tarvitsen ilmaa',
          'yritän hengittää',
          'synnyin täällä']
        },
        "rainbow":
        {
          "regex": /voin mennä minne tahdon|menen|taidan mennä|voin mennä minne vaan|menen nyt|minulla ei ole maata/ig,
          "lines":
          ['voin mennä minne tahdon',
          'menen',
          'taidan mennä',
          'voin mennä minne vaan',
          'menen nyt',
          'minulla ei ole maata']
        },
        "cloud":
        {
          "regex": /pelkään paluuta|en voi palata|kukaan ei odota minua enää|he eivät halua minua enää sinne|tahtoisin jäädä|en enää kuulu sinne/ig,
          "lines":
          ['pelkään paluuta',
          'en voi palata',
          'kukaan ei odota minua enää',
          'he eivät halua minua enää sinne',
          'tahtoisin jäädä',
          'en enää kuulu sinne']
          }
        },
        "instructions":
          {"instructionsP" :
          "<em>Sinä</em> liikut näppäimistön nuolinäppäimien avulla: [ ◄ ▲ ▼ ►]"
          + "<br><br>"
          + "Saat pisteitä kun tavoitat ison ympyrän (tavoitteesi)"
          + "<br><br>"
          + "<em>Puhu</em> ja muuta sääntöjä"
          + "<br><br>"
          + "Minne <em>Sinä</em> voit mennä?"
          + "<br><br>"
          + "Ja mitä <em>Sinä</em> etsit?"
          + "<br><br>",
          "passportInstructionsHTML" : "[puhu nämä lauseet muuttaaksesi säännöt, paina muuttaaksesi lauseet]",
          "speakButtonHTML" : "Tahdon puhua",
          "speakButtonTITLE" : "[pidä nappia pohjassa, lausu lauseet ↟, tarkkaile]",
          "speakButtonNoVUI" : "[käytä Chromea jos haluat puhua]",
          "iButtonTITLE" : "[ohjeet]",
          "scoreHTML" : 'Pisteet: ',
          "scoreTITLE" : $('<span>[toteuta tavoitteesi]</span>')
        },
        "listenerLANG" : "fi-FI",
        "particle":
          {"you" : "Sinä",
          "someoneElse" : ["Joku muu", "Hän", "Toinen ihminen", "Tuntematon ihminen"]
        },
        "attractor" :
        {"work" : "työ",
         "food" : "ruokaa",
         "love" : "rakkautta",
         "more love" : "lisää rakkautta",
         "even more love" : "enemmän rakkautta",
         "freedom" : "vapautta",
         "a way out" : "pakotie",
         "time" : "aikaa",
        "a hug" : "hali",
        "sleep" : "unta",
        "some rest" : "lepoa",
        "deep sleep" : "syvä uni",
        "a glass of water" : "lasi vettä",
        "a timeout" : "tauko",
        "entertainment" : "viihdettä",
        "peace of mind" : "mielenrauhaa",
        "warmth" : "lämpöä",
        "a success" : "onnistuminen",
        "a coffee" : "kahvi",
        "a bite to eat" : "purtavaa",
        "a painkiller" : "särkylääke",
        "a flower shop" : "kukkakauppa",
        }
      },
  "pt":
      {
        "poems":
        { "monochrome":
          {
            "regex": /quero ficar aqui|só posso ficar aqui|nunca irei partir|porque não preciso ir|não quero ficar aqui|mas nunca poderei sair/ig,
            "lines":
            ['quero ficar aqui',
            'só posso ficar aqui',
            'nunca irei partir',
            'porque não preciso ir',
            'não quero ficar aqui',
            'mas nunca poderei sair']
          },
          "analogous":
          {
            "regex": /somos parecidos|não tenho medo|integramos algo maior|os outros são diferentes|quem são os outros|felizmente não podem entrar/ig,
            "lines":
            ['somos parecidos',
            'não tenho medo',
            'integramos algo maior',
            'os outros são diferentes',
            'quem são os outros?',
            'felizmente não podem entrar']
          },
          "complementary":
          {
            "regex": /qual a diferença entre o descobrimento e a colonização|só um de nós é que tem o poder|qual a diferença entre a colonização e o descobrimento|é fácil conquistar quem está mais fraco|esta terra era a nossa|esta terra continua a nossa/ig,
            "lines":
            ['qual a diferença entre o descobrimento e a colonização?',
            'só um de nós é que tem o poder',
            'qual a diferença entre a colonização e o descobrimento?',
            'é fácil conquistar quem está mais fraco',
            'esta terra era a nossa',
            'esta terra continua a nossa']
          },
          "triad":
          {
            "regex": /vivo numa fortaleza|vejo uma porta|mas a não abro|preciso ar|tento respirar cá fora|nasci aqui/ig,
            "lines":
            ['vivo numa fortaleza',
            'vejo uma porta',
            'mas a não abro',
            'preciso ar',
            'tento respirar cá fora',
            'nasci aqui']
          },
          "rainbow":
          {
            "regex": /posso ir onde quero|vou ir|poderei querer ir|posso ir onde quer que fosse|agora vou|não tenho terra/ig,
            "lines":
            ['posso ir onde quero',
            'vou ir',
            'poderei querer ir',
            'posso ir onde quer que fosse',
            'agora vou',
            'não tenho terra']
          },
          "cloud":
          {
            "regex": /tenho muito medo de voltar|nunca mais posso voltar|ninguém me espera|a minha terra já não é minha|tenho saudades da minha terra|nunca mais posso voltar à minha terra/ig,
            "lines":
            ['tenho muito medo de voltar',
            'nunca mais posso voltar',
            'ninguém me espera',
            'a minha terra já não é minha',
            'tenho saudades da minha terra',
            'nunca mais posso voltar à minha terra']
            }
          },
          "instructions":
            {"instructionsP" :
            "Mexe <em>Tu</em> com as setas do teclado: [ ◄ ▲ ▼ ►]"
            + "<br><br>"
            + "Ganhas pontos ao alcançares os teus objetivos (círculos grandes)"
            + "<br><br>"
            + "<em>Fala</em> e muda as regras"
            + "<br><br>"
            + "Onde é que <em>Tu</em> consegues ir?"
            + "<br><br>"
            + "O que é que estás a procura?"
            + "<br><br>",
          "passportInstructionsHTML" : "[fala estas frases para mudar as regras, carrega para mudar as frases]",
          "speakButtonHTML" : "Quero falar",
          "speakButtonTITLE" : "[mantenha pressionado, fala as frases ↟, observa]",
          "speakButtonNoVUI" : "[abre com Chrome para falar]",
          "iButtonTITLE" : "[instruções]",
          "scoreHTML" : 'Pontos: ',
          "scoreTITLE" : $('<span>[alcance os teus objetivos]</span>')
          },
          "listenerLANG" : "pt-PT",
          "particle":
            {"you" : "Tu",
            "someoneElse" : ["Um Outro", "alguém", "outra pessoa"]
          },
          "attractor" :
          {"work" : "trabalho",
           "food" : "comida",
           "love" : "amor",
           "more love" : "mais amor",
           "even more love" : "ainda mais amor",
           "freedom" : "liberdade",
           "a way out" : "uma fuga",
           "time" : "tempo",
          "a hug" : "um abraço",
          "sleep" : "sono",
          "some rest" : "descanso",
          "deep sleep" : "um sono profundo",
          "a glass of water" : "um copo com água",
          "a timeout" : "uma pausa",
          "entertainment" : "entretenimento",
          "peace of mind" : "tranquilidade",
          "warmth" : "calor",
          "a success" : "um sucesso",
          "a coffee" : "um café",
          "a bite to eat" : "algo para comer",
          "a painkiller" : "um analgésico",
          "a flower shop" : "uma florista",
          }
        },
    "de":
        {
          "poems":
          { "monochrome":
            {
              "regex": /ich möchte hier bleiben|oder vielleicht habe ich einfach keine Wahl|ich werde niemals weggehen|weil ich nicht weg muss|ich will nicht hier bleiben|aber ich kann nicht weg/ig,
              "lines":
              ['ich möchte hier bleiben',
              'oder vielleicht habe ich einfach keine Wahl?',
              'ich werde niemals weggehen',
              'weil ich nicht weg muss',
              'ich will nicht hier bleiben',
              'aber ich kann nicht weg']
            },
            "analogous":
            {
              "regex": /wir sind sehr ähnlich|ich habe keine Angst|wir sind Teil von etwas Größerem|die Anderen sind anders|wer sind die Anderen|sie können nicht rein/ig,
              "lines":
              ['wir sind sehr ähnlich',
              'ich habe keine Angst',
              'wir sind Teil von etwas Größerem',
              'die Anderen sind anders',
              'wer sind die Anderen?',
              'sie können nicht rein']
            },
            "complementary":
            {
              "regex": /was ist der Unterschied zwischen Erkundung und Kolonisation|nur einer von uns ist in einer Machtposition|was ist der Unterschied zwischen Kolonisation und Erkundung|es ist leicht, die Schwachen zu erobern|dieses Land hat uns gehört|dieses Land gehört weiterhin uns/ig,
              "lines":
              ['was ist der Unterschied zwischen Erkundung und Kolonisation?',
              'nur einer von uns ist in einer Machtposition',
              'was ist der Unterschied zwischen Kolonisation und Erkundung?',
              'es ist leicht, die Schwachen zu erobern',
              'dieses Land hat uns gehört',
              'dieses Land gehört weiterhin uns']
            },
            "triad":
            {
              "regex": /Ich wohne in einer Festung|ich sehe eine Tür|ich öffne die Tür nicht|ich brauche Luft|ich versuche, hier draußen zu atmen|ich bin hier geboren/ig,
              "lines":
              ['Ich wohne in einer Festung',
              'ich sehe eine Tür',
              'ich öffne die Tür nicht',
              'ich brauche Luft',
              'ich versuche, hier draußen zu atmen',
              'ich bin hier geboren']
            },
            "rainbow":
            {
              "regex": /ich kann überhall hingehen|ich gehe|ich möchte vielleicht gehen|ich kann gehen, wohin ich will|ich gehe jetzt|ich habe kein Land/ig,
              "lines":
              ['ich kann überhall hingehen',
              'ich gehe',
              'ich möchte vielleicht gehen',
              'ich kann gehen, wohin ich will',
              'ich gehe jetzt',
              'ich habe kein Land']
            },
            "cloud":
            {
              "regex": /ich habe Angst vor der Rückkehr|ich kann niemals zurück|niemand wartet auf mich|ich bin nicht mehr erwünscht|ich möchte da hin|ich gehöre nicht mehr dahin/ig,
              "lines":
              ['ich habe Angst vor der Rückkehr',
              'ich kann niemals zurück',
              'niemand wartet auf mich',
              'ich bin nicht mehr erwünscht',
              'ich möchte da hin',
              'ich gehöre nicht mehr dahin']
              }
            },
            "instructions":
              {"instructionsP" :
              "Bewege den <em>Du</em> mit den Pfeiltasten am Tastatur: [ ◄ ▲ ▼ ►]"
              + "<br><br>"
              + "bewege den <em>Du</em> zu Lebensziele (große Kreise) um Punkte zu gewinnen "
              + "<br><br>"
              + "<em>Spreche</em> um die Regeln zu ändern"
              + "<br><br>"
              + "Wo kann der <em>Du</em> hin?"
              + "<br><br>"
              + "Was such der <em>Du</em> im Leben?"
              + "<br><br>",
            "passportInstructionsHTML" : "[Sprich diese Sätze um die Regeln zu ändern, klicke um die Sätze zu ändern]",
            "speakButtonHTML" : "Ich möchte sprechen",
            "speakButtonTITLE" : "[halte diese Taste gedrückt, sprich die Sätze ↟, beobachte]",
            "speakButtonNoVUI" : "[benutze Chrome um sprechen zu können]",
            "iButtonTITLE" : "[Anleitung]",
            "scoreHTML" : 'Punkte: ',
            "scoreTITLE" : $('<span>[erfülle die Lebensziele des <em>Du</em>]</span>')
            },
            "listenerLANG" : "de-DE",
            "particle":
              {"you" : "Du",
              "someoneElse" : ["Der Andere", "Jemanden anders", "die Person"]
            },
            "attractor" :
            {"work" : "Arbeit",
             "food" : "Essen",
             "love" : "Liebe",
             "more love" : "mehr Liebe",
             "even more love" : "noch mehr Liebe",
             "freedom" : "Freiheit",
             "a way out" : "ein Fluchtweg",
             "time" : "Zeit",
            "a hug" : "eine Umarmung",
            "sleep" : "Schlaf",
            "some rest" : "etwas Ruhe",
            "deep sleep" : "ein tiefes Schalf",
            "a glass of water" : "ein Glas Wasser",
            "a timeout" : "eine Auszeit",
            "entertainment" : "Unterhaltung",
            "peace of mind" : "Seelenfrieden",
            "warmth" : "Wärme",
            "a success" : "ein Erfolg",
            "a coffee" : "ein Kaffee",
            "a bite to eat" : "was zum Essen",
            "a painkiller" : "ein Schmerzmittel",
            "a flower shop" : "ein Blumenladen"
            }
          }
  }
