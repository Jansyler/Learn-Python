// Chapter 3 — Strings & Text
// Applied string work: the methods and patterns you reach for constantly. This
// bridges the raw basics into real problem solving, so the jump to interview
// problems later feels gradual instead of sudden.

const chapter = {
  id: 'ch3',
  title: 'Strings & Text',
  subtitle: 'Clean, slice, split & build text',
  color: '#14b8a6',
  icon: 'abc',
  lessons: [
    {
      id: 's3-methods',
      title: 'String Toolkit',
      icon: 'type',
      xp: 14,
      steps: [
        {
          type: 'concept',
          title: 'Reshape text with methods',
          body: "Strings come with handy **methods** you call with a dot:\n- `.strip()` removes spaces from the ends\n- `.lower()` / `.upper()` change case\n- `.replace(a, b)` swaps text\n\nMethods return a *new* string — the original is never changed.",
          code: 's = "  Hello  "\nprint(s.strip())            # "Hello"\nprint("LOUD".lower())       # "loud"\nprint("cat".replace("c","b"))# "bat"'
        },
        {
          type: 'predict',
          prompt: 'What is printed?',
          code: 'name = "  ada  "\nprint(name.strip().upper())',
          options: ['  ADA  ', 'ADA', 'ada', 'Ada'],
          answer: 1,
          explanation: '`.strip()` trims the spaces to "ada", then `.upper()` makes it "ADA". Methods chain left to right.'
        },
        {
          type: 'mcq',
          prompt: 'Which call turns "Hi" into "HI"?',
          options: ['"Hi".upper()', '"Hi".capital()', '"Hi".toUpper()', 'upper("Hi")'],
          answer: 0,
          explanation: 'The method is `.upper()`, called on the string with a dot. The others do not exist in Python.'
        },
        {
          type: 'fill',
          prompt: 'Lower-case the text so it prints "python".',
          codeBefore: 'word = "PYTHON"\nprint(word.',
          codeAfter: '())',
          answers: ['lower'],
          explanation: '`.lower()` returns a new, all-lowercase copy of the string.'
        },
        {
          type: 'code',
          prompt: 'Normalize a name',
          description: 'Write normalize(s) that trims surrounding spaces and lower-cases the text.',
          hints: ['Chain the methods: s.strip() then .lower().', 'You can write s.strip().lower() in one go.'],
          starter: 'def normalize(s):\n    pass\n',
          spec: {
            functionName: 'normalize',
            tests: [
              { input: ['  HELLO  '], expected: 'hello' },
              { input: ['Python'], expected: 'python' },
              { input: ['  MiXeD case '], expected: 'mixed case' }
            ]
          },
          solution: 'def normalize(s):\n    return s.strip().lower()',
          solutionNote: 'Trimming then lower-casing is the classic way to clean user input before comparing it.'
        }
      ]
    },

    {
      id: 's3-loops',
      title: 'Reading Text',
      icon: 'hash',
      xp: 14,
      steps: [
        {
          type: 'concept',
          title: 'A string is a sequence of characters',
          body: "You can loop over a string one character at a time, and ask if a character is `in` it. Both are everywhere in text problems.",
          code: 'for ch in "hi":\n    print(ch)        # h then i\n\nprint("a" in "cat")  # True\nprint("z" in "cat")  # False'
        },
        {
          type: 'predict',
          prompt: 'What is printed?',
          code: 'count = 0\nfor ch in "banana":\n    if ch == "a":\n        count += 1\nprint(count)',
          options: ['2', '3', '6', '1'],
          answer: 1,
          explanation: '"banana" has three "a" characters, so count ends at 3.'
        },
        {
          type: 'code',
          prompt: 'Count the vowels',
          description: 'Write count_vowels(s) returning how many vowels (a, e, i, o, u) are in the lower-case string s.',
          approach: 'Loop over each character and check if it is one of the vowels. A string like "aeiou" is a handy membership test.',
          hints: ['Keep a running count starting at 0.', 'Use `if ch in "aeiou":` to test a vowel.'],
          starter: 'def count_vowels(s):\n    pass\n',
          spec: {
            functionName: 'count_vowels',
            tests: [
              { input: ['banana'], expected: 3 },
              { input: ['xyz'], expected: 0 },
              { input: ['aeiou'], expected: 5 }
            ]
          },
          solution: 'def count_vowels(s):\n    count = 0\n    for ch in s:\n        if ch in "aeiou":\n            count += 1\n    return count',
          solutionNote: '`ch in "aeiou"` is a quick way to ask "is this character a vowel?".'
        },
        {
          type: 'code',
          prompt: 'Count a specific character',
          description: 'Write count_char(s, ch) returning how many times character ch appears in s.',
          hints: ['Loop over s; add 1 each time the character equals ch.'],
          starter: 'def count_char(s, ch):\n    pass\n',
          spec: {
            functionName: 'count_char',
            tests: [
              { input: ['mississippi', 's'], expected: 4 },
              { input: ['hello', 'z'], expected: 0 },
              { input: ['aaa', 'a'], expected: 3 }
            ]
          },
          solution: 'def count_char(s, ch):\n    total = 0\n    for c in s:\n        if c == ch:\n            total += 1\n    return total',
          solutionNote: 'This is the same counting pattern — scan once and tally matches. (`s.count(ch)` also works!)'
        }
      ]
    },

    {
      id: 's3-split',
      title: 'Split & Join',
      icon: 'cut',
      xp: 16,
      steps: [
        {
          type: 'concept',
          title: 'Break text apart, glue it back',
          body: "`text.split()` breaks a string into a **list** of words (splitting on spaces). `\"-\".join(words)` does the reverse, gluing a list back into a string with a separator between each item.",
          code: 'parts = "a,b,c".split(",")\nprint(parts)             # [\'a\', \'b\', \'c\']\nprint(" ".join(parts))   # "a b c"\nprint("hi there".split())# [\'hi\', \'there\']'
        },
        {
          type: 'predict',
          prompt: 'What is printed?',
          code: 'words = "one two three".split()\nprint(len(words))',
          options: ['1', '3', '11', '13'],
          answer: 1,
          explanation: '`.split()` with no argument splits on whitespace into three words, so the list length is 3.'
        },
        {
          type: 'fill',
          prompt: 'Join the parts with a dash to print "a-b-c".',
          codeBefore: 'parts = ["a", "b", "c"]\nprint("-".',
          codeAfter: '(parts))',
          answers: ['join'],
          explanation: '`separator.join(list)` builds one string with the separator between each item.'
        },
        {
          type: 'code',
          prompt: 'Reverse the word order',
          description: 'Write reverse_words(s) that returns the words of s in reverse order, separated by single spaces.',
          examples: [{ in: '"hello world"', out: '"world hello"' }],
          approach: 'Split into a list of words, reverse the list with [::-1], then join with a space.',
          hints: ['s.split() gives the list of words.', 'Reverse a list with words[::-1].', 'Glue back with " ".join(...).'],
          starter: 'def reverse_words(s):\n    pass\n',
          spec: {
            functionName: 'reverse_words',
            tests: [
              { input: ['hello world'], expected: 'world hello' },
              { input: ['one two three'], expected: 'three two one' },
              { input: ['python'], expected: 'python' }
            ]
          },
          solution: 'def reverse_words(s):\n    return " ".join(s.split()[::-1])',
          solutionNote: 'Split → reverse → join is a tiny pipeline that solves a surprising number of text problems.'
        }
      ]
    },

    {
      id: 's3-build',
      title: 'Text Challenges',
      icon: 'mirror',
      xp: 18,
      steps: [
        {
          type: 'concept',
          title: 'Put the toolkit to work',
          body: "Time to combine slicing, looping and splitting on real little problems. These are the exact muscles the interview problems later will lean on.",
          code: 'word = "level"\nprint(word == word[::-1])  # True — it reads the same backwards'
        },
        {
          type: 'code',
          prompt: 'Is it a palindrome?',
          description: 'Write is_palindrome(s) that returns True if the (already clean, lower-case) string reads the same forwards and backwards.',
          approach: 'A string is a palindrome when it equals its own reverse. Slicing with [::-1] reverses it.',
          hints: ['Reverse with s[::-1].', 'Compare s to its reverse and return the result directly.'],
          starter: 'def is_palindrome(s):\n    pass\n',
          spec: {
            functionName: 'is_palindrome',
            tests: [
              { input: ['racecar'], expected: true },
              { input: ['hello'], expected: false },
              { input: ['abba'], expected: true },
              { input: [''], expected: true }
            ]
          },
          solution: 'def is_palindrome(s):\n    return s == s[::-1]',
          solutionNote: 'Comparing a sequence to its reverse is the cleanest palindrome check there is.'
        },
        {
          type: 'code',
          prompt: 'Count the words',
          description: 'Write count_words(s) returning the number of words in s (words are separated by spaces).',
          hints: ['s.split() gives the list of words.', 'len(...) counts the items. An empty string has 0 words.'],
          starter: 'def count_words(s):\n    pass\n',
          spec: {
            functionName: 'count_words',
            tests: [
              { input: ['hello world'], expected: 2 },
              { input: [''], expected: 0 },
              { input: ['one two three four'], expected: 4 }
            ]
          },
          solution: 'def count_words(s):\n    return len(s.split())',
          solutionNote: '`split()` conveniently returns an empty list for an empty string, so the count is 0.'
        }
      ]
    }
  ]
}

export default chapter
