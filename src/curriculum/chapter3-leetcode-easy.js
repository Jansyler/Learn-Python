// Chapter 3 — LeetCode: Easy
// Real interview problems, each described precisely the way LeetCode states
// them, plus a guided approach, hints, runnable tests and a full solution.

const chapter = {
  id: 'ch3',
  title: 'LeetCode · Easy',
  subtitle: 'Your first real interview problems',
  color: '#ce82ff',
  icon: 'brain',
  lessons: [
    {
      id: 'lc-twosum',
      title: 'Two Sum',
      icon: 'plus',
      xp: 25,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Given an array of integers `nums` and an integer `target`, return the **indices** of the two numbers that add up to `target`.\n\nYou may assume exactly one solution exists, and you may not use the same element twice. Return the indices in increasing order.",
          code: 'Input:  nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]   # because nums[0] + nums[1] == 9'
        },
        {
          type: 'concept',
          title: 'The key idea (hash map)',
          body: "For each number `n`, the partner you need is `target - n`. As you scan left to right, remember every number you have seen in a **dict** mapping value → index. Before storing `n`, check if its partner is already in the dict — if so, you found the pair.\n\nThis turns a slow O(n²) double-loop into a fast **O(n)** single pass.",
          code: 'need = target - n  # the partner that completes the pair\nif need in seen:\n    return [seen[need], i]'
        },
        {
          type: 'mcq',
          prompt: 'Why is the hash-map approach faster than checking every pair?',
          options: [
            'It sorts the array first',
            'Looking up a partner in a dict is O(1), so we avoid the inner loop',
            'It uses less memory',
            'It only works on sorted input'
          ],
          answer: 1,
          explanation: 'Dict membership/lookups are average O(1). One pass with O(1) lookups is O(n) overall, versus O(n²) for nested loops.'
        },
        {
          type: 'code',
          prompt: 'Solve Two Sum',
          description: 'Return the indices [i, j] (i < j) of the two numbers in nums that sum to target.',
          examples: [
            { in: 'nums = [2,7,11,15], target = 9', out: '[0, 1]' },
            { in: 'nums = [3,2,4], target = 6', out: '[1, 2]' },
            { in: 'nums = [3,3], target = 6', out: '[0, 1]' }
          ],
          constraints: ['2 <= len(nums) <= 10^4', 'Exactly one valid answer exists'],
          hints: [
            'Keep a dict `seen` mapping value -> its index.',
            'For each (i, n): the partner is target - n.',
            'If the partner is already in `seen`, return [seen[partner], i].'
          ],
          starter: 'def two_sum(nums, target):\n    # return [i, j] with nums[i] + nums[j] == target\n    pass\n',
          spec: {
            functionName: 'two_sum',
            tests: [
              { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
              { input: [[3, 2, 4], 6], expected: [1, 2] },
              { input: [[3, 3], 6], expected: [0, 1] },
              { input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4] }
            ]
          },
          solution: 'def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        need = target - n\n        if need in seen:\n            return [seen[need], i]\n        seen[n] = i\n    return []',
          solutionNote: 'We store each number only after checking for its partner, which guarantees i < j and never reuses an element.'
        }
      ]
    },

    {
      id: 'lc-palindrome-num',
      title: 'Palindrome Number',
      icon: 'mirror',
      xp: 22,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Given an integer `x`, return `True` if `x` reads the same forwards and backwards, otherwise `False`.\n\nNote: any negative number is **not** a palindrome because of the leading minus sign.",
          code: 'Input: x = 121   -> True\nInput: x = -121  -> False  (reads 121-)\nInput: x = 10    -> False  (reads 01)'
        },
        {
          type: 'concept',
          title: 'Two ways to think about it',
          body: "The simplest: turn the number into a string and compare it to its reverse.\n\nA more 'mathy' way avoids strings by rebuilding the number digit by digit with `% 10` and `// 10`. Either is fine for Easy.",
          code: 's = str(x)\nreturn s == s[::-1]'
        },
        {
          type: 'predict',
          prompt: 'What does str(-121)[::-1] produce?',
          code: 'print(str(-121)[::-1])',
          options: ['121-', '-121', '121', 'Error'],
          answer: 0,
          explanation: 'Reversing the string "-121" moves the minus sign to the end → "121-", which is why negatives are never palindromes.'
        },
        {
          type: 'code',
          prompt: 'Solve Palindrome Number',
          description: 'Return True if the integer x is a palindrome.',
          examples: [
            { in: 'x = 121', out: 'True' },
            { in: 'x = -121', out: 'False' },
            { in: 'x = 10', out: 'False' }
          ],
          constraints: ['-2^31 <= x <= 2^31 - 1'],
          hints: ['Negatives can short-circuit to False.', 'Compare str(x) to str(x)[::-1].'],
          starter: 'def is_palindrome(x):\n    pass\n',
          spec: {
            functionName: 'is_palindrome',
            tests: [
              { input: [121], expected: true },
              { input: [-121], expected: false },
              { input: [10], expected: false },
              { input: [0], expected: true },
              { input: [12321], expected: true }
            ]
          },
          solution: 'def is_palindrome(x):\n    if x < 0:\n        return False\n    s = str(x)\n    return s == s[::-1]',
          solutionNote: 'The explicit negative check is optional (the string compare already handles it) but makes the intent clear.'
        }
      ]
    },

    {
      id: 'lc-valid-anagram',
      title: 'Valid Anagram',
      icon: 'abc',
      xp: 24,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Given two strings `s` and `t`, return `True` if `t` is an **anagram** of `s` — i.e. it uses exactly the same letters the same number of times, just reordered.",
          code: 'Input: s = "anagram", t = "nagaram" -> True\nInput: s = "rat",     t = "car"     -> False'
        },
        {
          type: 'concept',
          title: 'Two clean approaches',
          body: "1. **Sort both** and compare: `sorted(s) == sorted(t)`. Simple, O(n log n).\n2. **Count letters** in each and compare the counts. O(n) and shows off the frequency-count pattern.\n\nEither way, if the lengths differ they cannot be anagrams.",
          code: 'return sorted(s) == sorted(t)'
        },
        {
          type: 'mcq',
          prompt: 'If len(s) != len(t), what can you conclude immediately?',
          options: [
            'They are anagrams',
            'They cannot be anagrams',
            'You must still count letters',
            'Nothing'
          ],
          answer: 1,
          explanation: 'Anagrams must use exactly the same letters, so different lengths rule it out instantly.'
        },
        {
          type: 'code',
          prompt: 'Solve Valid Anagram',
          description: 'Return True if t is an anagram of s.',
          examples: [
            { in: 's = "anagram", t = "nagaram"', out: 'True' },
            { in: 's = "rat", t = "car"', out: 'False' }
          ],
          constraints: ['1 <= len(s), len(t) <= 5 * 10^4', 's and t consist of lowercase letters'],
          hints: [
            'Quick reject: if lengths differ, return False.',
            'Easiest correct answer: return sorted(s) == sorted(t).',
            'For O(n): build a count dict for each and compare.'
          ],
          starter: 'def is_anagram(s, t):\n    pass\n',
          spec: {
            functionName: 'is_anagram',
            tests: [
              { input: ['anagram', 'nagaram'], expected: true },
              { input: ['rat', 'car'], expected: false },
              { input: ['a', 'ab'], expected: false },
              { input: ['', ''], expected: true }
            ]
          },
          solution: "def is_anagram(s, t):\n    if len(s) != len(t):\n        return False\n    counts = {}\n    for ch in s:\n        counts[ch] = counts.get(ch, 0) + 1\n    for ch in t:\n        if counts.get(ch, 0) == 0:\n            return False\n        counts[ch] -= 1\n    return True",
          solutionNote: 'We tally letters from s, then "spend" them with t. If t ever needs a letter we are out of, it is not an anagram.'
        }
      ]
    },

    {
      id: 'lc-contains-dup',
      title: 'Contains Duplicate',
      icon: 'recycle',
      xp: 20,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Given an integer array `nums`, return `True` if any value appears **at least twice**, and `False` if every element is distinct.",
          code: 'Input: [1,2,3,1] -> True\nInput: [1,2,3,4] -> False'
        },
        {
          type: 'concept',
          title: 'Use a set',
          body: "A `set` automatically drops duplicates. If the set of the array is smaller than the array, a duplicate existed. One line, O(n).",
          code: 'return len(set(nums)) != len(nums)'
        },
        {
          type: 'code',
          prompt: 'Solve Contains Duplicate',
          description: 'Return True if nums contains any duplicate value.',
          examples: [
            { in: '[1,2,3,1]', out: 'True' },
            { in: '[1,2,3,4]', out: 'False' }
          ],
          constraints: ['1 <= len(nums) <= 10^5'],
          hints: ['Compare len(set(nums)) with len(nums).', 'Or scan and add to a set, returning True on first repeat.'],
          starter: 'def contains_duplicate(nums):\n    pass\n',
          spec: {
            functionName: 'contains_duplicate',
            tests: [
              { input: [[1, 2, 3, 1]], expected: true },
              { input: [[1, 2, 3, 4]], expected: false },
              { input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
              { input: [[7]], expected: false }
            ]
          },
          solution: 'def contains_duplicate(nums):\n    seen = set()\n    for n in nums:\n        if n in seen:\n            return True\n        seen.add(n)\n    return False',
          solutionNote: 'The early-exit version stops the moment it sees a repeat, which can be faster than building the whole set.'
        }
      ]
    },

    {
      id: 'lc-best-stock',
      title: 'Best Time to Buy & Sell Stock',
      icon: 'trend',
      xp: 28,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "`prices[i]` is the stock price on day `i`. You may buy on one day and sell on a **later** day. Return the maximum profit you can make. If no profit is possible, return `0`.",
          code: 'Input: [7,1,5,3,6,4] -> 5   (buy at 1, sell at 6)\nInput: [7,6,4,3,1]   -> 0   (only drops)'
        },
        {
          type: 'concept',
          title: 'Track the cheapest day so far',
          body: "Scan once. Keep `min_price`, the lowest price seen up to now. At each day, the best profit *if you sold today* is `price - min_price`. Keep the best of those. O(n), O(1) memory.",
          code: 'min_price = min(min_price, price)\nbest = max(best, price - min_price)'
        },
        {
          type: 'predict',
          prompt: 'For prices [2, 4, 1], what is the answer?',
          code: '# buy low, sell higher LATER',
          options: ['2', '3', '0', '-1'],
          answer: 0,
          explanation: 'Buy at 2, sell at 4 → profit 2. The later 1 is cheaper but there is no future day to sell into.'
        },
        {
          type: 'code',
          prompt: 'Solve Best Time to Buy & Sell Stock',
          description: 'Return the maximum profit from one buy and one later sell, or 0 if none.',
          examples: [
            { in: '[7,1,5,3,6,4]', out: '5' },
            { in: '[7,6,4,3,1]', out: '0' }
          ],
          constraints: ['1 <= len(prices) <= 10^5', '0 <= prices[i] <= 10^4'],
          hints: [
            'Initialize min_price to the first price (or infinity).',
            'For each price: update min_price, then update best with price - min_price.'
          ],
          starter: 'def max_profit(prices):\n    pass\n',
          spec: {
            functionName: 'max_profit',
            tests: [
              { input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
              { input: [[7, 6, 4, 3, 1]], expected: 0 },
              { input: [[1, 2]], expected: 1 },
              { input: [[2, 4, 1]], expected: 2 }
            ]
          },
          solution: 'def max_profit(prices):\n    min_price = float("inf")\n    best = 0\n    for price in prices:\n        if price < min_price:\n            min_price = price\n        elif price - min_price > best:\n            best = price - min_price\n    return best',
          solutionNote: 'Because min_price only ever looks at earlier days, every profit we consider respects the buy-before-sell rule.'
        }
      ]
    },

    {
      id: 'lc-valid-palindrome',
      title: 'Valid Palindrome',
      icon: 'loop',
      xp: 26,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Given a string `s`, return `True` if it is a palindrome considering **only letters and digits**, and ignoring **case**. All other characters (spaces, punctuation) are skipped.",
          code: 'Input: "A man, a plan, a canal: Panama" -> True\nInput: "race a car" -> False'
        },
        {
          type: 'concept',
          title: 'Clean, then compare',
          body: "First keep only alphanumeric characters, lower-cased. Then check if that cleaned string equals its reverse. `str.isalnum()` and `str.lower()` do the heavy lifting.",
          code: 'cleaned = [c.lower() for c in s if c.isalnum()]\nreturn cleaned == cleaned[::-1]'
        },
        {
          type: 'mcq',
          prompt: 'What does "Ab!".isalnum() style filtering keep?',
          code: 'cleaned = [c for c in "Ab!" if c.isalnum()]',
          options: ['["A", "b", "!"]', '["A", "b"]', '["b"]', '[]'],
          answer: 1,
          explanation: '`isalnum()` is True for letters and digits, so "!" is dropped, leaving ["A", "b"].'
        },
        {
          type: 'code',
          prompt: 'Solve Valid Palindrome',
          description: 'Return True if s is a palindrome, ignoring case and non-alphanumeric characters.',
          examples: [
            { in: '"A man, a plan, a canal: Panama"', out: 'True' },
            { in: '"race a car"', out: 'False' },
            { in: '" "', out: 'True' }
          ],
          constraints: ['1 <= len(s) <= 2 * 10^5'],
          hints: [
            'Build a list/string of only c.lower() where c.isalnum().',
            'Compare it to its reverse with [::-1].'
          ],
          starter: 'def is_valid_palindrome(s):\n    pass\n',
          spec: {
            functionName: 'is_valid_palindrome',
            tests: [
              { input: ['A man, a plan, a canal: Panama'], expected: true },
              { input: ['race a car'], expected: false },
              { input: [' '], expected: true },
              { input: ['0P'], expected: false }
            ]
          },
          solution: 'def is_valid_palindrome(s):\n    cleaned = [c.lower() for c in s if c.isalnum()]\n    return cleaned == cleaned[::-1]',
          solutionNote: 'Comparing a list to its reversed slice is just as valid as joining it back into a string first.'
        }
      ]
    }
  ]
}

export default chapter
