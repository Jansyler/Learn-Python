# Pythopia — Learn Python by playing

**Free. Forever. For everyone.**

Pythopia turns learning Python into short, game-like lessons. Bite-sized cards,
streaks, XP, hearts and a star rating per lesson carry you from
`print("hello")` all the way to real **LeetCode** interview problems that run
and grade your code instantly, right in your browser or on your phone.

> The idea: replace five minutes of mindless scrolling with five minutes of
> leveling up. No paywall, no account, no ads — just you getting good at Python.

---

## What it does

- **A learning path you can play your way.** Lessons unlock one-by-one inside a
  section. The **first lesson of every section is always open**, so if you
  already know the basics you can jump straight ahead to a harder section. Each
  node shows your best star rating, and a bouncing **START** marker points at
  where you left off.
- **A gentle on-ramp, then the real thing.** The first four sections build real
  Python and problem-solving skill *before* the first interview problem — no
  leap straight from "hello world" to LeetCode.
- **Lessons mix step types**, so it never feels like a lecture:
  - **Concept cards** — short, plain-English explanations with example code
  - **Multiple choice** — quick understanding checks
  - **Predict the output** — read code, guess what it prints
  - **Fill in the blank** — complete the missing piece
  - **Code challenges** — write real Python, run it against hidden test cases
- **Real Python, in your browser.** Code challenges execute actual CPython via
  [Pyodide](https://pyodide.org) (Python compiled to WebAssembly). Your solution
  runs against multiple test cases and is graded — no backend, no API keys, no
  setup.
- **Precise LeetCode problems.** Every coding problem includes the exact
  statement, worked examples, constraints, a guided **approach**, progressive
  **hints**, runnable **tests**, and a fully **explained reference solution**.
- **Gamified + offline-friendly.** XP, a daily streak, hearts and per-lesson
  stars, all saved on your device. Installable as a phone app (PWA).

---

## How it's made (the stack)

Pythopia is intentionally a **small, readable codebase** — it's also meant to be
a thing you can learn *from*.

| Layer            | Choice                              | Why |
|------------------|-------------------------------------|-----|
| UI               | **React 18 + Vite**                 | Fast, simple, hot-reload dev |
| Python runtime   | **Pyodide (CPython → WASM)**        | Runs *real* Python client-side, so challenges actually execute |
| Mobile app       | **PWA** (manifest + service worker) | Installable on iOS/Android, works like a native app, offline shell |
| State / progress | **localStorage**                    | No accounts — your data stays on your device |
| Styling          | **Hand-written CSS**                | Mobile-first, playful, zero UI dependencies |
| Content          | **Plain JS data files**             | Lessons are just data — easy to read, easy to add to |

There is **no server**. The whole thing is static files plus a Python runtime
that the browser downloads once (~10 MB) and then caches. That's what makes it
free to host and free to run.

### Project layout

The app lives at the **repository root** (there is no nested app folder):

```
.
├── index.html
├── vite.config.js
├── netlify.toml / vercel.json   # ready-to-deploy configs
├── public/
│   ├── manifest.webmanifest     # makes it installable
│   ├── sw.js                    # service worker (offline shell)
│   └── icon.svg
└── src/
    ├── main.jsx
    ├── styles.css
    ├── runtime/
    │   └── python.js            # Pyodide loader + the grading harness
    ├── state/
    │   └── progress.js          # XP / streak / unlocks (localStorage)
    ├── curriculum/              # ← all the lessons live here, as data
    │   ├── index.js             # assembles + orders the course + unlock rules
    │   ├── chapter1-basics.js
    │   ├── chapter2-intermediate.js
    │   ├── chapter3-strings.js
    │   ├── chapter4-logic.js
    │   ├── chapter5-leetcode-easy.js
    │   ├── chapter6-leetcode-medium.js
    │   ├── chapter7-stack-search.js
    │   ├── chapter8-dynamic-programming.js
    │   ├── chapter9-math-bits.js
    │   ├── chapter10-two-pointers.js
    │   └── chapter11-sliding-window.js
    └── components/
        ├── App.jsx              # routes between Home and a Lesson
        ├── Home.jsx             # the learning path / sections
        ├── Lesson.jsx           # the lesson player (steps, hearts, XP)
        ├── CodeChallenge.jsx    # the in-browser code editor + grader
        ├── icons.jsx            # SVG icon library
        └── ui.jsx               # tiny shared bits (markdown-lite, buttons)
```

---

## Run it

```bash
npm install
npm run dev
```

Then open the printed URL. To use it on your **phone**, make sure the phone is
on the same Wi-Fi and open `http://<your-computer-ip>:5173`. In the browser
menu choose **"Add to Home Screen"** — now it launches fullscreen like a real
app.

Production build:

```bash
npm run build      # outputs static files to dist/
npm run preview    # serve the built app locally
```

Because the build is fully static, you can host it for free anywhere.

### Get a public URL (test it on your phone)

The repo ships ready-to-go configs at the root so you can deploy straight from a
phone browser — these work even with a **private** repo:

- **Netlify** (`netlify.toml`): go to [app.netlify.com](https://app.netlify.com)
  → *Add new site* → *Import an existing project* → connect GitHub → pick this
  repo → **Deploy**. You get a `https://<name>.netlify.app` URL.
- **Vercel** (`vercel.json`): go to [vercel.com/new](https://vercel.com/new) →
  import this repo → **Deploy**. You get a `https://<name>.vercel.app` URL.

Both read the config automatically. Open the URL on your phone and **Add to
Home Screen**.

> **Note:** The first time you open a code challenge, the browser downloads the
> Python runtime, so that one needs an internet connection. After that it's
> cached and works offline.

---

## The curriculum

The course is a **topic-based roadmap** (inspired by the Blind 75 / NeetCode
patterns), so the order teaches *transferable patterns*, not random problems.
The first four sections are a gentle on-ramp; everything from section 5 on is
real interview problems.

| Section | Theme |
|--------|-------|
| 1. Python Basics | print, variables, types, math, strings, booleans, if, loops, functions, lists, dicts, type conversion, loop control |
| 2. Pythonic Tools | slicing, comprehensions, sets, enumerate/zip, tuples & unpacking, dict/set builds, sorting |
| 3. Strings & Text | string methods, looping over text, split/join, palindromes & word counts |
| 4. Logic & Problem Solving | branching, loop patterns (max/count), transform & filter, FizzBuzz, second largest |
| 5. LeetCode · Easy | Two Sum, Palindrome Number, Valid Anagram, Contains Duplicate, Best Time to Buy & Sell Stock, Valid Palindrome |
| 6. LeetCode · Medium | Maximum Subarray, Group Anagrams, Longest Substring Without Repeats, Product of Array Except Self |
| 7. Stack & Binary Search | Valid Parentheses, Binary Search, Daily Temperatures |
| 8. Dynamic Programming | Climbing Stairs, House Robber, Coin Change |
| 9. Math & Bit Tricks | Fizz Buzz, Single Number, Reverse Integer |
| 10. Two Pointers | Two Sum II, Valid Palindrome II, Container With Most Water, 3Sum |
| 11. Sliding Window | Minimum Size Subarray Sum, Longest Repeating Char Replacement, Find All Anagrams |

**On the road ahead:** the goal is full coverage of the canonical interview set
(Linked Lists, Trees, Tries, Heaps, Backtracking, Graphs, Greedy, Intervals,
Advanced DP, …). The engine already supports it — but every problem here is
*hand-written* with a precise description, hints, real test cases and an
explained solution, so they're added in curated batches rather than dumped in
all at once. Adding the next problem is deliberately a ~5-minute job (see
below), so this list grows fast.

---

## Add a lesson or problem (it's just data)

A lesson is a plain object. To add a coding problem, drop a `code` step into any
section's `lessons` array:

```js
{
  type: 'code',
  prompt: 'Solve Two Sum',
  description: 'Return the indices of the two numbers that add up to target.',
  examples: [{ in: 'nums = [2,7,11,15], target = 9', out: '[0, 1]' }],
  constraints: ['2 <= len(nums) <= 10^4'],
  approach: 'Use a hash map of value -> index for an O(n) single pass.',
  hints: ['The partner you need is target - n.', 'Check the map before storing.'],
  starter: 'def two_sum(nums, target):\n    pass\n',
  spec: {
    functionName: 'two_sum',           // the function the learner must define
    tests: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] }
      // input is the argument list; expected is the return value
    ]
    // add `unordered: true` if order within/among the result lists shouldn't matter
  },
  solution: 'def two_sum(nums, target):\n    ...',
  solutionNote: 'A sentence or two explaining why it works.'
}
```

Grading modes the runtime supports:

- **`functionName` + `tests`** — calls your function with each `input` and
  compares the return value to `expected` (set `unordered: true` for
  order-insensitive results).
- **`expectedStdout`** — checks what your code *prints* (great for the basics).

That's it — no test harness to write. To add a whole new section, create a
`chapterN-*.js` file that exports `{ id, title, subtitle, color, icon, lessons }`
and register it in `src/curriculum/index.js`.

---

## Why free?

Learning to code shouldn't be gated behind a subscription. Pythopia is built to
be hosted for nothing and used by anyone — a student on a cheap phone, someone
switching careers, or you, replacing five minutes of scrolling with five minutes
of getting sharper. Share it, fork it, add problems to it.

Happy hacking.
