import React from 'react'
import {
  chapters,
  isLessonUnlocked,
  currentLessonId,
  chapterProgress,
  totalLessons
} from '../curriculum/index.js'
import { Icon } from './icons.jsx'

// Darken a hex colour for the "3D" bottom edge / gradients (button-style depth).
function shade(hex, f) {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  const r = Math.round(((n >> 16) & 255) * f)
  const g = Math.round(((n >> 8) & 255) * f)
  const b = Math.round((n & 255) * f)
  return `rgb(${r}, ${g}, ${b})`
}

export default function Home({ progress, onPickLesson, onReset }) {
  const totalDone = Object.keys(progress.completed).length
  const currentId = currentLessonId(progress.completed)
  const pct = Math.round((totalDone / totalLessons) * 100)

  return (
    <div className="home">
      <header className="home-header">
        <div className="brand">
          <span className="brand-logo"><Icon name="snake" /></span>
          <span className="brand-name">Pythopia</span>
        </div>
        <div className="stats">
          <span className="stat streak" title="Day streak">
            <Icon name="fire" /> {progress.streak}
          </span>
          <span className="stat xp" title="Total XP">
            <Icon name="bolt" /> {progress.xp}
          </span>
        </div>
      </header>

      <div className="hero">
        <h1 className="hero-title">Learn Python, free</h1>
        <p className="hero-sub">One bite at a time — all the way to real LeetCode.</p>
        <div className="hero-progress">
          <div className="hero-bar"><div className="hero-fill" style={{ width: `${pct}%` }} /></div>
          <span className="hero-count">{totalDone}/{totalLessons}</span>
        </div>
        <p className="hero-tip">
          <Icon name="bolt" /> Tip: the first lesson of every section is unlocked — jump ahead anytime.
        </p>
      </div>

      {chapters.map((ch) => {
        const cp = chapterProgress(ch.id, progress.completed)
        const cpPct = Math.round((cp.done / cp.total) * 100)
        const dark = shade(ch.color, 0.8)
        return (
          <section className="chapter" key={ch.id}>
            <div
              className="chapter-banner"
              style={{ backgroundImage: `linear-gradient(135deg, ${ch.color}, ${dark})` }}
            >
              <div className="chapter-icon"><Icon name={ch.icon} /></div>
              <div className="chapter-meta">
                <h2>{ch.title}</h2>
                <p>{ch.subtitle}</p>
                <div className="chapter-progress">
                  <div className="chapter-bar"><div className="chapter-fill" style={{ width: `${cpPct}%` }} /></div>
                  <span className="chapter-count">{cp.done}/{cp.total}</span>
                </div>
              </div>
            </div>

            <div className="path">
              {ch.lessons.map((lesson) => {
                const unlocked = isLessonUnlocked(lesson.id, progress.completed)
                const done = !!progress.completed[lesson.id]
                const isCurrent = lesson.id === currentId
                const stars = progress.bestStars[lesson.id] || 0
                const state = done ? 'done' : unlocked ? 'open' : 'locked'
                const nodeStyle =
                  done || unlocked
                    ? { '--c': ch.color, '--cd': shade(ch.color, 0.78) }
                    : undefined
                return (
                  <div className={`node-row ${isCurrent ? 'current' : ''}`} key={lesson.id}>
                    {isCurrent && <div className="start-bubble">START</div>}
                    <button
                      className={`node ${state} ${isCurrent ? 'pulse' : ''}`}
                      style={nodeStyle}
                      disabled={!unlocked}
                      onClick={() => unlocked && onPickLesson(lesson.id)}
                      aria-label={lesson.title}
                    >
                      <span className="node-icon">
                        {done ? <Icon name="check" /> : unlocked ? <Icon name={lesson.icon} /> : <Icon name="lock" />}
                      </span>
                    </button>
                    <div className="node-label">
                      <span className="node-title">{lesson.title}</span>
                      {done && (
                        <span className="node-stars">
                          {Array.from({ length: 3 }, (_, i) => (
                            <Icon key={i} name="starFilled" color={i < stars ? 'var(--gold)' : 'var(--line)'} size="0.85em" />
                          ))}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}

      <footer className="home-footer">
        <div className="footer-card">
          <p className="footer-stat"><strong>{totalDone}</strong> of {totalLessons} lessons complete</p>
          <p className="free-note">Free forever. Replace doomscrolling with leveling up.</p>
          <button className="reset" onClick={onReset}>Reset progress</button>
        </div>
      </footer>
    </div>
  )
}
