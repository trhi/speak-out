function displayRefugeeSituationSentences(){

  //display all possible voices:
  //todo: display only 4 selected voices
    for(var i=0 ; i < voices.length ; i++){
      for(var j = 0 ; j < languages.length ; j++){
        if(languages[j].bcp === voices[i].lang){
          $("#refugeeSituationDiv").append("<p id=" + voices[i].lang + ">__ I am from " + languages[j].country + "</p>");
        }
      }
    }

    refugeeSituationDiv.style.borderLeft = "2px dotted black";

}
