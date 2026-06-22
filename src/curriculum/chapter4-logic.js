// Chapter 4 — Logic & Problem Solving
// Friendly, un-branded warm-up problems that build the "turn an idea into code"
// muscle: branching, accumulating in loops, and transforming lists. This is the
// final ramp before the first real LeetCode chapter.

const chapter = {
  id: 'ch4',
  title: 'Logic & Problem Solving',
  subtitle: 'Turn ideas into working code',
  color: '#6366f1',
  icon: 'target',
  lessons: [
    {
      id: 'l4-branch',
      title: 'Branching Logic',
      icon: 'shuffle',
      xp: 16,
      steps: [
        {
          type: 'concept',
          title: 'Choosing with if / elif / else',
          body: "Most logic is just picking the right branch. Order matters: Python checks conditions top to bottom and runs the **first** one that is True. Returning inside a branch ends the function right away.",
          code: 'def label(n):\n    if n > 0:\n        return "positive"\n    elif n < 0:\n        return "negative"\n    else:\n        return "zero"'
        },
        {
          type: 'predict',
          prompt: 'What does label(-4) return?',
          code: 'def label(n):\n    if n > 0:\n        return "positive"\n    elif n < 0:\n        return "negative"\n    return "zero"',
          options: ['positive', 'negative', 'zero', 'None'],
          answer: 1,
          explanation: '-4 is not > 0, but it is < 0, so the second branch runs and returns "negative".'
        },
        {
          type: 'code',
          prompt: 'Describe a number',
          description: 'Write sign(n) returning "positive" if n > 0, "negative" if n < 0, and "zero" if it is 0.',
          hints: ['Handle the three cases with if / elif / else.', 'Return the right word in each branch.'],
          starter: 'def sign(n):\n    pass\n',
          spec: {
            functionName: 'sign',
            tests: [
              { input: [5], expected: 'positive' },
              { input: [-3], expected: 'negative' },
              { input: [0], expected: 'zero' }
            ]
          },
          solution: 'def sign(n):\n    if n > 0:\n        return "positive"\n    elif n < 0:\n        return "negative"\n    else:\n        return "zero"',
          solutionNote: 'Three mutually-exclusive cases map cleanly to if / elif / else.'
        },
        {
          type: 'code',
          prompt: 'Letter grade',
          description: 'Write letter_grade(score): 90+ is "A", 80–89 "B", 70–79 "C", 60–69 "D", below 60 "F".',
          approach: 'Check the highest cutoff first. Once you go top-down, each branch only needs a single >= test.',
          hints: ['Start with `if score >= 90: return "A"`.', 'Keep going down: 80, 70, 60, else "F".'],
          starter: 'def letter_grade(score):\n    pass\n',
          spec: {
            functionName: 'letter_grade',
            tests: [
              { input: [95], expected: 'A' },
              { input: [82], expected: 'B' },
              { input: [71], expected: 'C' },
              { input: [60], expected: 'D' },
              { input: [40], expected: 'F' }
            ]
          },
          solution: 'def letter_grade(score):\n    if score >= 90:\n        return "A"\n    if score >= 80:\n        return "B"\n    if score >= 70:\n        return "C"\n    if score >= 60:\n        return "D"\n    return "F"',
          solutionNote: 'Testing from the top down means a passing branch already rules out everything above it.'
        }
      ]
    },

    {
      id: 'l4-loops',
      title: 'Loop Patterns',
      icon: 'loop',
      xp: 16,
      steps: [
        {
          type: 'concept',
          title: 'Accumulate, count, find',
          body: "Three patterns cover most loops:\n- **Accumulate** — keep a running total or list.\n- **Count** — add 1 when a condition holds.\n- **Find** — track the best-so-far (max, min) as you scan.\n\nThey all start with a variable *before* the loop and update it *inside*.",
          code: 'best = nums[0]\nfor n in nums:\n    if n > best:\n        best = n\n# best is now the largest value'
        },
        {
          type: 'code',
          prompt: 'Largest value',
          description: 'Write find_max(nums) returning the largest number in the non-empty list. Do NOT use the built-in max().',
          approach: 'Start with the first item as the best, then update whenever you see something bigger.',
          hints: ['best = nums[0] before the loop.', 'If n > best, set best = n.'],
          starter: 'def find_max(nums):\n    pass\n',
          spec: {
            functionName: 'find_max',
            tests: [
              { input: [[3, 1, 4, 1, 5]], expected: 5 },
              { input: [[-2, -7, -1]], expected: -1 },
              { input: [[42]], expected: 42 }
            ]
          },
          solution: 'def find_max(nums):\n    best = nums[0]\n    for n in nums:\n        if n > best:\n            best = n\n    return best',
          solutionNote: 'The "best so far" pattern is the foundation for tons of array problems.'
        },
        {
          type: 'code',
          prompt: 'Count the positives',
          description: 'Write count_positives(nums) returning how many numbers in the list are greater than 0.',
          hints: ['Start count = 0.', 'Add 1 whenever n > 0.'],
          starter: 'def count_positives(nums):\n    pass\n',
          spec: {
            functionName: 'count_positives',
            tests: [
              { input: [[-1, 2, 3, -4]], expected: 2 },
              { input: [[0, 0]], expected: 0 },
              { input: [[5, 5, 5]], expected: 3 }
            ]
          },
          solution: 'def count_positives(nums):\n    count = 0\n    for n in nums:\n        if n > 0:\n            count += 1\n    return count',
          solutionNote: 'Counting is just accumulating by 1 whenever a condition is met.'
        }
      ]
    },

    {
      id: 'l4-transform',
      title: 'Transform & Filter',
      icon: 'sparkle',
      xp: 16,
      steps: [
        {
          type: 'concept',
          title: 'Make a new list from an old one',
          body: "Two everyday jobs:\n- **Transform** — apply something to every item (e.g. square it).\n- **Filter** — keep only the items that pass a test.\n\nA list comprehension does either in one line: `[expr for x in seq if cond]`.",
          code: 'nums = [1, 2, 3, 4]\nprint([n*n for n in nums])          # [1, 4, 9, 16]\nprint([n for n in nums if n % 2 == 0])# [2, 4]'
        },
        {
          type: 'predict',
          prompt: 'What is printed?',
          code: 'print([n + 1 for n in [10, 20, 30]])',
          options: ['[10, 20, 30]', '[11, 21, 31]', '[1, 1, 1]', '[11, 20, 30]'],
          answer: 1,
          explanation: 'Each item has 1 added to it: 10→11, 20→21, 30→31.'
        },
        {
          type: 'code',
          prompt: 'Square every number',
          description: 'Write squares(nums) returning a new list with each number squared, in the same order.',
          hints: ['Use a comprehension: [n*n for n in nums].'],
          starter: 'def squares(nums):\n    pass\n',
          spec: {
            functionName: 'squares',
            tests: [
              { input: [[1, 2, 3]], expected: [1, 4, 9] },
              { input: [[]], expected: [] },
              { input: [[-2, 5]], expected: [4, 25] }
            ]
          },
          solution: 'def squares(nums):\n    return [n * n for n in nums]',
          solutionNote: 'Transforming every element is the most common comprehension there is.'
        },
        {
          type: 'code',
          prompt: 'Keep the even numbers',
          description: 'Write only_evens(nums) returning a new list with just the even numbers, in order.',
          hints: ['A number is even when n % 2 == 0.', 'Filter with [n for n in nums if n % 2 == 0].'],
          starter: 'def only_evens(nums):\n    pass\n',
          spec: {
            functionName: 'only_evens',
            tests: [
              { input: [[1, 2, 3, 4]], expected: [2, 4] },
              { input: [[1, 3, 5]], expected: [] },
              { input: [[2, 4, 6]], expected: [2, 4, 6] }
            ]
          },
          solution: 'def only_evens(nums):\n    return [n for n in nums if n % 2 == 0]',
          solutionNote: 'The `if` at the end of a comprehension filters items as you build the list.'
        }
      ]
    },

    {
      id: 'l4-together',
      title: 'Put It Together',
      icon: 'puzzle',
      xp: 20,
      steps: [
        {
          type: 'concept',
          title: 'Combine the patterns',
          body: "These last two problems mix branching, looping and lists — exactly the way real problems do. Take them one small step at a time. You are ready for this.",
          code: 'result = []\nfor i in range(1, 4):\n    result.append(i)\nprint(result)  # [1, 2, 3]'
        },
        {
          type: 'code',
          prompt: 'FizzBuzz, as a list',
          description: 'Write fizzbuzz_upto(n) returning a list for 1..n: "FizzBuzz" if divisible by 3 and 5, "Fizz" if by 3, "Buzz" if by 5, otherwise the number itself.',
          examples: [{ in: 'n = 5', out: '[1, 2, "Fizz", 4, "Buzz"]' }],
          approach: 'Build a result list. For each i, check the "both" case first, then 3, then 5, else append the number.',
          hints: ['Loop `for i in range(1, n + 1)`.', 'Check i % 3 == 0 and i % 5 == 0 first.', 'Append to a result list and return it.'],
          starter: 'def fizzbuzz_upto(n):\n    pass\n',
          spec: {
            functionName: 'fizzbuzz_upto',
            tests: [
              { input: [3], expected: [1, 2, 'Fizz'] },
              { input: [5], expected: [1, 2, 'Fizz', 4, 'Buzz'] },
              { input: [15], expected: [1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz'] }
            ]
          },
          solution: 'def fizzbuzz_upto(n):\n    result = []\n    for i in range(1, n + 1):\n        if i % 3 == 0 and i % 5 == 0:\n            result.append("FizzBuzz")\n        elif i % 3 == 0:\n            result.append("Fizz")\n        elif i % 5 == 0:\n            result.append("Buzz")\n        else:\n            result.append(i)\n    return result',
          solutionNote: 'The classic warm-up: order the checks so the combined 3-and-5 case is handled first.'
        },
        {
          type: 'code',
          prompt: 'Second largest',
          description: 'Write second_largest(nums) returning the second largest DISTINCT value. Assume at least two different values exist.',
          approach: 'set(nums) drops duplicates; sorted() puts them in order; index -2 is the second from the end.',
          hints: ['Remove duplicates with set(nums).', 'sorted(...)[-2] is the second largest after sorting.'],
          starter: 'def second_largest(nums):\n    pass\n',
          spec: {
            functionName: 'second_largest',
            tests: [
              { input: [[3, 1, 4, 1, 5]], expected: 4 },
              { input: [[10, 20]], expected: 10 },
              { input: [[7, 7, 2]], expected: 2 }
            ]
          },
          solution: 'def second_largest(nums):\n    return sorted(set(nums))[-2]',
          solutionNote: 'Dedupe → sort → take the second-from-last. Short, but it leans on three ideas at once.'
        }
      ]
    }
  ]
}

export default chapter
