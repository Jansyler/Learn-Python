import React, { useState } from 'react'
import { RichText, CodeBlock, Button } from './ui.jsx'
import CodeChallenge from './CodeChallenge.jsx'

const START_HEARTS = 5

// The lesson player: walks through steps one at a time, Duolingo style.
export default function Lesson({ lesson, onExit, onComplete }) {
  const [index, setIndex] = useState(0)
  const [hearts, setHearts] = useState(START_HEARTS)
  const [solvedStep, setSolvedStep] = useState(false)
  const [finished, setFinished] = useState(false)

  const steps = lesson.steps
  const step = steps[index]
  const progress = Math.round((index / steps.length) * 100)

  const loseHeart = () => setHearts((h) => Math.max(0, h - 1))

  const next = () => {
    setSolvedStep(false)
    if (index + 1 >= steps.length) {
      setFinished(true)
    } else {
      setIndex((i) => i + 1)
    }
  }

  if (finished) {
    const stars = hearts >= 5 ? 3 : hearts >= 3 ? 2 : 1
    return (
      <div className="lesson-done">
        <div className="done-emoji">🎉</div>
        <h1>Lesson complete!</h1>
        <div className="stars-big">{'⭐'.repeat(stars)}{'·'.repeat(3 - stars)}</div>
        <p className="done-xp">+{lesson.xp} XP</p>
        <p className="done-sub">{hearts} / {START_HEARTS} hearts left</p>
        <Button full onClick={() => onComplete(lesson, stars)}>Continue</Button>
      </div>
    )
  }

  return (
    <div className="lesson">
      <div className="lesson-top">
        <button className="quit" onClick={onExit} aria-label="Quit lesson">✕</button>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="hearts">{'❤️'.repeat(hearts)}{'🤍'.repeat(START_HEARTS - hearts)}</div>
      </div>

      <div className="lesson-body">
        <Step
          key={index}
          step={step}
          onSolved={() => setSolvedStep(true)}
          onWrong={loseHeart}
        />
      </div>

      <div className="lesson-footer">
        <Button
          full
          onClick={next}
          disabled={needsSolve(step) && !solvedStep}
        >
          {index + 1 >= steps.length ? 'Finish' : 'Continue'}
        </Button>
      </div>
    </div>
  )
}

function needsSolve(step) {
  return ['mcq', 'predict', 'fill', 'code'].includes(step.type)
}

function Step({ step, onSolved, onWrong }) {
  switch (step.type) {
    case 'concept':
      return <ConceptStep step={step} />
    case 'mcq':
    case 'predict':
      return <ChoiceStep step={step} onSolved={onSolved} onWrong={onWrong} />
    case 'fill':
      return <FillStep step={step} onSolved={onSolved} onWrong={onWrong} />
    case 'code':
      return <CodeChallenge step={step} onSolved={onSolved} />
    default:
      return <p>Unknown step.</p>
  }
}

function ConceptStep({ step }) {
  return (
    <div className="concept">
      <h2 className="step-title">{step.title}</h2>
      <RichText text={step.body} />
      {step.code && <CodeBlock code={step.code} />}
    </div>
  )
}

function ChoiceStep({ step, onSolved, onWrong }) {
  const [picked, setPicked] = useState(null)
  const correct = picked === step.answer
  const answered = picked !== null

  const choose = (i) => {
    if (correct) return // lock once correct
    setPicked(i)
    if (i === step.answer) onSolved()
    else onWrong()
  }

  return (
    <div className="choice">
      <h2 className="step-title">
        {step.type === 'predict' ? '🔮 Predict the output' : step.prompt}
      </h2>
      {step.type === 'predict' && <p className="sub-prompt">{step.prompt}</p>}
      {step.code && <CodeBlock code={step.code} />}
      <div className="options">
        {step.options.map((opt, i) => {
          let cls = 'option'
          if (answered && i === step.answer) cls += ' correct'
          else if (picked === i && i !== step.answer) cls += ' wrong'
          return (
            <button key={i} className={cls} onClick={() => choose(i)}>
              {opt}
            </button>
          )
        })}
      </div>
      {answered && (
        <div className={`explanation ${correct ? 'good' : 'try'}`}>
          {correct ? '✅ ' : '❌ Not quite. '}
          {step.explanation}
        </div>
      )}
    </div>
  )
}

function FillStep({ step, onSolved, onWrong }) {
  const [value, setValue] = useState('')
  const [state, setState] = useState(null) // 'good' | 'bad'

  const accepts = (step.answers || []).map((a) =>
    step.caseInsensitive ? a.toLowerCase() : a
  )

  const check = () => {
    const v = step.caseInsensitive ? value.trim().toLowerCase() : value.trim()
    if (accepts.includes(v)) {
      setState('good')
      onSolved()
    } else {
      setState('bad')
      onWrong()
    }
  }

  return (
    <div className="fill">
      <h2 className="step-title">{step.prompt}</h2>
      <div className="fill-code">
        <pre>
          <code>
            {step.codeBefore}
            <input
              className={`blank ${state || ''}`}
              value={value}
              spellCheck={false}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && check()}
              placeholder="?"
            />
            {step.codeAfter}
          </code>
        </pre>
      </div>
      <Button onClick={check} disabled={state === 'good'}>Check</Button>
      {state === 'good' && (
        <div className="explanation good">✅ {step.explanation}</div>
      )}
      {state === 'bad' && (
        <div className="explanation try">❌ Try again. {step.hint || ''}</div>
      )}
    </div>
  )
}
