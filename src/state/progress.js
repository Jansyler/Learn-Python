// ---------------------------------------------------------------------------
// Progress + gamification, persisted in localStorage (per device, no account).
// ---------------------------------------------------------------------------

const KEY = 'pylingo:progress:v1'

const DEFAULT = {
  xp: 0,
  streak: 0,
  lastActiveDay: null, // 'YYYY-MM-DD'
  completed: {}, // lessonId -> true
  bestStars: {} // lessonId -> 0..3
}

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function dayDiff(a, b) {
  const da = new Date(a + 'T00:00:00')
  const db = new Date(b + 'T00:00:00')
  return Math.round((db - da) / 86400000)
}

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...DEFAULT }
    return { ...DEFAULT, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT }
  }
}

export function saveProgress(p) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    /* storage full or blocked — ignore */
  }
}

// Update the daily streak when the user does anything meaningful.
export function touchStreak(p) {
  const today = todayStr()
  if (p.lastActiveDay === today) return p
  let streak = p.streak || 0
  if (p.lastActiveDay && dayDiff(p.lastActiveDay, today) === 1) {
    streak += 1
  } else {
    streak = 1
  }
  return { ...p, streak, lastActiveDay: today }
}

// Record finishing a lesson: award XP (once), store best star rating.
export function completeLesson(p, lessonId, xp, stars) {
  const next = touchStreak({ ...p })
  next.completed = { ...next.completed, [lessonId]: true }
  const prevStars = next.bestStars[lessonId] || 0
  next.bestStars = { ...next.bestStars, [lessonId]: Math.max(prevStars, stars) }
  // Award XP only the first time a lesson is completed.
  if (!p.completed[lessonId]) {
    next.xp = (next.xp || 0) + xp
  }
  return next
}

export function resetProgress() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  return { ...DEFAULT }
}
