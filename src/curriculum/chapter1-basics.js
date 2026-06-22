// Chapter 1 — Python Basics
// Goal: go from zero to writing small programs. Every lesson mixes a short
// teaching card, quick checks, and a tiny bit of real code you actually run.

const chapter = {
  id: 'ch1',
  title: 'Python Basics',
  subtitle: 'Start here — learn the building blocks',
  color: '#58cc02',
  emoji: '🌱',
  lessons: [
    {
      id: 'b1-print',
      title: 'Hello, Python',
      icon: '👋',
      xp: 10,
      steps: [
        {
          type: 'concept',
          title: 'print() shows things',
          body: "In Python, `print(...)` displays a value on the screen. Text (a *string*) goes in quotes. This is how your program talks to you.",
          code: 'print("Hello, Python!")\nprint("I am learning to code")'
        },
        {
          type: 'concept',
          title: 'Comments are notes to humans',
          body: "Anything after a `#` on a line is a **comment**. Python ignores it — it is just a note for you. Use comments to explain *why* code does something.",
          code: '# This line is ignored by Python\nprint("Comments don\'t run")  # you can comment here too'
        },
        {
          type: 'mcq',
          prompt: 'Which line correctly prints the word hello?',
          options: ['print(hello)', 'print("hello")', 'Print("hello")', 'echo "hello"'],
          answer: 1,
          explanation: 'Text must be in quotes, and the function is lowercase `print`. `print(hello)` would look for a variable named hello, and `Print` (capital P) does not exist.'
        },
        {
          type: 'predict',
          prompt: 'What does this program print?',
          code: '# greeting\nprint("Hi")\nprint("there")',
          options: ['Hi there', 'Hi\\nthere (on two lines)', '# greeting', 'Nothing'],
          answer: 1,
          explanation: 'Each `print(...)` outputs on its own line. The comment is ignored.'
        },
        {
          type: 'code',
          prompt: 'Print your first message',
          description: 'Use print to output exactly: I love Python',
          hints: ['Remember the quotes around the text.', 'It should read print("I love Python")'],
          starter: '# Print the message below\n',
          spec: { expectedStdout: 'I love Python' },
          solution: 'print("I love Python")',
          solutionNote: 'print outputs the string between the quotes.'
        }
      ]
    },

    {
      id: 'b1-vars',
      title: 'Variables & Types',
      icon: '📦',
      xp: 12,
      steps: [
        {
          type: 'concept',
          title: 'Variables are labelled boxes',
          body: "A **variable** stores a value so you can use it later. Use `=` to assign. The name is on the left, the value on the right.",
          code: 'name = "Ada"\nage = 36\nprint(name)\nprint(age)'
        },
        {
          type: 'concept',
          title: 'Every value has a type',
          body: "Common types:\n- `str` — text, e.g. `\"hi\"`\n- `int` — whole number, e.g. `7`\n- `float` — decimal, e.g. `3.14`\n- `bool` — `True` or `False`\n\nUse `type(x)` to check a type.",
          code: 'print(type("hi"))    # <class \'str\'>\nprint(type(7))       # <class \'int\'>\nprint(type(3.14))    # <class \'float\'>\nprint(type(True))    # <class \'bool\'>'
        },
        {
          type: 'mcq',
          prompt: 'What type is the value 42?',
          options: ['str', 'int', 'float', 'bool'],
          answer: 1,
          explanation: '42 is a whole number with no decimal point, so it is an `int`.'
        },
        {
          type: 'fill',
          prompt: 'Create a variable score equal to 100.',
          codeBefore: '',
          codeAfter: ' = 100',
          answers: ['score'],
          explanation: 'The variable name goes on the left of the `=`.'
        },
        {
          type: 'predict',
          prompt: 'What is printed?',
          code: 'x = 5\nx = x + 3\nprint(x)',
          options: ['5', '8', '53', 'x + 3'],
          answer: 1,
          explanation: '`x` starts as 5, then is reassigned to 5 + 3 = 8.'
        },
        {
          type: 'code',
          prompt: 'Store and print',
          description: 'Create a variable city holding the text "Prague", then print it.',
          hints: ['Assign with =, then print the variable (no quotes when printing the variable).'],
          starter: '# 1) make a variable called city\n# 2) print it\n',
          spec: { expectedStdout: 'Prague' },
          solution: 'city = "Prague"\nprint(city)',
          solutionNote: 'We store the string in `city`, then print the variable.'
        }
      ]
    },

    {
      id: 'b1-numbers',
      title: 'Numbers & Math',
      icon: '🔢',
      xp: 12,
      steps: [
        {
          type: 'concept',
          title: 'Python is a calculator',
          body: "Operators: `+` `-` `*` `/`. Two special ones:\n- `//` floor division (drops the remainder)\n- `%` modulo (the remainder)\n- `**` power",
          code: 'print(7 + 2)    # 9\nprint(7 / 2)    # 3.5\nprint(7 // 2)   # 3\nprint(7 % 2)    # 1\nprint(2 ** 3)   # 8'
        },
        {
          type: 'predict',
          prompt: 'What is printed?',
          code: 'print(10 % 3)',
          options: ['3', '1', '0', '3.33'],
          answer: 1,
          explanation: '10 divided by 3 is 3 with a remainder of 1. `%` gives the remainder.'
        },
        {
          type: 'mcq',
          prompt: 'Which operator tells you if a number is even?',
          code: 'n = 8\n# n is even if ...',
          options: ['n / 2 == 0', 'n % 2 == 0', 'n // 2 == 0', 'n ** 2 == 0'],
          answer: 1,
          explanation: 'A number is even when the remainder after dividing by 2 is 0: `n % 2 == 0`.'
        },
        {
          type: 'code',
          prompt: 'Average of two numbers',
          description: 'Write a function average(a, b) that returns the average of two numbers.',
          hints: ['Average = (a + b) / 2', 'Use the return keyword to give back the value.'],
          starter: 'def average(a, b):\n    # return the average\n    pass\n',
          spec: {
            functionName: 'average',
            tests: [
              { input: [4, 6], expected: 5 },
              { input: [10, 0], expected: 5 },
              { input: [3, 4], expected: 3.5 }
            ]
          },
          solution: 'def average(a, b):\n    return (a + b) / 2',
          solutionNote: 'Add the two numbers and divide by 2. `/` keeps decimals.'
        }
      ]
    },

    {
      id: 'b1-strings',
      title: 'Strings',
      icon: '🔤',
      xp: 14,
      steps: [
        {
          type: 'concept',
          title: 'Working with text',
          body: "Strings can be joined with `+`, repeated with `*`, and measured with `len()`. You can also use handy methods like `.upper()` and `.lower()`.",
          code: 'name = "ada"\nprint(name.upper())       # ADA\nprint(name + " lovelace") # ada lovelace\nprint(len(name))          # 3'
        },
        {
          type: 'concept',
          title: 'f-strings put values inside text',
          body: "Put an `f` before the quotes and write variables inside `{ }`. This is the cleanest way to build messages.",
          code: 'name = "Ada"\nage = 36\nprint(f"{name} is {age} years old")'
        },
        {
          type: 'predict',
          prompt: 'What is printed?',
          code: 'word = "ab"\nprint(word * 3)',
          options: ['ababab', 'ab ab ab', 'abababab', 'Error'],
          answer: 0,
          explanation: 'Multiplying a string by 3 repeats it 3 times with no spaces.'
        },
        {
          type: 'fill',
          prompt: 'Complete the f-string so it prints "Hi, Ada".',
          codeBefore: 'name = "Ada"\nprint(f"Hi, ',
          codeAfter: '")',
          answers: ['{name}'],
          explanation: 'Inside an f-string, `{name}` is replaced by the value of name.'
        },
        {
          type: 'code',
          prompt: 'Greeting builder',
          description: 'Write greet(name) that returns the string "Hello, NAME!" (with NAME replaced).',
          hints: ['Use an f-string: f"Hello, {name}!"', "Don't forget the exclamation mark."],
          starter: 'def greet(name):\n    pass\n',
          spec: {
            functionName: 'greet',
            tests: [
              { input: ['Ada'], expected: 'Hello, Ada!' },
              { input: ['Sam'], expected: 'Hello, Sam!' }
            ]
          },
          solution: 'def greet(name):\n    return f"Hello, {name}!"',
          solutionNote: 'The f-string inserts the name between the fixed text.'
        }
      ]
    },

    {
      id: 'b1-bool',
      title: 'Booleans & Comparisons',
      icon: '⚖️',
      xp: 12,
      steps: [
        {
          type: 'concept',
          title: 'True / False questions',
          body: "Comparisons produce a `bool` (`True`/`False`):\n- `==` equal, `!=` not equal\n- `<` `>` `<=` `>=`\n\nCombine with `and`, `or`, `not`.",
          code: 'print(3 > 2)          # True\nprint(3 == 4)         # False\nprint(3 > 2 and 1 < 0)# False'
        },
        {
          type: 'mcq',
          prompt: 'What does (5 >= 5) evaluate to?',
          options: ['True', 'False', '5', 'Error'],
          answer: 0,
          explanation: '`>=` means "greater than or equal to". 5 is equal to 5, so it is True.'
        },
        {
          type: 'predict',
          prompt: 'What is printed?',
          code: 'a = True\nb = False\nprint(a and b)',
          options: ['True', 'False', 'None', 'Error'],
          answer: 1,
          explanation: '`and` is only True when *both* sides are True. Here b is False.'
        },
        {
          type: 'code',
          prompt: 'Is it a teenager?',
          description: 'Write is_teen(age) that returns True if age is between 13 and 19 (inclusive), else False.',
          hints: ['You can chain comparisons: 13 <= age <= 19', 'Return that comparison directly.'],
          starter: 'def is_teen(age):\n    pass\n',
          spec: {
            functionName: 'is_teen',
            tests: [
              { input: [12], expected: false },
              { input: [13], expected: true },
              { input: [17], expected: true },
              { input: [20], expected: false }
            ]
          },
          solution: 'def is_teen(age):\n    return 13 <= age <= 19',
          solutionNote: 'Python lets you chain comparisons just like in math.'
        }
      ]
    },

    {
      id: 'b1-if',
      title: 'Making Decisions (if)',
      icon: '🔀',
      xp: 14,
      steps: [
        {
          type: 'concept',
          title: 'if / elif / else',
          body: "Run different code depending on a condition. **Indentation matters** — the indented block belongs to the `if`.",
          code: 'temp = 30\nif temp > 25:\n    print("hot")\nelif temp > 15:\n    print("mild")\nelse:\n    print("cold")'
        },
        {
          type: 'predict',
          prompt: 'What is printed?',
          code: 'x = 7\nif x % 2 == 0:\n    print("even")\nelse:\n    print("odd")',
          options: ['even', 'odd', 'nothing', 'Error'],
          answer: 1,
          explanation: '7 % 2 is 1 (not 0), so the condition is False and the `else` branch runs.'
        },
        {
          type: 'fill',
          prompt: 'Fill the keyword that runs when the if is False.',
          codeBefore: 'if score >= 50:\n    print("pass")\n',
          codeAfter: ':\n    print("fail")',
          answers: ['else'],
          explanation: '`else` handles every case the `if` did not.'
        },
        {
          type: 'code',
          prompt: 'FizzBuzz check (single number)',
          description: 'Write fizz(n): return "Fizz" if n is divisible by 3, "Buzz" if divisible by 5, "FizzBuzz" if both, otherwise the number itself (as an int).',
          approach: 'Check the "both" case first (divisible by 3 AND 5), otherwise you would never reach it.',
          hints: ['Test n % 3 == 0 and n % 5 == 0 first.', 'Return the number with `return n` for the default case.'],
          starter: 'def fizz(n):\n    pass\n',
          spec: {
            functionName: 'fizz',
            tests: [
              { input: [3], expected: 'Fizz' },
              { input: [5], expected: 'Buzz' },
              { input: [15], expected: 'FizzBuzz' },
              { input: [7], expected: 7 }
            ]
          },
          solution: 'def fizz(n):\n    if n % 3 == 0 and n % 5 == 0:\n        return "FizzBuzz"\n    if n % 3 == 0:\n        return "Fizz"\n    if n % 5 == 0:\n        return "Buzz"\n    return n',
          solutionNote: 'Order matters: handle the combined 3-and-5 case before the single cases.'
        }
      ]
    },

    {
      id: 'b1-loops',
      title: 'Loops',
      icon: '🔁',
      xp: 16,
      steps: [
        {
          type: 'concept',
          title: 'for loops repeat',
          body: "`range(n)` gives the numbers 0,1,…,n-1. A `for` loop runs its block once per value.",
          code: 'for i in range(3):\n    print(i)\n# prints 0, 1, 2'
        },
        {
          type: 'concept',
          title: 'while loops repeat until a condition fails',
          body: "A `while` loop keeps going as long as its condition is True. Make sure something changes inside, or it loops forever!",
          code: 'n = 3\nwhile n > 0:\n    print(n)\n    n = n - 1\n# prints 3, 2, 1'
        },
        {
          type: 'predict',
          prompt: 'How many numbers does this print?',
          code: 'for i in range(5):\n    print(i)',
          options: ['4', '5', '6', '0'],
          answer: 1,
          explanation: '`range(5)` is 0,1,2,3,4 — that is 5 values.'
        },
        {
          type: 'code',
          prompt: 'Sum 1 to n',
          description: 'Write sum_to(n) that returns the sum of all integers from 1 to n.',
          approach: 'Keep a running total, add each number in a loop.',
          hints: ['Start total = 0.', 'Loop `for i in range(1, n + 1)` so n is included.'],
          starter: 'def sum_to(n):\n    pass\n',
          spec: {
            functionName: 'sum_to',
            tests: [
              { input: [1], expected: 1 },
              { input: [5], expected: 15 },
              { input: [10], expected: 55 }
            ]
          },
          solution: 'def sum_to(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total',
          solutionNote: 'range(1, n+1) includes n. `total += i` is shorthand for total = total + i.'
        }
      ]
    },

    {
      id: 'b1-func',
      title: 'Functions',
      icon: '🧩',
      xp: 16,
      steps: [
        {
          type: 'concept',
          title: 'Define reusable blocks',
          body: "`def` creates a function. **Parameters** are inputs; `return` sends a value back. A function with no `return` gives back `None`.",
          code: 'def square(x):\n    return x * x\n\nprint(square(4))  # 16'
        },
        {
          type: 'mcq',
          prompt: 'What does a function return if it has no return statement?',
          options: ['0', '""', 'None', 'It crashes'],
          answer: 2,
          explanation: 'Without an explicit `return`, Python returns the special value `None`.'
        },
        {
          type: 'fill',
          prompt: 'Complete the keyword that sends a value back from a function.',
          codeBefore: 'def double(x):\n    ',
          codeAfter: ' x * 2',
          answers: ['return'],
          explanation: '`return` hands the result back to whoever called the function.'
        },
        {
          type: 'code',
          prompt: 'Max of three',
          description: 'Write max3(a, b, c) returning the largest of the three numbers. Do NOT use the built-in max().',
          approach: 'Track the biggest seen so far, comparing each value.',
          hints: ['Start with biggest = a, then compare to b and c.'],
          starter: 'def max3(a, b, c):\n    pass\n',
          spec: {
            functionName: 'max3',
            tests: [
              { input: [1, 2, 3], expected: 3 },
              { input: [9, 4, 1], expected: 9 },
              { input: [5, 8, 2], expected: 8 }
            ]
          },
          solution: 'def max3(a, b, c):\n    biggest = a\n    if b > biggest:\n        biggest = b\n    if c > biggest:\n        biggest = c\n    return biggest',
          solutionNote: 'Compare each number against the best-so-far and update when something is bigger.'
        }
      ]
    },

    {
      id: 'b1-lists',
      title: 'Lists',
      icon: '📋',
      xp: 16,
      steps: [
        {
          type: 'concept',
          title: 'Ordered collections',
          body: "A **list** holds many values in order. Index starts at 0. `append` adds, `len` counts, and you can loop over items directly.",
          code: 'nums = [10, 20, 30]\nprint(nums[0])     # 10\nnums.append(40)\nprint(len(nums))   # 4\nfor n in nums:\n    print(n)'
        },
        {
          type: 'predict',
          prompt: 'What is printed?',
          code: 'items = ["a", "b", "c"]\nprint(items[-1])',
          options: ['a', 'c', 'b', 'Error'],
          answer: 1,
          explanation: 'Negative indexing counts from the end. `-1` is the last item, "c".'
        },
        {
          type: 'mcq',
          prompt: 'How do you add 5 to the end of a list called xs?',
          options: ['xs.add(5)', 'xs.append(5)', 'xs.push(5)', 'xs + 5'],
          answer: 1,
          explanation: 'Python lists use `.append(value)` to add one item to the end.'
        },
        {
          type: 'code',
          prompt: 'Sum a list',
          description: 'Write total(nums) returning the sum of all numbers in the list. Do NOT use the built-in sum().',
          hints: ['Start a running total at 0.', 'Loop over each value and add it.'],
          starter: 'def total(nums):\n    pass\n',
          spec: {
            functionName: 'total',
            tests: [
              { input: [[1, 2, 3]], expected: 6 },
              { input: [[]], expected: 0 },
              { input: [[10, -2, 5]], expected: 13 }
            ]
          },
          solution: 'def total(nums):\n    s = 0\n    for n in nums:\n        s += n\n    return s',
          solutionNote: 'Looping and accumulating is the core pattern behind sum().'
        }
      ]
    },

    {
      id: 'b1-dicts',
      title: 'Dictionaries',
      icon: '🗂️',
      xp: 18,
      steps: [
        {
          type: 'concept',
          title: 'Key → value lookups',
          body: "A **dict** maps keys to values. Great for counting and fast lookups. Access with `d[key]`; check membership with `in`.",
          code: 'ages = {"ada": 36, "sam": 9}\nprint(ages["ada"])      # 36\nages["leo"] = 5\nprint("sam" in ages)    # True'
        },
        {
          type: 'predict',
          prompt: 'What is printed?',
          code: 'd = {"x": 1}\nd["x"] = d["x"] + 1\nprint(d["x"])',
          options: ['1', '2', 'x', 'Error'],
          answer: 1,
          explanation: 'We read d["x"] (1), add 1, and store 2 back under the same key.'
        },
        {
          type: 'concept',
          title: 'The counting pattern',
          body: "A super common use: count how many times each thing appears. `dict.get(key, 0)` returns 0 when the key is missing, so the first time is handled cleanly.",
          code: 'counts = {}\nfor ch in "banana":\n    counts[ch] = counts.get(ch, 0) + 1\nprint(counts)  # {\'b\':1,\'a\':3,\'n\':2}'
        },
        {
          type: 'code',
          prompt: 'Count letters',
          description: 'Write count_letters(text) returning a dict mapping each character to how many times it appears.',
          approach: 'Use the get(key, 0) counting pattern from the card above.',
          hints: ['Start with an empty dict {}.', 'counts[ch] = counts.get(ch, 0) + 1'],
          starter: 'def count_letters(text):\n    pass\n',
          spec: {
            functionName: 'count_letters',
            tests: [
              { input: ['aab'], expected: { a: 2, b: 1 } },
              { input: [''], expected: {} },
              { input: ['xyz'], expected: { x: 1, y: 1, z: 1 } }
            ]
          },
          solution: 'def count_letters(text):\n    counts = {}\n    for ch in text:\n        counts[ch] = counts.get(ch, 0) + 1\n    return counts',
          solutionNote: 'This frequency-count pattern shows up constantly in real problems.'
        }
      ]
    }
  ]
}

export default chapter
