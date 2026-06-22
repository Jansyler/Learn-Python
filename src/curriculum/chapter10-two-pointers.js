// Chapter 8 — Two Pointers
// Walk a sorted array (or a string) from both ends, moving the pointer that
// can improve the answer. Turns many O(n^2) problems into O(n).

const chapter = {
  id: 'ch10',
  title: 'Two Pointers',
  subtitle: 'Squeeze from both ends',
  color: '#06b6d4',
  icon: 'pointer',
  lessons: [
    {
      id: 'lc-two-sum-ii',
      title: 'Two Sum II (Sorted)',
      icon: 'plus',
      xp: 30,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Given a **1-indexed sorted** array `numbers` and a `target`, return the two indices (as `[i, j]`, 1-based, `i < j`) of the numbers that add up to `target`. Exactly one solution exists.",
          code: 'Input: numbers = [2,7,11,15], target = 9 -> [1, 2]\nInput: numbers = [2,3,4], target = 6     -> [1, 3]'
        },
        {
          type: 'concept',
          title: 'Let the sort guide you',
          body: "Put one pointer at the start, one at the end. If their sum is **too big**, move the right pointer **left** (smaller). If **too small**, move the left pointer **right** (bigger). The sorted order means each move is the right call. O(n), no extra memory.",
          code: 'if total < target: lo += 1\nelif total > target: hi -= 1\nelse: return [lo + 1, hi + 1]'
        },
        {
          type: 'mcq',
          prompt: 'The current sum is larger than target. Which pointer moves?',
          options: ['Move left pointer right', 'Move right pointer left', 'Move both', 'Stop'],
          answer: 1,
          explanation: 'To shrink the sum you need a smaller value. Since the array is sorted, moving the right pointer left gives a smaller number.'
        },
        {
          type: 'code',
          prompt: 'Solve Two Sum II',
          description: 'Return the 1-based indices [i, j] of the two numbers in the sorted array that sum to target.',
          examples: [
            { in: 'numbers = [2,7,11,15], target = 9', out: '[1, 2]' },
            { in: 'numbers = [2,3,4], target = 6', out: '[1, 3]' },
            { in: 'numbers = [-1,0], target = -1', out: '[1, 2]' }
          ],
          constraints: ['2 <= len(numbers) <= 3*10^4', 'numbers is sorted ascending', 'exactly one solution'],
          hints: ['lo = 0, hi = len - 1.', 'Compare numbers[lo] + numbers[hi] to target and move a pointer.', 'Return 1-based indices: [lo+1, hi+1].'],
          starter: 'def two_sum_sorted(numbers, target):\n    pass\n',
          spec: {
            functionName: 'two_sum_sorted',
            tests: [
              { input: [[2, 7, 11, 15], 9], expected: [1, 2] },
              { input: [[2, 3, 4], 6], expected: [1, 3] },
              { input: [[-1, 0], -1], expected: [1, 2] }
            ]
          },
          solution: 'def two_sum_sorted(numbers, target):\n    lo, hi = 0, len(numbers) - 1\n    while lo < hi:\n        total = numbers[lo] + numbers[hi]\n        if total == target:\n            return [lo + 1, hi + 1]\n        if total < target:\n            lo += 1\n        else:\n            hi -= 1\n    return []',
          solutionNote: 'Because the array is sorted, every move provably steps toward the answer — no need to try all pairs.'
        }
      ]
    },

    {
      id: 'lc-valid-palindrome-ii',
      title: 'Valid Palindrome II',
      icon: 'mirror',
      xp: 34,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Given a string `s`, return `True` if it can become a palindrome by deleting **at most one** character.",
          code: 'Input: "aba"  -> True  (already a palindrome)\nInput: "abca" -> True  (delete \'c\')\nInput: "abc"  -> False'
        },
        {
          type: 'concept',
          title: 'Two pointers + one allowed skip',
          body: "Walk pointers inward while characters match. On the **first** mismatch you have one deletion to spend: the answer is a palindrome if skipping the left char works **or** skipping the right char works. Check both halves with a plain palindrome test.",
          code: "if s[l] != s[r]:\n    return is_pal(l+1, r) or is_pal(l, r-1)"
        },
        {
          type: 'code',
          prompt: 'Solve Valid Palindrome II',
          description: 'Return True if s can be made a palindrome by removing at most one character.',
          examples: [
            { in: '"aba"', out: 'True' },
            { in: '"abca"', out: 'True' },
            { in: '"abc"', out: 'False' }
          ],
          constraints: ['1 <= len(s) <= 10^5', 's is lowercase letters'],
          hints: [
            'Write a helper is_pal(l, r) that checks a substring is a palindrome.',
            'Move l, r inward while equal; on a mismatch try skipping l OR skipping r.'
          ],
          starter: 'def valid_palindrome(s):\n    pass\n',
          spec: {
            functionName: 'valid_palindrome',
            tests: [
              { input: ['aba'], expected: true },
              { input: ['abca'], expected: true },
              { input: ['abc'], expected: false },
              { input: ['a'], expected: true },
              { input: ['deeee'], expected: true }
            ]
          },
          solution: 'def valid_palindrome(s):\n    def is_pal(l, r):\n        while l < r:\n            if s[l] != s[r]:\n                return False\n            l += 1\n            r -= 1\n        return True\n    l, r = 0, len(s) - 1\n    while l < r:\n        if s[l] != s[r]:\n            return is_pal(l + 1, r) or is_pal(l, r - 1)\n        l += 1\n        r -= 1\n    return True',
          solutionNote: 'You only ever need to try a deletion at the first mismatch — earlier characters already matched perfectly.'
        }
      ]
    },

    {
      id: 'lc-container-water',
      title: 'Container With Most Water',
      icon: 'bucket',
      xp: 38,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "`height[i]` is the height of a vertical line at position `i`. Pick two lines that, with the x-axis, hold the **most water**. Return that maximum area.\n\nArea = (distance between lines) × (height of the **shorter** line).",
          code: 'Input: [1,8,6,2,5,4,8,3,7] -> 49'
        },
        {
          type: 'concept',
          title: 'Move the shorter wall',
          body: "Start with the widest container (both ends). The area is limited by the **shorter** wall, so moving the taller wall in can never help — move the **shorter** one inward, hoping for a taller wall. Track the best area as you go.",
          code: 'area = min(height[l], height[r]) * (r - l)\nif height[l] < height[r]: l += 1\nelse: r -= 1'
        },
        {
          type: 'mcq',
          prompt: 'Why move the pointer at the shorter line, not the taller?',
          options: [
            'It looks nicer',
            'The shorter line caps the area, so only replacing it can possibly increase it',
            'The taller line is always wrong',
            'To save memory'
          ],
          answer: 1,
          explanation: 'Width shrinks every step, so the only way to gain area is a taller limiting wall — and the limiting wall is the shorter one.'
        },
        {
          type: 'code',
          prompt: 'Solve Container With Most Water',
          description: 'Return the maximum water area between two lines.',
          examples: [
            { in: '[1,8,6,2,5,4,8,3,7]', out: '49' },
            { in: '[1,1]', out: '1' },
            { in: '[4,3,2,1,4]', out: '16' }
          ],
          constraints: ['2 <= len(height) <= 10^5', '0 <= height[i] <= 10^4'],
          hints: ['Two pointers at the ends.', 'area = min(height[l], height[r]) * (r - l).', 'Advance the pointer at the shorter line.'],
          starter: 'def max_area(height):\n    pass\n',
          spec: {
            functionName: 'max_area',
            tests: [
              { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
              { input: [[1, 1]], expected: 1 },
              { input: [[4, 3, 2, 1, 4]], expected: 16 },
              { input: [[1, 2, 1]], expected: 2 }
            ]
          },
          solution: 'def max_area(height):\n    l, r = 0, len(height) - 1\n    best = 0\n    while l < r:\n        best = max(best, min(height[l], height[r]) * (r - l))\n        if height[l] < height[r]:\n            l += 1\n        else:\n            r -= 1\n    return best',
          solutionNote: 'Greedily moving the shorter wall is safe because no taller-wall move could ever beat the area we just measured.'
        }
      ]
    },

    {
      id: 'lc-3sum',
      title: '3Sum',
      icon: 'three',
      xp: 48,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Given an array `nums`, return **all unique triplets** `[a, b, c]` such that `a + b + c == 0`. No duplicate triplets. The order of triplets (and within them) does not matter.",
          code: 'Input: [-1,0,1,2,-1,-4] -> [[-1,-1,2], [-1,0,1]]'
        },
        {
          type: 'concept',
          title: 'Sort, then fix one + two-pointer the rest',
          body: "Sort the array. Fix each number `nums[i]`, then two-pointer the remaining slice to find pairs summing to `-nums[i]`. Sorting also lets you **skip duplicates** easily (skip equal neighbours). O(n²).",
          code: 'for i in range(n):\n    if i > 0 and nums[i] == nums[i-1]: continue\n    # two-pointer l, r for the rest looking for -nums[i]'
        },
        {
          type: 'mcq',
          prompt: 'After sorting, how do we avoid duplicate triplets for the fixed number?',
          options: [
            'Use a set of every triplet',
            'Skip nums[i] when it equals the previous nums[i-1]',
            'Only look at even indices',
            'You cannot avoid them'
          ],
          answer: 1,
          explanation: 'Equal adjacent values would generate identical triplets, so skipping repeats of the fixed (and the pointer) values keeps results unique.'
        },
        {
          type: 'code',
          prompt: 'Solve 3Sum',
          description: 'Return all unique triplets summing to 0. (Order does not matter — the grader compares as sets.)',
          examples: [
            { in: '[-1,0,1,2,-1,-4]', out: '[[-1,-1,2],[-1,0,1]]' },
            { in: '[0,1,1]', out: '[]' },
            { in: '[0,0,0]', out: '[[0,0,0]]' }
          ],
          constraints: ['3 <= len(nums) <= 3000', '-10^5 <= nums[i] <= 10^5'],
          hints: [
            'Sort first.',
            'Fix i, then two-pointer l=i+1, r=end for sum == -nums[i].',
            'Skip duplicate values for i, l and r to keep triplets unique.'
          ],
          starter: 'def three_sum(nums):\n    pass\n',
          spec: {
            functionName: 'three_sum',
            unordered: true,
            tests: [
              { input: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]] },
              { input: [[0, 1, 1]], expected: [] },
              { input: [[0, 0, 0]], expected: [[0, 0, 0]] },
              { input: [[-2, 0, 1, 1, 2]], expected: [[-2, 0, 2], [-2, 1, 1]] }
            ]
          },
          solution: 'def three_sum(nums):\n    nums.sort()\n    res = []\n    n = len(nums)\n    for i in range(n):\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n        l, r = i + 1, n - 1\n        while l < r:\n            s = nums[i] + nums[l] + nums[r]\n            if s < 0:\n                l += 1\n            elif s > 0:\n                r -= 1\n            else:\n                res.append([nums[i], nums[l], nums[r]])\n                l += 1\n                r -= 1\n                while l < r and nums[l] == nums[l - 1]:\n                    l += 1\n                while l < r and nums[r] == nums[r + 1]:\n                    r -= 1\n    return res',
          solutionNote: 'Sorting unlocks both the two-pointer scan and the duplicate-skipping — the two ideas that make 3Sum clean.'
        }
      ]
    }
  ]
}

export default chapter
