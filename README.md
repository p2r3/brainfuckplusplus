# BrainFuck++
A simpler way of writing Brainfuck.

### What is it?
This is a compiler for a very simple language I call "dusty", which is almost like a very strange and simple mix between Lua, Python and Bash.

But the language isn't what's important. This compiler turns code written in this relatively basic and easy to read language into Brainfuck, an esoteric programming language with only 8 possible instructions. And, in case you don't like the use of the word compiler here, the reason I call it that and not an interpreter or transpiler is because it converts a relatively high-level readable language into something so low level that it consists of 8 symbols. I don't care what you say the technicalities are, reading Brainfuck is more painful than raw machine instructions.

### What can it do?
The goal of this thing is to make it incredibly easy to write Brainfuck programs. And in it's current state I'd say we're already pretty close. You can already write some pretty complex stuff, but I won't say it's "easy" just yet.

### Is it optimised?
No. Not at all. In fact, I prioritise stability, expandability and readability of the compiler's code waaaaay over the optimisation of the output Brainfuck code. This doesn't mean that I don't optimise it at all, though. All I'm saying is that if optimising something sets back even one of these three points, I'm most likely not doing it. That said, I do often make regressions in optimisation in favor of cleaner compiler code.

### Where can I try it?

[The github-hosted web version is available here!](https://p2r3.github.io/brainfuckplusplus)

(Currently desktop only, responsiveness is definitely not my priority right now.)

# Short documentation for the dusty language

## Introduction
Since this language is currently only used in this project, it's expected to change with almost every update. So while working with BrainFuck++, I advise you to keep this open in another tab somewhere.

### Variables and arithmetic operations
Defining a variable can be done by specifying it's name, followed by an equals sign and it's new value:
```
  a = 10
```
If the variable doesn't exist yet, it's automatically created and given this value.

When setting a variable's value, you can also use arithmetic operations such as addition, subtraction, multiplication and division. These operations can either be performed with numbers or other variables.
```
  foo = 3 + 2
  bar = 2 * foo
  result = bar - foo
  half = result / 2
```

Note:
* You can only perform **one arithmetic operation per line.**

### Shorthands
For performing arithmetic operations with numbers or variables, you can use shorthands to make the code thinner and cleaner:
```
  a = 5
  b = 3
  a += b
```
If the variable hasn't been defined yet, it's automatically defined with a value of 0 before executing the operation.

Note:
* The right side of the shorthand cannot be an arithmetic operation itself.
* These shorthands cannot have a space between the operator and equals sign.

### Booleans
Setting a variable to true or false is the same as setting it to 1 or 0, respectively. The only difference is that the code might be easier to read in some cases. Please note, however, that using true or false can noticeably bloat the output code in BrainFuck++, especially in larger programs.
```
  //this:
  yep = true
  nope = false
  //is the same as this:
  yep = 1
  nope = 0
```
Since BrainFuck++ actually stores booleans as simple variables, you can even overwrite them if necessary:
```
  true = 200
  false = 50
```

### Input
To set the value of a variable from user input, use the variable name followed by the less than sign:
```
  input <
```
If the variable hasn't been defined yet, it is created and given the input value.

### Output
To output the value of a variable, use the variable name followed by the greater than sign:
```
  output >
```

### If statements
The syntax for if statements is `if` followed by the condition to evaluate. If statements are closed with `fi`, and can be nested:
```
  if a == 10
    b += 5
    if b > 15
      b >
    fi
  fi
```

Note:
* BrainFuck++ currently doesn't support arithmetic operations in the head of if statements.

### While loops
The syntax for while loops is `while` followed by the condition, similar to if statements. While loops are closed using `el`.
```
  while foo < 10
    foo += 1
  el
```

Note:
* BrainFuck++ currently doesn't support arithmetic operations in the head of while loops.

### Text output
To output a line of text followed by a newline, use `"` followed by the text to output.
```
  "This is on one line...
  "And this is on another!
```

To do the same without the additional newline, use `'` instead.
```
  'This will be displayed
  ' on the same line!
```

### Other syntax quirks
Semicolons, spaces and indentation are almost entirely ignored in dusty. The only exceptions are the spaces after `if` and `while`, any spaces or semicolons in string output and no spaces between shorthand operators.

So, technically, this is valid code:

```
a;=;0;
while       a;;<;;10;;;;;
"this is intentionally horrible code.
"don't do this at home.
a ;;   ; += ;1;;;;
el;;;;
```
