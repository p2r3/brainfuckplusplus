function getCode(){
  return document.getElementById("code").value;
}

function setCode(val){
  return document.getElementById("code").value = val;
}

function setOutput(val){
  return document.getElementById("output").value = val;
}

function helloworld(){
  setCode("a = 5 - 3\n\nb = a + 48\n\nb >\n\n\"  Hello, world!");
  setOutput("[-]++><[->>+<<]>>[-<<+>>>+<]>++++++++++++++++++++++++++++++++++++++++++++++++<<[-]>>[-<<+>>]<<.<[-]++++++++++++++++++++++++++++++++.++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++++++++++++.+++++++..+++.-------------------------------------------------------------------.------------.+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.--------.+++.------.--------.-------------------------------------------------------------------.[-]");
}

function getIndex(name){
  for(var i = 0; i < varAmount; i++){
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
  singleAddition(ind1, varAmount + 1);
  singleAddition(ind2, varAmount + 1);
  clear(rez);
  singleMove(varAmount + 1, rez);
}

function singleAddition(ind1, ind2){
  singleMove(ind1, varAmount);
  goToIndex(varAmount);
  output+="[-";
  goToIndex(ind1);
  output+="+";
  goToIndex(ind2);
  output+="+";
  goToIndex(varAmount);
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
  singleAddition(ind, varAmount + 1);
  addNumber(varAmount + 1, num);
  clear(rez);
  singleMove(varAmount + 1, rez);
}

function fullSubtraction(ind1, ind2, rez){
  singleAddition(ind1, varAmount + 1);
  singleSubtraction(ind2, varAmount + 1);
  clear(rez);
  singleMove(varAmount + 1, rez);
}

function singleSubtraction(ind1, ind2){
  singleMove(ind1, varAmount);
  goToIndex(varAmount);
  output+="[-";
  goToIndex(ind1);
  output+="+";
  goToIndex(ind2);
  output+="-";
  goToIndex(varAmount);
  output+="]";
}

function fullSubtNumber(ind, num, rez, invert){
  if(invert){
    addNumber(varAmount + 1, num);
    singleSubtraction(ind, varAmount + 1);
  } else {
    singleAddition(ind, varAmount + 1);
    subtNumber(varAmount + 1, num);
  }
  clear(rez);
  singleMove(varAmount + 1, rez);
}

function subtNumber(ind, num){
  goToIndex(ind);
  for(var i = 0; i < num; i++) output+="-";
}

function ifEquals(var1, var2){

  var int1 = parseInt(var1, 10), int2 = parseInt(var2, 10);

  if(isNaN(var1) && isNaN(var2)){
    singleAddition(getIndex(var1), varAmount + 1);
    singleAddition(getIndex(var2), varAmount + 2);
  } else if(isNaN(var2)){
    addNumber(varAmount + 1, int1);
    singleAddition(getIndex(var2), varAmount + 2);
  } else if(isNaN(var1)){
    singleAddition(getIndex(var1), varAmount + 1);
    addNumber(varAmount + 2, int2);
  } else {
    addNumber(varAmount + 1, int1);
    addNumber(varAmount + 2, int2);
  }

  goToIndex(varAmount + 3);
  output += "+<<[->-<]>[>-<[-]]>[";

  clear(varAmount + 1);
  clear(varAmount + 2);
  clear(varAmount + 3);

}

var varNames = [];
var varAmount = 0;
var globalIndex = 0;
var output = "";

function compile(){

  varNames = new Array();
  varAmount = 0;
  globalIndex = 0;
  output = "";

  var lines = getCode().split("\n");
  for(var i = 0; i < lines.length; i++){

    if(lines[i][0] == "/" && lines[i][1] == "/") continue;

    if(lines[i].indexOf("if ") == 0) {

      var split = lines[i].split(" ");

      if(split[2] == "==") ifEquals(split[1], split[3]);

      continue;

    }

    if(lines[i].indexOf("fi") == 0) {

      goToIndex(varAmount);
      clear(varAmount);
      output += "]";

      continue;

    }

    if(lines[i][0] == "\"" && lines[i][1] == " ") {

      var temp = 0;
      lines[i] += "\n";

      goToIndex(varAmount);
      clear(varAmount);

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

      clear(varAmount);

      continue;

    }

    if(lines[i].indexOf(" = ") > -1){

      var split = lines[i].split(" ");
      var currentIndex = varAmount;
      var currentName = lines[i].substr(0, lines[i].indexOf(" = "));

      for(var j = 0; j < varAmount; j++){
        if(currentName == varNames[j]){
          currentIndex = j;
          break;
        }
      }

      goToIndex(currentIndex);

      if(currentIndex == varAmount){
        varNames[currentIndex] = currentName;
        varAmount++;
      }

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
      var currentIndex = varAmount;

      for (var j = 0; j < varAmount; j++) {
        if (currentName == varNames[j]) {
          currentIndex = j;
          break;
        }
      }

      if(currentIndex == varAmount){
        varNames[currentIndex] = currentName;
        varAmount++;
      }

      goToIndex(currentIndex);
      output += ",";

      continue;

    }

  }

  setOutput(output);

}
