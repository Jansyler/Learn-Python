import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Home from './Home.jsx'
import Lesson from './Lesson.jsx'
import { findLesson } from '../curriculum/index.js'
import {
  loadProgress,
  saveProgress,
  completeLesson,
  resetProgress
} from '../state/progress.js'

export default function App() {
  const [progress, setProgress] = useState(loadProgress)
  const [view, setView] = useState({ name: 'home' })

  // Scroll position on the home path, so we can return the user to the
  // lesson they came from instead of jumping back to the top.
  const homeScroll = useRef(0)
  const restoreScroll = useRef(false)

  // Persist progress whenever it changes.
  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  // After returning home, restore the saved scroll position (or stay at top
  // when entering a lesson). Runs before paint to avoid a visible jump.
  useLayoutEffect(() => {
    if (view.name === 'home' && restoreScroll.current) {
      window.scrollTo(0, homeScroll.current)
      restoreScroll.current = false
    }
  }, [view])

  const openLesson = (lessonId) => {
    homeScroll.current = window.scrollY
    setView({ name: 'lesson', lessonId })
    window.scrollTo(0, 0)
  }

  const exitToHome = () => {
    restoreScroll.current = true
    setView({ name: 'home' })
  }

  const handleComplete = (lesson, stars) => {
    setProgress((p) => completeLesson(p, lesson.id, lesson.xp, stars))
    exitToHome()
  }

  const handleReset = () => {
    if (window.confirm('Reset all progress? This cannot be undone.')) {
      setProgress(resetProgress())
      exitToHome()
    }
  }

  if (view.name === 'lesson') {
    const lesson = findLesson(view.lessonId)
    if (!lesson) return <Home progress={progress} onPickLesson={openLesson} onReset={handleReset} />
    return (
      <Lesson
        lesson={lesson}
        onExit={exitToHome}
        onComplete={handleComplete}
      />
    )
  }

  return <Home progress={progress} onPickLesson={openLesson} onReset={handleReset} />
}
