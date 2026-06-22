import React from 'react'
import { chapters, isLessonUnlocked } from '../curriculum/index.js'
import { Icon } from './icons.jsx'

export default function Home({ progress, onPickLesson, onReset }) {
  const totalDone = Object.keys(progress.completed).length

  return (
    <div className="home">
      <header className="home-header">
        <div className="brand">
          <span className="brand-logo"><Icon name="snake" /></span>
          <span className="brand-name">PyLingo</span>
        </div>
        <div className="stats">
          <span className="stat" title="Day streak">
            <Icon name="fire" color="var(--orange)" /> {progress.streak}
          </span>
          <span className="stat" title="Total XP">
            <Icon name="starFilled" color="var(--yellow)" /> {progress.xp}
          </span>
        </div>
      </header>

      <p className="tagline">Learn Python free — one bite at a time, all the way to real LeetCode.</p>

      {chapters.map((ch) => (
        <section className="chapter" key={ch.id}>
          <div className="chapter-banner" style={{ background: ch.color }}>
            <div className="chapter-icon"><Icon name={ch.icon} /></div>
            <div>
              <h2>{ch.title}</h2>
              <p>{ch.subtitle}</p>
            </div>
          </div>

          <div className="path">
            {ch.lessons.map((lesson, i) => {
              const unlocked = isLessonUnlocked(lesson.id, progress.completed)
              const done = !!progress.completed[lesson.id]
              const stars = progress.bestStars[lesson.id] || 0
              const side = i % 2 === 0 ? 'left' : 'right'
              return (
                <div className={`node-row ${side}`} key={lesson.id}>
                  <button
                    className={`node ${done ? 'done' : unlocked ? 'open' : 'locked'}`}
                    style={done || unlocked ? { borderColor: ch.color } : undefined}
                    disabled={!unlocked}
                    onClick={() => unlocked && onPickLesson(lesson.id)}
                  >
                    <span className="node-icon">
                      {done
                        ? <Icon name="check" />
                        : unlocked
                          ? <Icon name={lesson.icon} />
                          : <Icon name="lock" />}
                    </span>
                  </button>
                  <div className="node-label">
                    <span className="node-title">{lesson.title}</span>
                    {stars > 0 && (
                      <span className="node-stars">
                        {Array.from({ length: stars }, (_, i) => (
                          <Icon key={i} name="starFilled" color="var(--yellow)" />
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ))}

      <footer className="home-footer">
        <p>{totalDone} lessons completed</p>
        <button className="reset" onClick={onReset}>Reset progress</button>
        <p className="free-note">Free forever. Replace doomscrolling with leveling up. <Icon name="snake" style={{ verticalAlign: 'middle' }} /></p>
      </footer>
    </div>
  )
}
