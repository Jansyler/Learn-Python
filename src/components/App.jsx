import React, { useEffect, useState } from 'react'
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

  // Persist progress whenever it changes.
  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const openLesson = (lessonId) => {
    window.scrollTo(0, 0)
    setView({ name: 'lesson', lessonId })
  }

  const exitToHome = () => {
    window.scrollTo(0, 0)
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
