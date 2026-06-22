// Chapter 6 — Dynamic Programming
// The pattern people fear most, broken into friendly steps: define a state,
// find the recurrence, build up the answer.

const chapter = {
  id: 'ch8',
  title: 'Dynamic Programming',
  subtitle: 'Build big answers from small ones',
  color: '#7c4dff',
  icon: 'dna',
  lessons: [
    {
      id: 'lc-climb-stairs',
      title: 'Climbing Stairs',
      icon: 'stairs',
      xp: 30,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "You are climbing a staircase with `n` steps. Each move you can climb **1 or 2** steps. In how many distinct ways can you reach the top?",
          code: 'n = 2 -> 2  (1+1, or 2)\nn = 3 -> 3  (1+1+1, 1+2, 2+1)'
        },
        {
          type: 'concept',
          title: 'It is Fibonacci in disguise',
          body: "To reach step `n` your last move came from step `n-1` (a 1-step) or step `n-2` (a 2-step). So `ways(n) = ways(n-1) + ways(n-2)`. Build up from the bottom keeping just the last two values.",
          code: 'a, b = 1, 1\nfor _ in range(n):\n    a, b = b, a + b\nreturn a'
        },
        {
          type: 'mcq',
          prompt: 'Why can we keep only the last two values instead of a full array?',
          options: [
            'Because n is small',
            'Because each answer depends only on the previous two',
            'Because the answer is always even',
            'We cannot — we need the whole array'
          ],
          answer: 1,
          explanation: 'The recurrence only looks back two steps, so two rolling variables are enough — O(1) memory.'
        },
        {
          type: 'code',
          prompt: 'Solve Climbing Stairs',
          description: 'Return the number of distinct ways to climb n steps taking 1 or 2 at a time.',
          examples: [
            { in: 'n = 2', out: '2' },
            { in: 'n = 3', out: '3' },
            { in: 'n = 5', out: '8' }
          ],
          constraints: ['1 <= n <= 45'],
          hints: ['Base: 1 way to climb 0 steps, 1 way to climb 1 step.', 'Roll two variables: a, b = b, a + b.'],
          starter: 'def climb_stairs(n):\n    pass\n',
          spec: {
            functionName: 'climb_stairs',
            tests: [
              { input: [1], expected: 1 },
              { input: [2], expected: 2 },
              { input: [3], expected: 3 },
              { input: [5], expected: 8 },
              { input: [10], expected: 89 }
            ]
          },
          solution: 'def climb_stairs(n):\n    a, b = 1, 1\n    for _ in range(n):\n        a, b = b, a + b\n    return a',
          solutionNote: 'After n rolls, `a` holds the count of ways to reach step n.'
        }
      ]
    },

    {
      id: 'lc-house-robber',
      title: 'House Robber',
      icon: 'house',
      xp: 36,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Houses in a row each hold some money (`nums`). You cannot rob **two adjacent** houses (alarms link them). Return the maximum money you can rob.",
          code: 'Input: [1,2,3,1] -> 4   (rob houses 0 and 2: 1 + 3)\nInput: [2,7,9,3,1] -> 12 (rob 0, 2, 4: 2+9+1)'
        },
        {
          type: 'concept',
          title: 'Rob this house, or skip it',
          body: "At each house you choose the better of: **skip** it (keep last best) or **rob** it (its money + best from two houses back). Track two rolling values: best including/excluding the previous house.",
          code: 'prev, curr = 0, 0\nfor n in nums:\n    prev, curr = curr, max(curr, prev + n)\nreturn curr'
        },
        {
          type: 'code',
          prompt: 'Solve House Robber',
          description: 'Return the maximum money robbable without taking two adjacent houses.',
          examples: [
            { in: '[1,2,3,1]', out: '4' },
            { in: '[2,7,9,3,1]', out: '12' },
            { in: '[5]', out: '5' }
          ],
          constraints: ['1 <= len(nums) <= 100', '0 <= nums[i] <= 400'],
          hints: [
            'Track prev (best up to two houses ago) and curr (best up to last house).',
            'New curr = max(curr, prev + this house).'
          ],
          starter: 'def rob(nums):\n    pass\n',
          spec: {
            functionName: 'rob',
            tests: [
              { input: [[1, 2, 3, 1]], expected: 4 },
              { input: [[2, 7, 9, 3, 1]], expected: 12 },
              { input: [[5]], expected: 5 },
              { input: [[2, 1, 1, 2]], expected: 4 }
            ]
          },
          solution: 'def rob(nums):\n    prev, curr = 0, 0\n    for n in nums:\n        prev, curr = curr, max(curr, prev + n)\n    return curr',
          solutionNote: 'The swap updates both rolling bests in one line, giving O(1) memory.'
        }
      ]
    },

    {
      id: 'lc-coin-change',
      title: 'Coin Change',
      icon: 'coin',
      xp: 44,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Given coin denominations `coins` and a target `amount`, return the **fewest** coins needed to make that amount, or `-1` if it is impossible. You have unlimited coins of each type.",
          code: 'Input: coins = [1,2,5], amount = 11 -> 3   (5 + 5 + 1)\nInput: coins = [2], amount = 3 -> -1'
        },
        {
          type: 'concept',
          title: 'Best for every smaller amount',
          body: "Let `dp[a]` be the fewest coins to make amount `a`. Start `dp[0] = 0` and everything else as 'infinity'. For each amount, try every coin: `dp[a] = min(dp[a], dp[a - coin] + 1)`. The answer is `dp[amount]`.",
          code: 'for a in range(1, amount + 1):\n    for c in coins:\n        if c <= a:\n            dp[a] = min(dp[a], dp[a - c] + 1)'
        },
        {
          type: 'mcq',
          prompt: 'What does dp[0] = 0 represent?',
          options: [
            'There are no coins',
            'It takes 0 coins to make amount 0 — the base case',
            'The amount is impossible',
            'The first coin is free'
          ],
          answer: 1,
          explanation: 'Making 0 requires no coins. Every other dp value is built on top of this base case.'
        },
        {
          type: 'code',
          prompt: 'Solve Coin Change',
          description: 'Return the minimum number of coins to make amount, or -1 if impossible.',
          examples: [
            { in: 'coins = [1,2,5], amount = 11', out: '3' },
            { in: 'coins = [2], amount = 3', out: '-1' },
            { in: 'coins = [1], amount = 0', out: '0' }
          ],
          constraints: ['1 <= len(coins) <= 12', '0 <= amount <= 10^4'],
          hints: [
            'dp = [0] + [infinity] * amount.',
            'For each a, try each coin that fits: dp[a] = min(dp[a], dp[a-c] + 1).',
            'Return dp[amount] if reachable else -1.'
          ],
          starter: 'def coin_change(coins, amount):\n    pass\n',
          spec: {
            functionName: 'coin_change',
            tests: [
              { input: [[1, 2, 5], 11], expected: 3 },
              { input: [[2], 3], expected: -1 },
              { input: [[1], 0], expected: 0 },
              { input: [[2, 5, 10, 1], 27], expected: 4 }
            ]
          },
          solution: 'def coin_change(coins, amount):\n    INF = float("inf")\n    dp = [0] + [INF] * amount\n    for a in range(1, amount + 1):\n        for c in coins:\n            if c <= a:\n                dp[a] = min(dp[a], dp[a - c] + 1)\n    return dp[amount] if dp[amount] != INF else -1',
          solutionNote: 'This "bottom-up" table reuses answers to smaller amounts, the essence of dynamic programming.'
        }
      ]
    }
  ]
}

export default chapter
