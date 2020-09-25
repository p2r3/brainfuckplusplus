function getCode(){
  return document.getElementById("code").value;
}

function setCode(val){
  return document.getElementById("code").value = val;
}

function setOutput(val){
  var prevLen = 0;
  while (prevLen != val.length){
    prevLen = val.length;
    val = val.replace(/<>/g, "");
    val = val.replace(/></g, "");
    val = val.replace(/\+-/g, "");
    val = val.replace(/-\+/g, "");
    val = val.replace(/\[\]/g, "");
    val = val.replace(/\[-\]\[-\]/g, "[-]");
  }
  return document.getElementById("output").value = val;
}

function helloworld(){
  setCode("a = 5 - 3\n\nb = a + 48\n\nb >\n\n\"  Hello, world!");
  setOutput(">>[-]>[-]>[-]<<+++++>+++<<<[-]>>[->>+<<]>[-<<+>>]<<[->>+>-<<<]>>>[-<<<<+>>>>]<[-]>[-]>[-]<<<<<[->>+<<]>>[-<<+>>>+<]>>++++++++++++++++++++++++++++++++++++++++++++++++<<<[-]>>[->>+<<]>[->+<]>[-<<<<+>>>>]<<<<.>[-]++++++++++++++++++++++++++++++++.++++++++++++++++++++++++++++++++++++++++.+++++++++++++++++++++++++++++.+++++++..+++.-------------------------------------------------------------------.------------.+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++.--------.+++.------.--------.-------------------------------------------------------------------.-----------------------.[-]");
}

function error(val, showLine){

  if(showLine === undefined){
    showLine = true;
  }

  if(!suppressErrors){

    var errorLine = "";
    if(showLine) errorLine = " on line " + currentLine;

    alert("Error" + errorLine + ": " + val);
    console.error("Line " + currentLine + " - " + val);
    suppressErrors = true;

  }

}

function defineVar(name) {
  for (var i = 0; i < varAmount; i++) {
    if (varNames[i] == name) return (i);
  }
  varNames[varAmount] = name;
  varAmount++;
  if(name == "true") addNumber(varAmount - 1, 1);
  return (varAmount - 1);
}

function getIndex(name){
  if(name == "true" || name == "false") return(defineVar(name));
  for(var i = 0; i < varAmount; i++){
    if(name == varNames[i]) return(i);
  }
  error(name + " is undefined.");
  return(undefined);
}

function goToIndex(ind){
  if(isNaN(ind)){
    error(ind + " is not a valid pointer position.");
    return 1;
  }
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

function move(ind1, ind2) {
  goToIndex(ind1);
  output += "[-";
  goToIndex(ind2);
  output += "+";
  goToIndex(ind1);
  output += "]";
}

function clone(ind1, ind2, reverse) {
  move(ind1, varAmount);
  goToIndex(varAmount);
  output += "[-";
  goToIndex(ind1);
  output += "+";
  goToIndex(ind2);
  if(reverse === true) output += "-";
  else output += "+";
  goToIndex(varAmount);
  output += "]";
}

function swap(ind1, ind2){
  move(ind1, varAmount);
  move(ind2, ind1);
  move(varAmount, ind2);
}

function clear(ind) {
  goToIndex(ind);
  output += "[-]";
}

function add(var1, var2, rez){

  var int1 = parseInt(var1, 10);
  var int2 = parseInt(var2, 10);

  clear(varAmount + 1);
  clear(varAmount + 2);
  clear(varAmount + 3);

  if (isNaN(var1)) clone(getIndex(var1), varAmount + 1);
  else addNumber(varAmount + 1, int1);
  if (isNaN(var2)) clone(getIndex(var2), varAmount + 2);
  else addNumber(varAmount + 2, int2);

  clear(rez);

  move(varAmount + 1, varAmount + 3);
  move(varAmount + 2, varAmount + 3);
  move(varAmount + 3, rez);

}

function addNumber(ind, num) {
  goToIndex(ind);
  for (var i = 0; i < num; i++) output += "+";
}

function subtract(var1, var2, rez) {

  var int1 = parseInt(var1, 10);
  var int2 = parseInt(var2, 10);

  clear(varAmount + 1);
  clear(varAmount + 2);
  clear(varAmount + 3);

  if (isNaN(var1)) clone(getIndex(var1), varAmount + 1);
  else addNumber(varAmount + 1, int1);
  if (isNaN(var2)) clone(getIndex(var2), varAmount + 2);
  else addNumber(varAmount + 2, int2);

  clear(rez);

  move(varAmount + 1, varAmount + 3);
  clone(varAmount + 2, varAmount + 3, true);
  move(varAmount + 3, rez);

  clear(varAmount + 2);

}

function subtNumber(ind, num){
  goToIndex(ind);
  for(var i = 0; i < num; i++) output+="-";
}

function multiply(var1, var2, rez) {

  var int1 = parseInt(var1, 10);
  var int2 = parseInt(var2, 10);

  clear(varAmount + 1);
  clear(varAmount + 2);
  clear(varAmount + 3);

  if (isNaN(var1)) clone(getIndex(var1), varAmount + 1);
  else addNumber(varAmount + 1, int1);
  if (isNaN(var2)) clone(getIndex(var2), varAmount + 2);
  else addNumber(varAmount + 2, int2);

  clear(rez);
  clone(varAmount + 2, varAmount + 3);

  goToIndex(varAmount + 1);
  output += "[-";
  move(varAmount + 2, rez);
  clone(varAmount + 3, varAmount + 2);
  goToIndex(varAmount + 1);
  output += "]";

  clear(varAmount + 2);
  clear(varAmount + 3);

}

function divide(var1, var2, rez){

  var int1 = parseInt(var1, 10);
  var int2 = parseInt(var2, 10);

  clear(varAmount + 1);
  clear(varAmount + 2);
  clear(varAmount + 3);
  clear(varAmount + 4);

  if (isNaN(var1)) clone(getIndex(var1), varAmount + 1);
  else addNumber(varAmount + 1, int1);
  if (isNaN(var2)) clone(getIndex(var2), varAmount + 2);
  else addNumber(varAmount + 2, int2);

  clear(rez);
  clone(varAmount + 2, varAmount + 3);

  goToIndex(varAmount + 1);
  output += "["
  goToIndex(varAmount + 2);
  output += "["
  addNumber(varAmount + 5, 1);
  goToIndex(varAmount + 1);
  output += "[-";
  clear(varAmount + 5);
  move(varAmount + 1, varAmount + 4);
  output += "]";
  move(varAmount + 4, varAmount + 1);
  goToIndex(varAmount + 2);
  output += "-]";
  addNumber(rez, 1);
  clone(varAmount + 3, varAmount + 2);
  goToIndex(varAmount + 1);
  output += "]";
  goToIndex(varAmount + 5);
  output += "[";
  subtNumber(rez, 1);
  clear(varAmount + 5);
  output += "]";

  clear(varAmount + 2);
  clear(varAmount + 3);

}

function startIf(var1, var2, operation){

  var int1 = parseInt(var1, 10), int2 = parseInt(var2, 10);

  if(isNaN(var1) && isNaN(var2)){
    clone(getIndex(var1), varAmount + 1);
    clone(getIndex(var2), varAmount + 2);
  } else if(isNaN(var2)){
    addNumber(varAmount + 1, int1);
    clone(getIndex(var2), varAmount + 2);
  } else if(isNaN(var1)){
    clone(getIndex(var1), varAmount + 1);
    addNumber(varAmount + 2, int2);
  } else {
    addNumber(varAmount + 1, int1);
    addNumber(varAmount + 2, int2);
  }

  if(operation == "=="){
    beforeIf[beforeIf.length] = varAmount + 3;

    goToIndex(varAmount + 3);
    output += "[-]+<<[->-<]>[>-<[-]]>[";
  }

  if(operation == "!="){
    beforeIf[beforeIf.length] = varAmount + 2;

    goToIndex(varAmount + 1);
    output += "[->-<]>[[-]<";
  }

  if(operation == ">" || operation == "<"){
    beforeIf[beforeIf.length] = varAmount + 1;
    clear(varAmount + 3);

    if(operation == "<") swap(varAmount + 1, varAmount + 2);

    goToIndex(varAmount + 2);
    output += "[";
    goToIndex(varAmount + 1);
    output += "[-";
    move(varAmount + 1, varAmount + 3);
    output += "]";
    move(varAmount + 3, varAmount + 1);
    goToIndex(varAmount + 2);
    output += "-]";
    goToIndex(varAmount + 1);
    output += "[[-]";
  }

}

function endIf(){

  var bI = beforeIf[beforeIf.length - 1];

  clear(varAmount);
  move(bI, varAmount);
  output += "]";
  move(varAmount, bI);
  goToIndex(bI);

  beforeIf.pop();

}

function startWhile(var1, var2, operation){

  defineVar("_ARRAYBOOL");

  addNumber(getIndex("_ARRAYBOOL"), 1);
  output += "[[-]";

  startIf(var1, var2, operation);

  openWhileLoops++;

}

function endWhile(){

  addNumber(getIndex("_ARRAYBOOL"), 1);

  endIf();

  goToIndex(getIndex("_ARRAYBOOL"));
  output += "]";

  openWhileLoops--;

}

function echo(string){

  clear(varAmount);

  var tempPointer = 0;

  for(var j = 1; j < string.length; j++) {
    while(tempPointer != string.charCodeAt(j)){
      if(tempPointer < string.charCodeAt(j)){
        tempPointer++;
        output += "+";
      } else {
        tempPointer--;
        output += "-";
      }
    }
    output += ".";
  }

  clear(varAmount);

}

var varNames = new Array();
var varAmount = 0;
var globalIndex = 0;
var beforeIf = new Array();
var output = "";
var suppressErrors = false;
var currentLine = 0;
var openWhileLoops = 0;

function compile(){

  varNames = new Array();
  varAmount = 0;
  globalIndex = 0;
  beforeIf = new Array();
  output = "";
  suppressErrors = false;
  openWhileLoops = 0;

  var lines = getCode().split("\n");
  for(var i = 0; i < lines.length; i++){

    currentLine = i + 1;
    var line = lines[i].replace(/ /g, "").replace(/;/g, "");

    while(lines[i].indexOf(" ") == 0) lines[i] = lines[i].substr(1);

    if(lines[i][0] == "/" && lines[i][1] == "/") continue;

    if(lines[i].indexOf("while ") == 0) {

      var operator = "";

      if(line.indexOf("==") > -1) operator = "==";
      if(line.indexOf("!=") > -1) operator = "!=";
      if(line.indexOf("<") > -1) operator = "<";
      if(line.indexOf(">") > -1) operator = ">";

      var var1 = line.substr(5).split(operator)[0];
      var var2 = line.split(operator)[1];

      startWhile(var1, var2, operator);
      continue;

    }

    if(lines[i].indexOf("el") == 0){

      endWhile();
      continue;

    }

    if(lines[i].indexOf("if ") == 0) {

      var operator = "";

      if(line.indexOf("==") > -1) operator = "==";
      if(line.indexOf("!=") > -1) operator = "!=";
      if(line.indexOf("<") > -1) operator = "<";
      if(line.indexOf(">") > -1) operator = ">";

      var var1 = line.substr(2).split(operator)[0];
      var var2 = line.split(operator)[1];

      startIf(var1, var2, operator);
      continue;

    }

    if(lines[i].indexOf("fi") == 0) {

      endIf();
      continue;

    }

    if(lines[i][0] == "\"" || lines[i][0] == "\'") {

      var string = lines[i];
      if(lines[i][0] == "\"") string += "\n";
      echo(string);
      continue;

    }

    if(lines[i].indexOf("+=") > -1){

      var currentName = line.split("+=")[0];
      var currentIndex = defineVar(currentName);
      var toAdd = line.split("+=")[1];
      add(currentName, toAdd, currentIndex);

      continue;

    }

    if(lines[i].indexOf("-=") > -1){

      var currentName = line.split("-=")[0];
      var currentIndex = defineVar(currentName);
      var toSubtract = line.split("-=")[1];
      subtract(currentName, toSubtract, currentIndex);

      continue;

    }

    if(lines[i].indexOf("*=") > -1){

      var currentName = line.split("*=")[0];
      var currentIndex = defineVar(currentName);
      var toMultiply = line.split("*=")[1];
      multiply(currentName, toMultiply, currentIndex);

      continue;

    }

    if(lines[i].indexOf("/=") > -1){

      var currentName = line.split("/=")[0];
      var currentIndex = defineVar(currentName);
      var divideBy = line.split("/=")[1];
      divide(currentName, divideBy, currentIndex);

      continue;

    }

    if(lines[i].indexOf("=") > -1){

      var currentName = line.split("=")[0];
      var currentIndex = defineVar(currentName);
      var operator = "";

      if(line.indexOf("+") > -1) operator = "+";
      if(line.indexOf("-") > -1) operator = "-";
      if(line.indexOf("*") > -1) operator = "*";
      if(line.indexOf("/") > -1) operator = "/";

      if(operator == ""){

        var var1 = line.split("=")[1];

        if (!isNaN(var1)) {
          clear(currentIndex);
          addNumber(currentIndex, parseInt(var1,10));
        } else if (var1 != currentName) {
          clear(currentIndex);
          clone(getIndex(var1), currentIndex);
        }

      } else {

        var var1 = line.split(operator)[0].split("=")[1];
        var var2 = line.split(operator)[1];

        if(isNaN(var1)) var ind1 = getIndex(var1);
        if(isNaN(var2)) var ind2 = getIndex(var2);

        if(operator == "+") add(var1, var2, currentIndex);
        if(operator == "-") subtract(var1, var2, currentIndex)
        if(operator == "*") multiply(var1, var2, currentIndex);
        if(operator == "/") divide(var1, var2, currentIndex);

      }

      continue;

    }

    if(lines[i].indexOf(">") > -1){

      var currentIndex = getIndex(line.substr(0, line.indexOf(">")));

      goToIndex(currentIndex);
      output += ".";

      continue;

    }

    if(lines[i].indexOf("<") > -1){

      var currentName = line.substr(0, line.indexOf("<"));
      var currentIndex = defineVar(currentName);

      goToIndex(currentIndex);
      output += ",";

      continue;

    }

  }

  if(openWhileLoops != 0) error("Unclosed while loop detected.", false);

  if(suppressErrors) output = "  Compilation error";
  setOutput(output);

}
