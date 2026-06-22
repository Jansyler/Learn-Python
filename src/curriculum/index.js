// Assembles the full course in order and exposes a few helpers used by the UI.
import ch1 from './chapter1-basics.js'
import ch2 from './chapter2-intermediate.js'
import ch3 from './chapter3-leetcode-easy.js'
import ch4 from './chapter4-leetcode-medium.js'
import ch5 from './chapter5-stack-search.js'
import ch6 from './chapter6-dynamic-programming.js'
import ch7 from './chapter7-math-bits.js'
import ch8 from './chapter8-two-pointers.js'
import ch9 from './chapter9-sliding-window.js'

export const chapters = [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9]

// Flat, ordered list of every lesson with its chapter attached. The unlock
// rule is simple and Duolingo-like: a lesson opens once the previous one in
// this order is completed (the very first lesson is always open).
export const orderedLessons = chapters.flatMap((ch) =>
  ch.lessons.map((lesson) => ({ ...lesson, chapterId: ch.id, chapterColor: ch.color }))
)

export function isLessonUnlocked(lessonId, completed) {
  const idx = orderedLessons.findIndex((l) => l.id === lessonId)
  if (idx <= 0) return true
  const prev = orderedLessons[idx - 1]
  return !!completed[prev.id]
}

export function findLesson(lessonId) {
  return orderedLessons.find((l) => l.id === lessonId) || null
}

export const totalLessons = orderedLessons.length
