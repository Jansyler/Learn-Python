// Assembles the full course in order and exposes a few helpers used by the UI.
import ch1 from './chapter1-basics.js'
import ch2 from './chapter2-intermediate.js'
import ch3 from './chapter3-strings.js'
import ch4 from './chapter4-logic.js'
import ch5 from './chapter5-leetcode-easy.js'
import ch6 from './chapter6-leetcode-medium.js'
import ch7 from './chapter7-stack-search.js'
import ch8 from './chapter8-dynamic-programming.js'
import ch9 from './chapter9-math-bits.js'
import ch10 from './chapter10-two-pointers.js'
import ch11 from './chapter11-sliding-window.js'

export const chapters = [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10, ch11]

// Flat, ordered list of every lesson with its chapter attached.
export const orderedLessons = chapters.flatMap((ch) =>
  ch.lessons.map((lesson) => ({ ...lesson, chapterId: ch.id, chapterColor: ch.color }))
)

// Unlock rule (Duolingo-style with "jump ahead"):
// - The FIRST lesson of every chapter is always open, so anyone who wants to
//   try a harder section can dive straight in.
// - Inside a chapter, a lesson opens once the previous lesson in that same
//   chapter is completed.
export function isLessonUnlocked(lessonId, completed) {
  const idx = orderedLessons.findIndex((l) => l.id === lessonId)
  if (idx < 0) return false
  const lesson = orderedLessons[idx]
  const prev = orderedLessons[idx - 1]
  // First lesson overall, or first lesson of a new chapter → always open.
  if (!prev || prev.chapterId !== lesson.chapterId) return true
  // Otherwise it unlocks when the previous lesson in the chapter is done.
  return !!completed[prev.id]
}

export function findLesson(lessonId) {
  return orderedLessons.find((l) => l.id === lessonId) || null
}

// The learner's "current" lesson: the first one they haven't completed yet.
// Used to highlight where to go next (the bouncing START marker).
export function currentLessonId(completed) {
  const next = orderedLessons.find((l) => !completed[l.id])
  return next ? next.id : null
}

// Per-chapter completion, for the section progress bars.
export function chapterProgress(chapterId, completed) {
  const lessons = orderedLessons.filter((l) => l.chapterId === chapterId)
  const done = lessons.filter((l) => completed[l.id]).length
  return { done, total: lessons.length }
}

export const totalLessons = orderedLessons.length
