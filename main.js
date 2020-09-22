function getCode(){
  return document.getElementById("code").value;
}

function setCode(val){
  return document.getElementById("code").value = val;
}

function setOutput(val){
  return document.getElementById("output").innerHTML = val;
}

function getIndex(name){
  for(var i = 2; i < varNames.length; i++){
    if(name == varNames[i]) return(i);
  }
  alert("Error: Can't get index of " + name + " because it is undefined.");
  return(undefined);
}

function goToIndex(ind){
  while(globalIndex != ind){
    if(globalIndex < ind){
      globalIndex++;
      output += ">";
    } else {
      globalIndex--;
      output += "<";
    }
  }
}

function fullAddition(ind1, ind2, rez){
  singleAddition(ind1, 1);
  singleAddition(ind2, 1);
  clear(rez);
  singleMove(1, rez);
}

function singleAddition(ind1, ind2){
  singleMove(ind1,0);
  goToIndex(0);
  output+="[-";
  goToIndex(ind1);
  output+="+";
  goToIndex(ind2);
  output+="+";
  goToIndex(0);
  output+="]";
}

function singleMove(ind1, ind2){
  goToIndex(ind1);
  output+="[-";
  goToIndex(ind2);
  output+="+";
  goToIndex(ind1);
  output+="]";
}

function clear(ind){
  goToIndex(ind);
  output+="[-]";
}

function addNumber(ind, num){
  goToIndex(ind);
  for(var i = 0; i < num; i++) output+="+";
}

function fullAddNumber(ind, num, rez){
  singleAddition(ind, 1);
  addNumber(1, num);
  clear(rez);
  singleMove(1, rez);
}

function fullSubtraction(ind1, ind2, rez){
  singleAddition(ind1, 1);
  singleSubtraction(ind2, 1);
  clear(rez);
  singleMove(1, rez);
}

function singleSubtraction(ind1, ind2){
  singleMove(ind1,0);
  goToIndex(0);
  output+="[-";
  goToIndex(ind1);
  output+="+";
  goToIndex(ind2);
  output+="-";
  goToIndex(0);
  output+="]";
}

function fullSubtNumber(ind, num, rez, invert){
  if(invert){
    addNumber(1, num);
    singleSubtraction(ind, 1);
  } else {
    singleAddition(ind, 1);
    subtNumber(1, num);
  }
  clear(rez);
  singleMove(1, rez);
}

function subtNumber(ind, num){
  goToIndex(ind);
  for(var i = 0; i < num; i++) output+="-";
}

var varNames = [];
var globalIndex = 0;
var output = "";

varNames[0] = "TEMP1";
varNames[1] = "TEMP2"

function compile(){
  output = "";
  var lines = getCode().split("\n");
  for(var i = 0; i < lines.length; i++){

    if(lines[i][0] == "/" && lines[i][1] == "/") continue;

    if(lines[i][0] == "\"" && lines[i][1] == " ") {
      
      clear(0);
      var temp = 0;
      
      for(var j = 2; j < lines[i].length; j++) {
        while(temp != lines[i].charCodeAt(j)){
          if(temp < lines[i].charCodeAt(j)){
            temp++;
            output += "+";
          } else {
            temp--;
            output += "-";
          }
        }
        output += ".";
      }
      
      clear(0);
      
      continue;
      
    }

    if(lines[i].indexOf(" = ") > -1){

      var split = lines[i].split(" ");
      var currentIndex = varNames.length;
      var currentName = lines[i].substr(0, lines[i].indexOf(" = "));

      for(var j = 2; j < varNames.length; j++){
        if(currentName == varNames[j]){
          currentIndex = j;
          break;
        }
      }

      goToIndex(currentIndex);

      varNames[currentIndex] = currentName;

      if(split.length == 3){

        if (!isNaN(split[2])) {
          clear(currentIndex);
          addNumber(currentIndex, parseInt(split[2],10));
        } else if (split[2] != split[0]) {
          clear(currentIndex);
          singleAddition(getIndex(split[2]), currentIndex);
        }

      } else if (split.length == 5) {

        if(split[3] == "+") {
          if(isNaN(split[2]) && isNaN(split[4])) fullAddition(getIndex(split[2]), getIndex(split[4]), currentIndex);
          else if(isNaN(split[2])) fullAddNumber(getIndex(split[2]), parseInt(split[4], 10), currentIndex);
          else if(isNaN(split[4])) fullAddNumber(getIndex(split[4]), parseInt(split[2], 10), currentIndex);
          else{
            clear(currentIndex);
            addNumber(currentIndex, parseInt(split[2], 10) + parseInt(split[4], 10));
          }
        }
        
        if(split[3] == "-") {
          if(isNaN(split[2]) && isNaN(split[4])) fullSubtraction(getIndex(split[2]), getIndex(split[4]), currentIndex);
          else if (isNaN(split[2])) fullSubtNumber(getIndex(split[2]), parseInt(split[4], 10), currentIndex, false);
          else if (isNaN(split[4])) fullSubtNumber(getIndex(split[4]), parseInt(split[2], 10), currentIndex, true);
          else {
            clear(currentIndex);
            var temp = parseInt(split[2], 10) - parseInt(split[4], 10);
            if(temp < 0) console.warn("Warning: Value of " + currentName + " is negative");
            addNumber(currentIndex, temp);
          }
        }

      } else alert("Error: Too many operations when defining " + currentName + ".");

      continue;

    }

    if(lines[i].indexOf(" >") > -1){

      var currentIndex = getIndex(lines[i].substr(0, lines[i].indexOf(" >")));

      goToIndex(currentIndex);

      output += ".";
      
      continue;

    }
    
    if(lines[i].indexOf(" <") > -1){
      
      var currentName = lines[i].substr(0, lines[i].indexOf(" <"));
      var currentIndex = varNames.length;
      
      for (var j = 2; j < varNames.length; j++) {
        if (currentName == varNames[j]) {
          currentIndex = j;
          break;
        }
      }
      
      varNames[currentIndex] = currentName;
      
      goToIndex(currentIndex);
      output += ",";
      
      continue;
      
    }

  }

  setOutput("Output: " + output);

}
