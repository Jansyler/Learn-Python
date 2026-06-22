// Chapter 9 — Sliding Window
// Keep a moving range [left, right] over a sequence, growing the right edge and
// shrinking from the left to maintain some property. Many string/array
// subarray problems collapse to O(n) this way.

const chapter = {
  id: 'ch9',
  title: 'Sliding Window',
  subtitle: 'A moving range over your data',
  color: '#f59e0b',
  emoji: '🪟',
  lessons: [
    {
      id: 'lc-min-subarray',
      title: 'Minimum Size Subarray Sum',
      icon: '📏',
      xp: 38,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Given positive integers `nums` and a `target`, return the **minimal length** of a contiguous subarray whose sum is `>= target`. If none exists, return `0`.",
          code: 'Input: target = 7, nums = [2,3,1,2,4,3] -> 2   (the subarray [4,3])\nInput: target = 11, nums = [1,1,1,1] -> 0'
        },
        {
          type: 'concept',
          title: 'Grow right, shrink left',
          body: "Expand the window by adding `nums[right]`. While the running sum is **already** `>= target`, record the window length and shrink from the **left** (you might find a shorter valid window). Each element enters and leaves once → O(n).",
          code: 'total += nums[right]\nwhile total >= target:\n    best = min(best, right - left + 1)\n    total -= nums[left]; left += 1'
        },
        {
          type: 'mcq',
          prompt: 'Why shrink from the left as soon as the sum reaches target?',
          options: [
            'To make the sum bigger',
            'To find the SHORTEST window that still satisfies the condition',
            'To skip elements',
            'It is required by Python'
          ],
          answer: 1,
          explanation: 'Once the condition holds, removing left elements tests whether an even shorter window also works.'
        },
        {
          type: 'code',
          prompt: 'Solve Minimum Size Subarray Sum',
          description: 'Return the length of the shortest subarray with sum >= target, or 0.',
          examples: [
            { in: 'target = 7, nums = [2,3,1,2,4,3]', out: '2' },
            { in: 'target = 4, nums = [1,4,4]', out: '1' },
            { in: 'target = 11, nums = [1,1,1,1,1,1,1,1]', out: '0' }
          ],
          constraints: ['1 <= len(nums) <= 10^5', '1 <= nums[i], target <= 10^9'],
          hints: ['Track a running total and a left pointer.', 'When total >= target, update best and subtract nums[left].', 'Return 0 if no window ever qualified.'],
          starter: 'def min_subarray_len(target, nums):\n    pass\n',
          spec: {
            functionName: 'min_subarray_len',
            tests: [
              { input: [7, [2, 3, 1, 2, 4, 3]], expected: 2 },
              { input: [4, [1, 4, 4]], expected: 1 },
              { input: [11, [1, 1, 1, 1, 1, 1, 1, 1]], expected: 0 },
              { input: [15, [1, 2, 3, 4, 5]], expected: 5 }
            ]
          },
          solution: 'def min_subarray_len(target, nums):\n    left = 0\n    total = 0\n    best = float("inf")\n    for right in range(len(nums)):\n        total += nums[right]\n        while total >= target:\n            best = min(best, right - left + 1)\n            total -= nums[left]\n            left += 1\n    return 0 if best == float("inf") else best',
          solutionNote: 'best stays infinity if no valid window is ever found, which we convert to 0 at the end.'
        }
      ]
    },

    {
      id: 'lc-char-replacement',
      title: 'Longest Repeating Char Replacement',
      icon: '🔁',
      xp: 46,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Given a string `s` of uppercase letters and an integer `k`, you may replace **at most `k`** characters with any letter. Return the length of the longest substring containing a **single repeated** letter you can make.",
          code: 'Input: s = "ABAB", k = 2 -> 4   (turn the two B\'s into A\'s)\nInput: s = "AABABBA", k = 1 -> 4'
        },
        {
          type: 'concept',
          title: 'Window is valid while replacements ≤ k',
          body: "Track counts of letters in the window and the count of the **most frequent** one (`maxf`). A window is valid when `window_size - maxf <= k` (the non-majority letters are the ones we'd replace). If it exceeds `k`, shrink from the left. The answer is the largest valid window.",
          code: 'if (right - left + 1) - maxf > k:\n    count[s[left]] -= 1; left += 1'
        },
        {
          type: 'code',
          prompt: 'Solve Longest Repeating Character Replacement',
          description: 'Return the longest substring of one repeated letter achievable with at most k replacements.',
          examples: [
            { in: 's = "ABAB", k = 2', out: '4' },
            { in: 's = "AABABBA", k = 1', out: '4' }
          ],
          constraints: ['1 <= len(s) <= 10^5', '0 <= k <= len(s)', 's is uppercase letters'],
          hints: [
            'Keep a dict of letter counts in the window and maxf = the highest count.',
            'Window valid while (size - maxf) <= k.',
            'Grow right; if invalid, drop s[left] and move left.'
          ],
          starter: 'def character_replacement(s, k):\n    pass\n',
          spec: {
            functionName: 'character_replacement',
            tests: [
              { input: ['ABAB', 2], expected: 4 },
              { input: ['AABABBA', 1], expected: 4 },
              { input: ['AAAA', 0], expected: 4 },
              { input: ['A', 0], expected: 1 }
            ]
          },
          solution: 'def character_replacement(s, k):\n    count = {}\n    left = 0\n    maxf = 0\n    best = 0\n    for right in range(len(s)):\n        count[s[right]] = count.get(s[right], 0) + 1\n        maxf = max(maxf, count[s[right]])\n        while (right - left + 1) - maxf > k:\n            count[s[left]] -= 1\n            left += 1\n        best = max(best, right - left + 1)\n    return best',
          solutionNote: 'We never need to decrease maxf: the best window only grows when we find a higher frequency, so a slightly stale maxf is harmless.'
        }
      ]
    },

    {
      id: 'lc-find-anagrams',
      title: 'Find All Anagrams in a String',
      icon: '🧩',
      xp: 46,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Given strings `s` and `p`, return the **start indices** of every substring of `s` that is an anagram of `p` (same letters, any order). Indices in ascending order.",
          code: 'Input: s = "cbaebabacd", p = "abc" -> [0, 6]\nInput: s = "abab", p = "ab" -> [0, 1, 2]'
        },
        {
          type: 'concept',
          title: 'Fixed-size window of letter counts',
          body: "The window is always `len(p)` wide. Keep a count of the letters in the current window and compare it to the count of `p`. Slide one step: add the new right letter, remove the old left letter. When the counts match, record the start index.",
          code: 'if window_counts == p_counts:\n    result.append(start_index)'
        },
        {
          type: 'mcq',
          prompt: 'Two substrings are anagrams of each other exactly when…',
          options: [
            'they are equal',
            'they have identical letter-frequency counts',
            'they start with the same letter',
            'they have the same first and last letter'
          ],
          answer: 1,
          explanation: 'Anagrams use the same multiset of letters, which is precisely captured by equal frequency counts.'
        },
        {
          type: 'code',
          prompt: 'Solve Find All Anagrams in a String',
          description: 'Return the ascending list of start indices where an anagram of p appears in s.',
          examples: [
            { in: 's = "cbaebabacd", p = "abc"', out: '[0, 6]' },
            { in: 's = "abab", p = "ab"', out: '[0, 1, 2]' }
          ],
          constraints: ['1 <= len(s), len(p) <= 3*10^4', 'lowercase English letters'],
          hints: [
            'If len(p) > len(s) there are none.',
            'Build a count for p and for the first window of s.',
            'Slide: add s[i], remove s[i-len(p)]; when counts equal p, record i-len(p)+1.'
          ],
          starter: 'def find_anagrams(s, p):\n    pass\n',
          spec: {
            functionName: 'find_anagrams',
            tests: [
              { input: ['cbaebabacd', 'abc'], expected: [0, 6] },
              { input: ['abab', 'ab'], expected: [0, 1, 2] },
              { input: ['a', 'aa'], expected: [] }
            ]
          },
          solution: 'def find_anagrams(s, p):\n    result = []\n    if len(p) > len(s):\n        return result\n    need = {}\n    for ch in p:\n        need[ch] = need.get(ch, 0) + 1\n    window = {}\n    for ch in s[:len(p)]:\n        window[ch] = window.get(ch, 0) + 1\n    if window == need:\n        result.append(0)\n    for i in range(len(p), len(s)):\n        window[s[i]] = window.get(s[i], 0) + 1\n        left = s[i - len(p)]\n        window[left] -= 1\n        if window[left] == 0:\n            del window[left]\n        if window == need:\n            result.append(i - len(p) + 1)\n    return result',
          solutionNote: 'Deleting keys that hit zero keeps the dict comparison exact — otherwise a stray {x: 0} would break equality.'
        }
      ]
    }
  ]
}

export default chapter
