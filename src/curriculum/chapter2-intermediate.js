// Chapter 2 — Pythonic Tools
// Idioms that make you fast and that show up constantly in interview problems.

const chapter = {
  id: 'ch2',
  title: 'Pythonic Tools',
  subtitle: 'Slicing, comprehensions, sets & more',
  color: '#1cb0f6',
  icon: 'gear',
  lessons: [
    {
      id: 'b2-slicing',
      title: 'Slicing',
      icon: 'cut',
      xp: 16,
      steps: [
        {
          type: 'concept',
          title: 'Grab parts of a sequence',
          body: "`seq[start:stop]` gives items from start up to (but not including) stop. Leave a side blank for the edge. `seq[::-1]` reverses.",
          code: 's = "python"\nprint(s[0:3])   # pyt\nprint(s[2:])    # thon\nprint(s[:2])    # py\nprint(s[::-1])  # nohtyp'
        },
        {
          type: 'predict',
          prompt: 'What is printed?',
          code: 'nums = [0, 1, 2, 3, 4]\nprint(nums[1:4])',
          options: ['[1, 2, 3]', '[1, 2, 3, 4]', '[0, 1, 2, 3]', '[2, 3, 4]'],
          answer: 0,
          explanation: 'Start at index 1, stop *before* index 4 → items 1, 2, 3.'
        },
        {
          type: 'code',
          prompt: 'Reverse a string',
          description: 'Write reverse(s) that returns the string reversed. Use slicing.',
          hints: ['s[::-1] reverses any sequence.'],
          starter: 'def reverse(s):\n    pass\n',
          spec: {
            functionName: 'reverse',
            tests: [
              { input: ['abc'], expected: 'cba' },
              { input: [''], expected: '' },
              { input: ['racecar'], expected: 'racecar' }
            ]
          },
          solution: 'def reverse(s):\n    return s[::-1]',
          solutionNote: 'The step of -1 walks the string backwards.'
        }
      ]
    },

    {
      id: 'b2-comprehensions',
      title: 'List Comprehensions',
      icon: 'sparkle',
      xp: 18,
      steps: [
        {
          type: 'concept',
          title: 'Build lists in one line',
          body: "`[expr for x in seq]` transforms a sequence. Add `if cond` to filter. It replaces many simple loops.",
          code: 'squares = [n*n for n in range(5)]\nprint(squares)            # [0,1,4,9,16]\nevens = [n for n in range(10) if n % 2 == 0]\nprint(evens)              # [0,2,4,6,8]'
        },
        {
          type: 'predict',
          prompt: 'What is printed?',
          code: 'print([x*2 for x in [1, 2, 3]])',
          options: ['[1, 2, 3]', '[2, 4, 6]', '[1, 4, 9]', '[2, 2, 2]'],
          answer: 1,
          explanation: 'Each x is doubled: 1→2, 2→4, 3→6.'
        },
        {
          type: 'code',
          prompt: 'Keep the positives',
          description: 'Write positives(nums) returning a new list with only the values greater than 0, in the same order.',
          hints: ['Use a comprehension with an if filter.', '[n for n in nums if n > 0]'],
          starter: 'def positives(nums):\n    pass\n',
          spec: {
            functionName: 'positives',
            tests: [
              { input: [[-1, 2, -3, 4]], expected: [2, 4] },
              { input: [[0, -5]], expected: [] },
              { input: [[1, 2, 3]], expected: [1, 2, 3] }
            ]
          },
          solution: 'def positives(nums):\n    return [n for n in nums if n > 0]',
          solutionNote: 'The `if n > 0` keeps only values that pass the test.'
        }
      ]
    },

    {
      id: 'b2-sets',
      title: 'Sets',
      icon: 'target',
      xp: 16,
      steps: [
        {
          type: 'concept',
          title: 'Unique items, fast membership',
          body: "A **set** holds unique values and checks `in` very fast. Perfect for removing duplicates or remembering what you have already seen.",
          code: 'seen = set()\nseen.add(3)\nseen.add(3)\nprint(seen)          # {3}\nprint(2 in seen)     # False\nprint(set([1,1,2,3])) # {1,2,3}'
        },
        {
          type: 'mcq',
          prompt: 'What is len(set([1, 1, 2, 2, 3]))?',
          options: ['5', '3', '2', '1'],
          answer: 1,
          explanation: 'A set drops duplicates, leaving {1, 2, 3} — length 3.'
        },
        {
          type: 'code',
          prompt: 'Has duplicates?',
          description: 'Write has_dupes(nums): return True if any value appears more than once, else False.',
          approach: 'If the set of the list is smaller than the list, something was a duplicate.',
          hints: ['Compare len(set(nums)) to len(nums).'],
          starter: 'def has_dupes(nums):\n    pass\n',
          spec: {
            functionName: 'has_dupes',
            tests: [
              { input: [[1, 2, 3]], expected: false },
              { input: [[1, 2, 2]], expected: true },
              { input: [[]], expected: false }
            ]
          },
          solution: 'def has_dupes(nums):\n    return len(set(nums)) < len(nums)',
          solutionNote: 'Removing duplicates shrinks the collection only if duplicates existed.'
        }
      ]
    },

    {
      id: 'b2-enumerate',
      title: 'enumerate & zip',
      icon: 'link',
      xp: 16,
      steps: [
        {
          type: 'concept',
          title: 'Index + value, and pairing up',
          body: "`enumerate(seq)` gives `(index, value)` pairs while looping. `zip(a, b)` walks two sequences together.",
          code: 'for i, ch in enumerate("ab"):\n    print(i, ch)      # 0 a / 1 b\n\nfor name, age in zip(["a","b"], [1,2]):\n    print(name, age)  # a 1 / b 2'
        },
        {
          type: 'code',
          prompt: 'Find the index',
          description: 'Write first_index(nums, target) returning the index of the first occurrence of target, or -1 if missing. Use enumerate.',
          hints: ['Loop with enumerate; return i when nums[i] == target.', 'If the loop finishes, return -1.'],
          starter: 'def first_index(nums, target):\n    pass\n',
          spec: {
            functionName: 'first_index',
            tests: [
              { input: [[5, 6, 7], 6], expected: 1 },
              { input: [[1, 1, 1], 1], expected: 0 },
              { input: [[1, 2, 3], 9], expected: -1 }
            ]
          },
          solution: 'def first_index(nums, target):\n    for i, n in enumerate(nums):\n        if n == target:\n            return i\n    return -1',
          solutionNote: 'enumerate hands you both the position and the value each step.'
        }
      ]
    },

    {
      id: 'b2-tuples',
      title: 'Tuples & Unpacking',
      icon: 'link',
      xp: 16,
      steps: [
        {
          type: 'concept',
          title: 'Group values that travel together',
          body: "A **tuple** is like a list you cannot change: `point = (3, 4)`. The magic is **unpacking** — assign several variables at once, which makes swapping values a one-liner.",
          code: 'point = (3, 4)\nx, y = point        # x=3, y=4\na, b = 1, 2\na, b = b, a          # swap! now a=2, b=1\nprint(a, b)          # 2 1'
        },
        {
          type: 'predict',
          prompt: 'What is printed?',
          code: 'a, b = 5, 9\na, b = b, a\nprint(a, b)',
          options: ['5 9', '9 5', '5 5', '9 9'],
          answer: 1,
          explanation: 'The right side (b, a) = (9, 5) is built first, then unpacked into a and b — a clean swap.'
        },
        {
          type: 'code',
          prompt: 'Swap a pair',
          description: 'Write swap(a, b) returning a tuple (b, a) — the two values in the opposite order.',
          hints: ['You can return a tuple directly: return (b, a).'],
          starter: 'def swap(a, b):\n    pass\n',
          spec: {
            functionName: 'swap',
            tests: [
              { input: [1, 2], expected: [2, 1] },
              { input: [9, 4], expected: [4, 9] },
              { input: [0, 0], expected: [0, 0] }
            ]
          },
          solution: 'def swap(a, b):\n    return (b, a)',
          solutionNote: 'Returning a tuple is how a function hands back more than one value at once.'
        }
      ]
    },

    {
      id: 'b2-dictcomp',
      title: 'Dict & Set Builds',
      icon: 'sparkle',
      xp: 18,
      steps: [
        {
          type: 'concept',
          title: 'Comprehensions for dicts and sets',
          body: "The comprehension idea works beyond lists:\n- `{k: v for ...}` builds a **dict**\n- `{x for ...}` builds a **set** (unique values)\n\nGreat for turning a sequence into a lookup table in one line.",
          code: 'nums = [1, 2, 3]\nprint({n: n*n for n in nums})  # {1:1, 2:4, 3:9}\nwords = ["a", "bb", "a"]\nprint({w for w in words})      # {\'a\', \'bb\'}'
        },
        {
          type: 'predict',
          prompt: 'How many items are in this set?',
          code: 'print(len({len(w) for w in ["a", "bb", "cc", "ddd"]}))',
          options: ['4', '3', '2', '1'],
          answer: 1,
          explanation: 'The lengths are 1, 2, 2, 3. A set keeps only unique values: {1, 2, 3} — three items.'
        },
        {
          type: 'code',
          prompt: 'Map numbers to squares',
          description: 'Write square_map(nums) returning a dict mapping each number to its square.',
          examples: [{ in: '[1, 2, 3]', out: '{1: 1, 2: 4, 3: 9}' }],
          hints: ['Use a dict comprehension: {n: n*n for n in nums}.'],
          starter: 'def square_map(nums):\n    pass\n',
          spec: {
            functionName: 'square_map',
            tests: [
              { input: [[1, 2, 3]], expected: { 1: 1, 2: 4, 3: 9 } },
              { input: [[]], expected: {} },
              { input: [[5]], expected: { 5: 25 } }
            ]
          },
          solution: 'def square_map(nums):\n    return {n: n * n for n in nums}',
          solutionNote: 'A dict comprehension builds a whole lookup table in a single, readable line.'
        }
      ]
    },

    {
      id: 'b2-sorting',
      title: 'Sorting',
      icon: 'trend',
      xp: 18,
      steps: [
        {
          type: 'concept',
          title: 'sorted() and the key trick',
          body: "`sorted(seq)` returns a new sorted list. Add `reverse=True` for descending. The real power is `key=` — a function that decides what to sort *by* (e.g. length, or the second item).",
          code: 'print(sorted([3, 1, 2]))               # [1, 2, 3]\nprint(sorted([3, 1, 2], reverse=True)) # [3, 2, 1]\nprint(sorted(["bbb", "a", "cc"], key=len)) # [\'a\', \'cc\', \'bbb\']'
        },
        {
          type: 'predict',
          prompt: 'What is printed?',
          code: 'print(sorted([5, 2, 8, 1])[0])',
          options: ['8', '1', '5', '2'],
          answer: 1,
          explanation: 'Sorting gives [1, 2, 5, 8]; index 0 is the smallest, 1.'
        },
        {
          type: 'code',
          prompt: 'Sort by length',
          description: 'Write by_length(words) returning the words sorted from shortest to longest. Ties keep their original order.',
          approach: 'Pass key=len to sorted so it compares the length of each word instead of the word itself.',
          hints: ['sorted(words, key=len) sorts by length.'],
          starter: 'def by_length(words):\n    pass\n',
          spec: {
            functionName: 'by_length',
            tests: [
              { input: [['bbb', 'a', 'cc']], expected: ['a', 'cc', 'bbb'] },
              { input: [['hi', 'a']], expected: ['a', 'hi'] },
              { input: [[]], expected: [] }
            ]
          },
          solution: 'def by_length(words):\n    return sorted(words, key=len)',
          solutionNote: 'Python’s sort is stable, so equal-length words stay in their original order.'
        }
      ]
    }
  ]
}

export default chapter
