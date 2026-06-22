// Chapter 5 — Stack & Binary Search
// Two cornerstone patterns: LIFO stacks for matching/monotonic problems, and
// binary search for anything sorted.

const chapter = {
  id: 'ch7',
  title: 'Stack & Binary Search',
  subtitle: 'Matching, monotonic stacks & halving the search',
  color: '#ff5fa2',
  icon: 'stack',
  lessons: [
    {
      id: 'lc-valid-parens',
      title: 'Valid Parentheses',
      icon: 'link',
      xp: 28,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Given a string `s` of just the characters `()[]{}`, decide if it is **valid**: every opening bracket is closed by the same type, and brackets close in the correct order.",
          code: 'Input: "()[]{}" -> True\nInput: "(]"     -> False\nInput: "([)]"   -> False'
        },
        {
          type: 'concept',
          title: 'A stack remembers what is still open',
          body: "Push every opening bracket. On a closing bracket, the top of the stack **must** be its matching opener — pop it. If it does not match (or the stack is empty), it is invalid. At the end the stack must be empty.",
          code: 'pairs = {")": "(", "]": "[", "}": "{"}\nif stack and stack[-1] == pairs[ch]:\n    stack.pop()'
        },
        {
          type: 'mcq',
          prompt: 'After processing "([{" what is on the stack (bottom→top)?',
          options: ['empty', '( [ {', '{ [ (', ') ] }'],
          answer: 1,
          explanation: 'Each opener is pushed in order, so the stack holds ( [ { with { on top — none have been closed yet.'
        },
        {
          type: 'code',
          prompt: 'Solve Valid Parentheses',
          description: 'Return True if the bracket string s is valid.',
          examples: [
            { in: '"()"', out: 'True' },
            { in: '"()[]{}"', out: 'True' },
            { in: '"(]"', out: 'False' }
          ],
          constraints: ['1 <= len(s) <= 10^4', "s contains only ()[]{}"],
          hints: [
            'Map each closer to its opener in a dict.',
            'Push openers; on a closer, check the top of the stack matches, else return False.',
            'Valid only if the stack is empty at the end.'
          ],
          starter: 'def is_valid(s):\n    pass\n',
          spec: {
            functionName: 'is_valid',
            tests: [
              { input: ['()'], expected: true },
              { input: ['()[]{}'], expected: true },
              { input: ['(]'], expected: false },
              { input: ['([)]'], expected: false },
              { input: ['{[]}'], expected: true },
              { input: [']'], expected: false }
            ]
          },
          solution: "def is_valid(s):\n    pairs = {')': '(', ']': '[', '}': '{'}\n    stack = []\n    for ch in s:\n        if ch in pairs:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n        else:\n            stack.append(ch)\n    return not stack",
          solutionNote: 'A leftover non-empty stack means some opener was never closed, so we return `not stack`.'
        }
      ]
    },

    {
      id: 'lc-binary-search',
      title: 'Binary Search',
      icon: 'target',
      xp: 30,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Given a **sorted** array `nums` (ascending) and a `target`, return its index, or `-1` if it is not present. Aim for O(log n) time.",
          code: 'Input: nums = [-1,0,3,5,9,12], target = 9 -> 4\nInput: nums = [-1,0,3,5,9,12], target = 2 -> -1'
        },
        {
          type: 'concept',
          title: 'Halve the range each step',
          body: "Keep two pointers `lo` and `hi`. Look at the middle. If it equals the target, done. If the middle is too small, the answer is to the **right** (`lo = mid + 1`); otherwise to the **left** (`hi = mid - 1`). Each step throws away half the array.",
          code: 'mid = (lo + hi) // 2\nif nums[mid] < target: lo = mid + 1\nelse: hi = mid - 1'
        },
        {
          type: 'mcq',
          prompt: 'Why is binary search O(log n) and not O(n)?',
          options: [
            'It checks every element once',
            'It discards half the remaining elements each comparison',
            'The array is small',
            'It uses recursion'
          ],
          answer: 1,
          explanation: 'Halving the search space each step means you reach a single element in about log₂(n) steps.'
        },
        {
          type: 'code',
          prompt: 'Solve Binary Search',
          description: 'Return the index of target in the sorted array nums, or -1.',
          examples: [
            { in: 'nums = [-1,0,3,5,9,12], target = 9', out: '4' },
            { in: 'nums = [5], target = 5', out: '0' },
            { in: 'nums = [2,5], target = 0', out: '-1' }
          ],
          constraints: ['1 <= len(nums) <= 10^4', 'nums is sorted ascending, all distinct'],
          hints: [
            'lo = 0, hi = len(nums) - 1.',
            'Loop while lo <= hi; compute mid = (lo + hi) // 2.',
            'Move lo or hi past mid depending on the comparison.'
          ],
          starter: 'def search(nums, target):\n    pass\n',
          spec: {
            functionName: 'search',
            tests: [
              { input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
              { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
              { input: [[5], 5], expected: 0 },
              { input: [[2, 5], 0], expected: -1 }
            ]
          },
          solution: 'def search(nums, target):\n    lo, hi = 0, len(nums) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if nums[mid] == target:\n            return mid\n        if nums[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1',
          solutionNote: 'Using `lo <= hi` (not `<`) ensures the final single-element range is still checked.'
        }
      ]
    },

    {
      id: 'lc-daily-temps',
      title: 'Daily Temperatures',
      icon: 'thermometer',
      xp: 40,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Given daily `temperatures`, return an array where each entry is **how many days you must wait** for a warmer temperature. If there is no warmer future day, put `0`.",
          code: 'Input:  [73,74,75,71,69,72,76,73]\nOutput: [1, 1, 4, 2, 1, 1, 0, 0]'
        },
        {
          type: 'concept',
          title: 'Monotonic stack of indices',
          body: "Keep a stack of **indices** whose warmer day we have not found yet, with decreasing temperatures. When today is warmer than the temperature at the top index, we just found that day's answer — pop and record the gap. Then push today.",
          code: 'while stack and temps[i] > temps[stack[-1]]:\n    j = stack.pop()\n    answer[j] = i - j\nstack.append(i)'
        },
        {
          type: 'code',
          prompt: 'Solve Daily Temperatures',
          description: 'Return an array of waits until a warmer day (0 if none).',
          examples: [
            { in: '[73,74,75,71,69,72,76,73]', out: '[1,1,4,2,1,1,0,0]' },
            { in: '[30,40,50,60]', out: '[1,1,1,0]' },
            { in: '[30,60,90]', out: '[1,1,0]' }
          ],
          constraints: ['1 <= len(temperatures) <= 10^5'],
          hints: [
            'Start answer as a list of zeros, same length.',
            'Use a stack of indices waiting for a warmer day.',
            'When temps[i] beats the temp at the top index, pop and set answer = i - j.'
          ],
          starter: 'def daily_temperatures(temperatures):\n    pass\n',
          spec: {
            functionName: 'daily_temperatures',
            tests: [
              { input: [[73, 74, 75, 71, 69, 72, 76, 73]], expected: [1, 1, 4, 2, 1, 1, 0, 0] },
              { input: [[30, 40, 50, 60]], expected: [1, 1, 1, 0] },
              { input: [[30, 60, 90]], expected: [1, 1, 0] }
            ]
          },
          solution: 'def daily_temperatures(temperatures):\n    answer = [0] * len(temperatures)\n    stack = []\n    for i, t in enumerate(temperatures):\n        while stack and t > temperatures[stack[-1]]:\n            j = stack.pop()\n            answer[j] = i - j\n        stack.append(i)\n    return answer',
          solutionNote: 'Each index is pushed and popped at most once, so the whole thing is O(n) despite the inner loop.'
        }
      ]
    }
  ]
}

export default chapter
