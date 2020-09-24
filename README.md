# BrainFuck++
A simpler way of writing Brainfuck.

### What is it?
This is something similar to a compiler for a very simple language I call "dusty", which is almost like a very strange and simple mix between Lua, Python and Bash.

But the language isn't what's important. This "compiler" turns code written in this relatively basic and easy to read language into Brainfuck, an esoteric programming language with only 8 possible instructions.

### What can it do?
The goal of this thing is to make it incredibly easy to write Brainfuck programs. And in it's current state I'd say we're already pretty close. You can already write some pretty complex stuff, but I won't say it's "easy" just yet.

### Is it optimised?
No. Not at all. In fact, I prioritise functionality, expandability and readability of the compiler's code waaaaay over the optimisation of the output Brainfuck code. This doesn't mean that I don't optimise it at all, though. All I'm saying is that if optimising something sets back even one of these three points, I'm most likely not doing it. That said, I do often make regressions in optimisation in favor of cleaner compiler code.

# Short documentation for the dusty language

## Introduction
Since this language is currently only used in this project, it's expected to change with almost every update. So while working with BrainFuck++, I advise you to keep this open in another tab somewhere.

### Variables
Defining a variable is done by specifying it's name, followed by an equals sign and it's new value:
```
  a = 10
```
If the variable doesn't exist yet, it's automatically created and given this value.

When setting a variable's value, you can also use arithmetic operations such as addition, subtraction and multiplication. These operations can either be performed with numbers or other variables.

Note:
You can only perform **one arithmetic operation per line.**# BrainFuck++
A simpler way of writing Brainfuck.

### What is it?
This is something similar to a compiler for a very simple language I call "dusty", which is almost like a very strange and simple mix between Lua, Python and Bash.

But the language isn't what's important. This "compiler" turns code written in this relatively basic and easy to read language into Brainfuck, an esoteric programming language with only 8 possible instructions.

### What can it do?
The goal of this thing is to make it incredibly easy to write Brainfuck programs. And in it's current state I'd say we're already pretty close. You can already write some pretty complex stuff, but I won't say it's "easy" just yet.

### Is it optimised?
No. Not at all. In fact, I prioritise functionality, expandability and readability of the compiler's code waaaaay over the optimisation of the output Brainfuck code. This doesn't mean that I don't optimise it at all, though. All I'm saying is that if optimising something sets back even one of these three points, I'm most likely not doing it. That said, I do often make regressions in optimisation in favor of cleaner compiler code.

# Short documentation for the dusty language

## Introduction
Since this language is currently only used in this project, it's expected to change with almost every update. So while working with BrainFuck++, I advise you to keep this open in another tab somewhere.

### Variables and arithmetic operations
Defining a variable is done by specifying it's name, followed by an equals sign and it's new value:
```
  a = 10
```
If the variable doesn't exist yet, it's automatically created and given this value.

When setting a variable's value, you can also use arithmetic operations such as addition, subtraction and multiplication. These operations can either be performed with numbers or other variables.


```
  foo = 2 + 3
  bar = foo * 2
  result = bar - foo
```

Notes:
* You can only perform **one arithmetic operation per line.**
* Division is not yet supported in BrainFuck++.
* The spaces between operators are mandatory in BrainFuck++.

### Input
To read the value of a variable from user input, use the variable name followed by the less than sign:
```
  input <
```
If the variable hasn't been defined yet, it is created and given the input value.

Note: As of now, the space between the variable name and the less than sign is mandatory in BrainFuck++.

### Output
To output the ASCII value of a variable, use the variable name followed by the greater than sign:
```
  output >
```

Note: As of now, the space between the variable name and the greater than sign is mandatory in BrainFuck++.

### If statements
The syntax for if statements is `if` followed by the values to compare and a `==` or `!=` statement for equals and doesn't equal respectively. BrainFuck++ currently doesn't support greater than / less than statements. If statements are closed with `fi`.
```
  if a == 10
    b = 49
    b >
  fi
```

Notes:
* As of now, the space between the operator and the values being compared is mandatory in BrainFuck++.
* BrainFuck++ currently doesn't support arithmetic operations in if statements.

### While loops
The syntax for while loops is `while` followed by the values to compare and an operator, similar to if statements. While loops are closed using `el`.
```
  while foo != 10
    foo = foo + 1
  el
```

Notes:
* As of now, the space between the operator and the values being compared is mandatory in BrainFuck++.
* BrainFuck++ currently doesn't support arithmetic operations in the head of while loops.

### Text output
To output a line of text, use `" ` followed by the text to output.
```
  " Hello World!
```

Note: The space between `"` and the text is mandatory.
