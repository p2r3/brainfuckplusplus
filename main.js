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
    val = val.replace(/\[-\]\[-\]/g, "");
  }
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

function defineVar(name){
  for(var i = 0; i < varAmount; i++){
    if(varNames[i] == name) return(i);
  }
  varNames[varAmount] = name;
  varAmount++;
  return(varAmount - 1);
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

function brainfuckIf(var1, var2, operation){

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

}

function endIf(){

  var bI = beforeIf[beforeIf.length - 1];

  clear(varAmount);
  singleMove(bI, varAmount);
  output += "]";
  singleMove(varAmount, bI);
  goToIndex(bI);

  beforeIf.pop();

}

function multiply(var1, var2, rez){
  
  var int1 = parseInt(var1, 10);
  var int2 = parseInt(var2, 10);
  
  clear(varAmount + 1);
  clear(varAmount + 2);
  clear(varAmount + 3);
  
  if (isNaN(var1)) singleAddition(getIndex(var1), varAmount + 1);
  else addNumber(varAmount + 1, int1);  
  if (isNaN(var2)) singleAddition(getIndex(var2), varAmount + 2);
  else addNumber(varAmount + 2, int2);
  
  clear(rez);
  singleAddition(varAmount + 2, varAmount + 3);
  
  goToIndex(varAmount + 1);
  output += "[-";
  singleMove(varAmount + 2, rez);
  singleAddition(varAmount + 3, varAmount + 2);
  goToIndex(varAmount + 1);
  output += "]";
  
  clear(varAmount + 2);
  clear(varAmount + 3);
  
}

var varNames = new Array();
var varAmount = 0;
var globalIndex = 0;
var beforeIf = new Array();
var output = "";

function compile(){

  varNames = new Array();
  varAmount = 0;
  globalIndex = 0;
  beforeIf = new Array();
  output = "";

  var lines = getCode().split("\n");
  for(var i = 0; i < lines.length; i++){

    while(lines[i].indexOf(" ") == 0) lines[i] = lines[i].substr(1);

    if(lines[i][0] == "/" && lines[i][1] == "/") continue;

    if(lines[i].indexOf("while ") == 0) {

      var split = lines[i].split(" ");

      defineVar("_ARRAYBOOL");

      addNumber(getIndex("_ARRAYBOOL"), 1);
      output += "[[-]";

      brainfuckIf(split[1], split[3], split[2]);

      continue;

    }

    if(lines[i].indexOf("el") == 0){

      addNumber(getIndex("_ARRAYBOOL"), 1);

      endIf();

      goToIndex(getIndex("_ARRAYBOOL"));
      output += "]";

      continue;

    }

    if(lines[i].indexOf("if ") == 0) {

      var split = lines[i].split(" ");

      brainfuckIf(split[1], split[3], split[2]);

      continue;

    }

    if(lines[i].indexOf("fi") == 0) {

      endIf();

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
      var currentName = lines[i].substr(0, lines[i].indexOf(" = "));
      var currentIndex = defineVar(currentName);

      if(split.length == 3){

        if (!isNaN(split[2])) {
          clear(currentIndex);
          addNumber(currentIndex, parseInt(split[2],10));
        } else if (split[2] != split[0]) {
          clear(currentIndex);
          singleAddition(getIndex(split[2]), currentIndex);
        }

      } else if (split.length == 5) {

        if(isNaN(split[2])) var ind1 = getIndex(split[2]);
        if(isNaN(split[4])) var ind2 = getIndex(split[4]);
        var num1 = parseInt(split[2], 10), num2 = parseInt(split[4], 10);

        if(split[3] == "+") {
          if(isNaN(split[2]) && isNaN(split[4])) fullAddition(ind1, ind2, currentIndex);
          else if(isNaN(split[2])) fullAddNumber(ind1, num2, currentIndex);
          else if(isNaN(split[4])) fullAddNumber(ind2, num1, currentIndex);
          else{
            clear(currentIndex);
            addNumber(currentIndex, num1 + num2);
          }
        }

        if(split[3] == "-") {
          if(isNaN(split[2]) && isNaN(split[4])) fullSubtraction(ind1, ind2, currentIndex);
          else if (isNaN(split[2])) fullSubtNumber(ind1, num2, currentIndex, false);
          else if (isNaN(split[4])) fullSubtNumber(ind2, num1, currentIndex, true);
          else {
            clear(currentIndex);
            addNumber(currentIndex, num1 - num2);
          }
        }
        
        if(split[3] == "*") multiply(split[2], split[4], currentIndex);

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
      var currentIndex = defineVar(currentName);

      goToIndex(currentIndex);
      output += ",";

      continue;

    }

  }

  setOutput(output);

}
