# 🐍 PyLingo — Learn Python the Duolingo way

**Free. Forever. For everyone.**

PyLingo turns learning Python into short, addictive, game-like lessons — the
same dopamine loop that keeps you doomscrolling, pointed at something that
actually makes you better. Bite-sized cards, streaks, XP and hearts carry you
from `print("hello")` all the way to real **LeetCode** interview problems that
run and grade your code instantly, right on your phone.

> The idea: replace 20 minutes of mindless scrolling with 20 minutes of
> leveling up. No paywall, no account, no ads — just you getting good at Python.

---

## ✨ What it does

- **A learning path, Duolingo-style.** Chapters unlock lesson by lesson. Each
  node shows your stars; finish one to open the next.
- **Lessons are a mix of step types**, so it never feels like a lecture:
  - 📖 **Concept cards** — short, plain-English explanations with example code
  - ✅ **Multiple choice** — quick understanding checks
  - 🔮 **Predict the output** — read code, guess what it prints
  - ⌨️ **Fill in the blank** — complete the missing piece
  - 🧠 **Code challenges** — write real Python, run it against hidden test cases
- **Real Python, in your browser.** Code challenges execute actual CPython via
  [Pyodide](https://pyodide.org) (Python compiled to WebAssembly). Your solution
  is run against multiple test cases and graded — no backend, no API keys, no
  setup.
- **Precise LeetCode problems.** Every coding problem includes the exact
  statement, worked examples, constraints, a guided **approach**, progressive
  **hints**, runnable **tests**, and a fully **explained reference solution**.
- **Gamified + offline-friendly.** XP, daily streaks, hearts and a star rating
  per lesson, all saved on your device. Installable as a phone app (PWA).

---

## 🧱 How it's made (the stack)

PyLingo is intentionally a **small, readable codebase** — it's also meant to be
a thing you can learn *from*.

| Layer            | Choice                        | Why |
|------------------|-------------------------------|-----|
| UI               | **React 18 + Vite**           | Fast, simple, hot-reload dev |
| Python runtime   | **Pyodide (CPython → WASM)**  | Runs *real* Python client-side, so challenges actually execute |
| Mobile app       | **PWA** (manifest + service worker) | Installable on iOS/Android, works like a native app, offline shell |
| State / progress | **localStorage**              | No accounts, your data stays on your device |
| Styling          | **Hand-written CSS**          | Duolingo-inspired, mobile-first, zero UI dependencies |
| Content          | **Plain JS data files**       | Lessons are just data — easy to read, easy to add to |

There is **no server**. The whole thing is static files plus a Python runtime
that the browser downloads once (~10 MB) and then caches. That's what makes it
free to host and free to run.

### Project layout

```
learn-python/               ← repo root
├── index.html
├── vite.config.js
├── package.json
├── vercel.json
├── netlify.toml
├── public/
│   ├── manifest.webmanifest   # makes it installable
│   ├── sw.js                  # service worker (offline shell)
│   └── icon.svg
└── src/
    ├── main.jsx
    ├── styles.css
    ├── runtime/
    │   └── python.js          # Pyodide loader + the grading harness
    ├── state/
    │   └── progress.js        # XP / streak / unlocks (localStorage)
    ├── curriculum/            # ← all the lessons live here, as data
    │   ├── index.js           # assembles + orders the course
    │   ├── chapter1-basics.js
    │   ├── chapter2-intermediate.js
    │   ├── chapter3-leetcode-easy.js
    │   ├── chapter4-leetcode-medium.js
    │   ├── chapter5-stack-search.js
    │   ├── chapter6-dynamic-programming.js
    │   └── chapter7-math-bits.js
    └── components/
        ├── App.jsx            # routes between Home and a Lesson
        ├── Home.jsx           # the learning path / tree
        ├── Lesson.jsx         # the lesson player (steps, hearts, XP)
        ├── CodeChallenge.jsx  # the in-browser code editor + grader
        └── ui.jsx             # tiny shared bits (markdown-lite, buttons)
```

---

## 🚀 Run it

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

The repo ships ready-to-go configs at the **repo root** so you can deploy
straight from a phone browser — these work even with a **private** repo:

- **Netlify** (`netlify.toml`): go to [app.netlify.com](https://app.netlify.com)
  → *Add new site* → *Import an existing project* → connect GitHub → pick this
  repo → **Deploy**. You get a `https://<name>.netlify.app` URL.
- **Vercel** (`vercel.json`): go to [vercel.com/new](https://vercel.com/new) →
  import this repo → **Deploy**. You get a `https://<name>.vercel.app` URL.

Both read the config automatically (the build runs from the repo root and outputs to `dist/`). Open the URL on your phone and **Add to Home Screen**.

> ⚠️ The **first** time you open a code challenge, the browser downloads the
> Python runtime, so that one needs an internet connection. After that it's
> cached.

---

## 🗺️ The curriculum (and the road to full LeetCode coverage)

The course is built as a **topic-based roadmap** (inspired by Blind 75 /
NeetCode 150 and the classic LeetCode patterns), so the order teaches you
*transferable patterns*, not random problems:

| Chapter | Theme | Status |
|--------|-------|--------|
| 1. Python Basics | print, variables, types, math, strings, booleans, if, loops, functions, lists, dicts | ✅ |
| 2. Pythonic Tools | slicing, comprehensions, sets, enumerate/zip | ✅ |
| 3. LeetCode · Easy | Two Sum, Palindrome Number, Valid Anagram, Contains Duplicate, Best Time to Buy & Sell Stock, Valid Palindrome | ✅ |
| 4. LeetCode · Medium | Maximum Subarray, Group Anagrams, Longest Substring Without Repeats, Product of Array Except Self | ✅ |
| 5. Stack & Binary Search | Valid Parentheses, Binary Search, Daily Temperatures | ✅ |
| 6. Dynamic Programming | Climbing Stairs, House Robber, Coin Change | ✅ |
| 7. Math & Bit Tricks | Fizz Buzz, Single Number, Reverse Integer | ✅ |
| 8. Two Pointers | Two Sum II, Valid Palindrome II, Container With Most Water, 3Sum | ✅ |
| 9. Sliding Window | Minimum Size Subarray Sum, Longest Repeating Char Replacement, Find All Anagrams | ✅ |
| 10+. Linked Lists, Trees, Tries, Heaps, Backtracking, Graphs, Greedy, Intervals, Advanced DP | the rest of the ~150–200 canonical problems | 🚧 growing |

**An honest note on "all 200 problems":** the goal is full coverage of the
canonical interview set, and the engine already supports it — but every problem
here is *hand-written* with a precise description, hints, real test cases and an
explained solution, so they're added in curated batches rather than dumped in
all at once. What ships today is a complete, polished core (the highest-value
patterns); the roadmap above is the path to the full set. Adding the next
problem is deliberately a ~5-minute job (see below), so this list grows fast.

---

## ➕ Add a lesson or problem (it's just data)

A lesson is a plain object. To add a coding problem, drop a `code` step into any
chapter's `lessons` array:

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

That's it — no test harness to write. Contributions that add well-explained
problems toward the roadmap are exactly the point of this project. 💚

---

## 🙌 Why free?

Learning to code shouldn't be gated behind a subscription. PyLingo is built to
be hosted for nothing and used by anyone — a student on a cheap phone, someone
switching careers, or you, replacing five minutes of scrolling with five minutes
of getting sharper. Share it, fork it, add problems to it.

Happy hacking. 🐍
