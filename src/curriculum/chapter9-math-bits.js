// Chapter 7 — Math & Bit Tricks
// Classic "gotcha" problems that teach modular arithmetic, XOR and overflow.

const chapter = {
  id: 'ch9',
  title: 'Math & Bit Tricks',
  subtitle: 'XOR, overflow & number puzzles',
  color: '#00c2a8',
  icon: 'hash',
  lessons: [
    {
      id: 'lc-fizzbuzz',
      title: 'Fizz Buzz',
      icon: 'cup',
      xp: 22,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Return a list of strings for numbers `1..n`:\n- `\"FizzBuzz\"` if divisible by 3 **and** 5\n- `\"Fizz\"` if divisible by 3\n- `\"Buzz\"` if divisible by 5\n- otherwise the number itself as a string",
          code: 'n = 5 -> ["1","2","Fizz","4","Buzz"]'
        },
        {
          type: 'code',
          prompt: 'Solve Fizz Buzz',
          description: 'Return the FizzBuzz list for 1..n as strings.',
          examples: [
            { in: 'n = 3', out: '["1","2","Fizz"]' },
            { in: 'n = 5', out: '["1","2","Fizz","4","Buzz"]' }
          ],
          constraints: ['1 <= n <= 10^4'],
          hints: [
            'Loop i from 1 to n inclusive.',
            'Check the 3-and-5 case first.',
            'Append str(i) for the default; the result is a list of strings.'
          ],
          starter: 'def fizz_buzz(n):\n    pass\n',
          spec: {
            functionName: 'fizz_buzz',
            tests: [
              { input: [3], expected: ['1', '2', 'Fizz'] },
              { input: [5], expected: ['1', '2', 'Fizz', '4', 'Buzz'] },
              { input: [15], expected: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz'] }
            ]
          },
          solution: 'def fizz_buzz(n):\n    out = []\n    for i in range(1, n + 1):\n        if i % 15 == 0:\n            out.append("FizzBuzz")\n        elif i % 3 == 0:\n            out.append("Fizz")\n        elif i % 5 == 0:\n            out.append("Buzz")\n        else:\n            out.append(str(i))\n    return out',
          solutionNote: 'Divisible by both 3 and 5 is the same as divisible by 15, checked first.'
        }
      ]
    },

    {
      id: 'lc-single-number',
      title: 'Single Number',
      icon: 'sparkle',
      xp: 30,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Every element in `nums` appears **twice**, except for one that appears once. Find that single one — using O(1) extra space.",
          code: 'Input: [4,1,2,1,2] -> 4\nInput: [2,2,1]     -> 1'
        },
        {
          type: 'concept',
          title: 'XOR cancels pairs',
          body: "The XOR operator `^` has two magic properties: `x ^ x == 0` and `x ^ 0 == x`. XOR everything together — each pair cancels to 0, leaving only the lonely number.",
          code: 'result = 0\nfor n in nums:\n    result ^= n\nreturn result'
        },
        {
          type: 'predict',
          prompt: 'What is 5 ^ 5 ^ 7?',
          code: '# ^ is XOR',
          options: ['7', '5', '0', '12'],
          answer: 0,
          explanation: '5 ^ 5 is 0, and 0 ^ 7 is 7. The pair cancels, leaving the unique value.'
        },
        {
          type: 'code',
          prompt: 'Solve Single Number',
          description: 'Return the element that appears only once. Every other appears twice.',
          examples: [
            { in: '[4,1,2,1,2]', out: '4' },
            { in: '[2,2,1]', out: '1' },
            { in: '[7]', out: '7' }
          ],
          constraints: ['1 <= len(nums) <= 3 * 10^4', 'Exactly one element appears once'],
          hints: ['Fold the array with XOR (^).', 'Start the accumulator at 0.'],
          starter: 'def single_number(nums):\n    pass\n',
          spec: {
            functionName: 'single_number',
            tests: [
              { input: [[4, 1, 2, 1, 2]], expected: 4 },
              { input: [[2, 2, 1]], expected: 1 },
              { input: [[7]], expected: 7 },
              { input: [[1, 1, 3, 3, 99]], expected: 99 }
            ]
          },
          solution: 'def single_number(nums):\n    result = 0\n    for n in nums:\n        result ^= n\n    return result',
          solutionNote: 'XOR is associative and commutative, so order does not matter — all pairs vanish.'
        }
      ]
    },

    {
      id: 'lc-reverse-integer',
      title: 'Reverse Integer',
      icon: 'loop',
      xp: 34,
      steps: [
        {
          type: 'concept',
          title: 'The problem',
          body: "Given a signed 32-bit integer `x`, return `x` with its digits **reversed**. If reversing causes the value to fall outside the 32-bit range `[-2^31, 2^31 - 1]`, return `0`.",
          code: 'Input: 123   -> 321\nInput: -123  -> -321\nInput: 120   -> 21'
        },
        {
          type: 'concept',
          title: 'Reverse the string, keep the sign, check overflow',
          body: "Work with the absolute value as a string, reverse it, re-apply the sign. Then verify the result fits in 32 bits before returning it.",
          code: 'sign = -1 if x < 0 else 1\nrev = sign * int(str(abs(x))[::-1])\nif rev < -2**31 or rev > 2**31 - 1:\n    return 0'
        },
        {
          type: 'mcq',
          prompt: 'Why does reversing 120 give 21, not 021?',
          options: [
            'The string is wrong',
            'int("021") is 21 — leading zeros are dropped by integers',
            'It is a bug',
            '120 cannot be reversed'
          ],
          answer: 1,
          explanation: 'Converting the reversed string "021" to an int produces 21; integers have no leading zeros.'
        },
        {
          type: 'code',
          prompt: 'Solve Reverse Integer',
          description: 'Return x with digits reversed, or 0 on 32-bit overflow.',
          examples: [
            { in: '123', out: '321' },
            { in: '-123', out: '-321' },
            { in: '120', out: '21' },
            { in: '1534236469', out: '0' }
          ],
          constraints: ['-2^31 <= x <= 2^31 - 1'],
          hints: [
            'Take the sign, reverse str(abs(x)), convert back to int.',
            'Re-apply the sign, then bounds-check against ±2^31.'
          ],
          starter: 'def reverse_int(x):\n    pass\n',
          spec: {
            functionName: 'reverse_int',
            tests: [
              { input: [123], expected: 321 },
              { input: [-123], expected: -321 },
              { input: [120], expected: 21 },
              { input: [0], expected: 0 },
              { input: [1534236469], expected: 0 }
            ]
          },
          solution: 'def reverse_int(x):\n    sign = -1 if x < 0 else 1\n    rev = sign * int(str(abs(x))[::-1])\n    if rev < -2**31 or rev > 2**31 - 1:\n        return 0\n    return rev',
          solutionNote: 'Python ints never overflow on their own, so the explicit 32-bit check is what enforces the rule.'
        }
      ]
    }
  ]
}

export default chapter
