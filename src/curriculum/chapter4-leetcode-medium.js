// Chapter 4 — LeetCode: Medium
// Patterns that level you up: Kadane's, sliding window, grouping, prefix products.

const chapter = {
  id: 'ch4',
  title: 'LeetCode · Medium',
  subtitle: 'Patterns that win interviews',
  color: '#ff9600',
  emoji: '🚀',
  lessons: [
    {
      id: 'lc-max-subarray',
      title: 'Maximum Subarray',
      icon: '📊',
      xp: 35,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Given an integer array `nums`, find the contiguous subarray (at least one number) with the **largest sum**, and return that sum.",
          code: 'Input: [-2,1,-3,4,-1,2,1,-5,4] -> 6   (subarray [4,-1,2,1])\nInput: [-1] -> -1'
        },
        {
          type: 'concept',
          title: "Kadane's algorithm",
          body: "Walk left to right tracking `current`, the best sum **ending at this index**. For each number you either extend the previous run or start fresh at this number:\n\n`current = max(num, current + num)`\n\nKeep the best `current` ever seen. One pass, O(n).",
          code: 'current = max(num, current + num)\nbest = max(best, current)'
        },
        {
          type: 'mcq',
          prompt: 'Why start a new subarray when current + num < num?',
          options: [
            'To save memory',
            'Because the previous run is dragging the sum down — dropping it can only help',
            'Because the array is sorted',
            'It never helps to start fresh'
          ],
          answer: 1,
          explanation: 'If the running sum is negative, it hurts whatever comes next. Starting fresh at `num` gives a better "best ending here".'
        },
        {
          type: 'code',
          prompt: "Solve Maximum Subarray (Kadane's)",
          description: 'Return the largest sum of any contiguous non-empty subarray.',
          examples: [
            { in: '[-2,1,-3,4,-1,2,1,-5,4]', out: '6' },
            { in: '[1]', out: '1' },
            { in: '[5,4,-1,7,8]', out: '23' }
          ],
          constraints: ['1 <= len(nums) <= 10^5', '-10^4 <= nums[i] <= 10^4'],
          hints: [
            'Initialize both current and best to nums[0].',
            'For each later num: current = max(num, current + num).',
            'best = max(best, current).'
          ],
          starter: 'def max_subarray(nums):\n    pass\n',
          spec: {
            functionName: 'max_subarray',
            tests: [
              { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
              { input: [[1]], expected: 1 },
              { input: [[5, 4, -1, 7, 8]], expected: 23 },
              { input: [[-3, -1, -2]], expected: -1 }
            ]
          },
          solution: 'def max_subarray(nums):\n    current = best = nums[0]\n    for num in nums[1:]:\n        current = max(num, current + num)\n        best = max(best, current)\n    return best',
          solutionNote: 'Starting both at nums[0] handles the all-negative case correctly (we must pick at least one number).'
        }
      ]
    },

    {
      id: 'lc-group-anagrams',
      title: 'Group Anagrams',
      icon: '🧺',
      xp: 38,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Given a list of strings, group the ones that are anagrams of each other. Return a list of groups. The order of groups and of words within a group does not matter.",
          code: 'Input:  ["eat","tea","tan","ate","nat","bat"]\nOutput: [["eat","tea","ate"], ["tan","nat"], ["bat"]]'
        },
        {
          type: 'concept',
          title: 'A shared signature',
          body: "All anagrams share the same letters. If you **sort** a word's letters you get a canonical key, identical for every anagram. Use a dict mapping that key → list of words.",
          code: "key = ''.join(sorted(word))  # 'eat' and 'tea' both -> 'aet'\ngroups[key].append(word)"
        },
        {
          type: 'mcq',
          prompt: "What is ''.join(sorted('tea'))?",
          options: ["'tea'", "'aet'", "'eat'", "'tae'"],
          answer: 1,
          explanation: 'sorted("tea") gives ["a","e","t"], and join sticks them together → "aet". Every anagram of tea maps to the same key.'
        },
        {
          type: 'code',
          prompt: 'Solve Group Anagrams',
          description: 'Return a list of groups, where each group contains words that are anagrams of one another. (The grader sorts within and across groups, so ordering does not matter.)',
          examples: [
            { in: '["eat","tea","tan","ate","nat","bat"]', out: '[["ate","eat","tea"],["nat","tan"],["bat"]]' },
            { in: '[""]', out: '[[""]]' }
          ],
          constraints: ['1 <= len(strs) <= 10^4', 'words are lowercase letters'],
          hints: [
            'Use a dict mapping the sorted-letters key to a list.',
            "key = ''.join(sorted(word)).",
            'Return list(groups.values()).'
          ],
          starter: 'def group_anagrams(strs):\n    pass\n',
          // The grader sorts each group and the list of groups, so any valid
          // grouping in any order passes.
          spec: {
            functionName: 'group_anagrams',
            unordered: true,
            tests: [
              {
                input: [['eat', 'tea', 'tan', 'ate', 'nat', 'bat']],
                expected: [['ate', 'eat', 'tea'], ['nat', 'tan'], ['bat']]
              },
              { input: [['']], expected: [['']] },
              { input: [['a']], expected: [['a']] }
            ]
          },
          solution: "def group_anagrams(strs):\n    groups = {}\n    for word in strs:\n        key = ''.join(sorted(word))\n        groups.setdefault(key, []).append(word)\n    return list(groups.values())",
          solutionNote: 'setdefault(key, []) creates the list the first time a key appears, so we can append immediately.'
        }
      ]
    },

    {
      id: 'lc-longest-substring',
      title: 'Longest Substring Without Repeats',
      icon: '🪟',
      xp: 42,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Given a string `s`, return the length of the **longest substring** that contains no repeating characters. A substring is a contiguous run of characters.",
          code: 'Input: "abcabcbb" -> 3   ("abc")\nInput: "bbbbb"    -> 1   ("b")\nInput: "pwwkew"   -> 3   ("wke")'
        },
        {
          type: 'concept',
          title: 'Sliding window',
          body: "Keep a window `[left, right]` that always holds unique characters. Move `right` forward one char at a time. If the new char is already in the window, slide `left` forward (dropping chars) until the duplicate is gone. Track the largest window size.",
          code: 'while s[right] in window:\n    window.discard(s[left]); left += 1\nwindow.add(s[right])\nbest = max(best, right - left + 1)'
        },
        {
          type: 'mcq',
          prompt: 'When the right edge sees a character already in the window, what do we do?',
          options: [
            'Reset the whole window to empty',
            'Shrink from the left until the duplicate is removed',
            'Return immediately',
            'Skip that character'
          ],
          answer: 1,
          explanation: 'We only need to remove enough from the left to eliminate the one duplicate, preserving as much valid window as possible.'
        },
        {
          type: 'code',
          prompt: 'Solve Longest Substring Without Repeating Characters',
          description: 'Return the length of the longest substring of s with all-distinct characters.',
          examples: [
            { in: '"abcabcbb"', out: '3' },
            { in: '"bbbbb"', out: '1' },
            { in: '"pwwkew"', out: '3' },
            { in: '""', out: '0' }
          ],
          constraints: ['0 <= len(s) <= 5 * 10^4'],
          hints: [
            'Use a set as the current window and two pointers left/right.',
            'Before adding s[right], shrink from left while s[right] is in the set.',
            'Answer is the max of (right - left + 1) over the scan.'
          ],
          starter: 'def length_of_longest_substring(s):\n    pass\n',
          spec: {
            functionName: 'length_of_longest_substring',
            tests: [
              { input: ['abcabcbb'], expected: 3 },
              { input: ['bbbbb'], expected: 1 },
              { input: ['pwwkew'], expected: 3 },
              { input: [''], expected: 0 },
              { input: ['dvdf'], expected: 3 }
            ]
          },
          solution: 'def length_of_longest_substring(s):\n    window = set()\n    left = 0\n    best = 0\n    for right in range(len(s)):\n        while s[right] in window:\n            window.discard(s[left])\n            left += 1\n        window.add(s[right])\n        best = max(best, right - left + 1)\n    return best',
          solutionNote: 'Each character is added once and removed at most once, so the whole scan is O(n) despite the inner while loop.'
        }
      ]
    },

    {
      id: 'lc-product-except-self',
      title: 'Product of Array Except Self',
      icon: '✖️',
      xp: 40,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Given an array `nums`, return an array `answer` where `answer[i]` is the product of **every element except** `nums[i]`. You must do it **without using division**.",
          code: 'Input: [1,2,3,4] -> [24,12,8,6]\n# answer[0] = 2*3*4 = 24, answer[1] = 1*3*4 = 12, ...'
        },
        {
          type: 'concept',
          title: 'Prefix × suffix',
          body: "For each index, the answer is (product of everything to the **left**) × (product of everything to the **right**). Compute a left-to-right running product, then multiply by a right-to-left running product. Two passes, no division, O(n).",
          code: '# pass 1: answer[i] = product of nums[:i]\n# pass 2: multiply by product of nums[i+1:]'
        },
        {
          type: 'predict',
          prompt: 'For [1,2,3,4], what is the product of everything LEFT of index 2 (value 3)?',
          code: '# nums = [1, 2, 3, 4], index 2',
          options: ['2', '12', '4', '24'],
          answer: 0,
          explanation: 'Left of index 2 are values 1 and 2, so the left product is 1*2 = 2. (The right product would be 4.)'
        },
        {
          type: 'code',
          prompt: 'Solve Product of Array Except Self',
          description: 'Return answer where answer[i] = product of all nums except nums[i]. No division.',
          examples: [
            { in: '[1,2,3,4]', out: '[24,12,8,6]' },
            { in: '[-1,1,0,-3,3]', out: '[0,0,9,0,0]' }
          ],
          constraints: ['2 <= len(nums) <= 10^5', 'The full product fits in a 32-bit integer'],
          hints: [
            'Make answer the same length, filled with 1s.',
            'First loop forward keeping a running prefix product, writing it into answer[i] before multiplying nums[i] in.',
            'Then loop backward with a running suffix product, multiplying into answer[i].'
          ],
          starter: 'def product_except_self(nums):\n    pass\n',
          spec: {
            functionName: 'product_except_self',
            tests: [
              { input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
              { input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] },
              { input: [[2, 3]], expected: [3, 2] }
            ]
          },
          solution: 'def product_except_self(nums):\n    n = len(nums)\n    answer = [1] * n\n    prefix = 1\n    for i in range(n):\n        answer[i] = prefix\n        prefix *= nums[i]\n    suffix = 1\n    for i in range(n - 1, -1, -1):\n        answer[i] *= suffix\n        suffix *= nums[i]\n    return answer',
          solutionNote: 'answer[i] first holds the left product, then gets multiplied by the right product on the backward pass — no division needed.'
        }
      ]
    }
  ]
}

export default chapter
