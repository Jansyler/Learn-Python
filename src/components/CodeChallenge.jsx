import React, { useState } from 'react'
import { RichText, CodeBlock, Button } from './ui.jsx'
import { runChallenge } from '../runtime/python.js'

// One interactive coding problem: editor + run-against-tests + reveal solution.
export default function CodeChallenge({ step, onSolved }) {
  const [code, setCode] = useState(step.starter || '')
  const [status, setStatus] = useState('') // boot/progress text
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState(null) // { ok, stdout, cases, error }
  const [hintsShown, setHintsShown] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const [passed, setPassed] = useState(false)

  const handleTab = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const el = e.target
      const start = el.selectionStart
      const end = el.selectionEnd
      const next = code.slice(0, start) + '    ' + code.slice(end)
      setCode(next)
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 4
      })
    }
  }

  const run = async () => {
    setRunning(true)
    setResult(null)
    setStatus('Booting Python…')
    try {
      const res = await runChallenge(code, step.spec, setStatus)
      setResult(res)
      if (res.ok) {
        setPassed(true)
        onSolved && onSolved()
      }
    } catch (err) {
      setResult({
        ok: false,
        cases: [],
        error:
          'Could not start the Python runtime. The first run needs an internet connection to download it. (' +
          (err?.message || err) +
          ')'
      })
    } finally {
      setRunning(false)
      setStatus('')
    }
  }

  return (
    <div className="challenge">
      <h2 className="step-title">{step.prompt}</h2>
      <RichText text={step.description} />

      {step.examples && step.examples.length > 0 && (
        <div className="examples">
          {step.examples.map((ex, i) => (
            <div className="example" key={i}>
              <div><span className="ex-label">Input</span> <code>{ex.in}</code></div>
              <div><span className="ex-label">Output</span> <code>{ex.out}</code></div>
              {ex.note && <div className="ex-note">{ex.note}</div>}
            </div>
          ))}
        </div>
      )}

      {step.constraints && step.constraints.length > 0 && (
        <details className="constraints">
          <summary>Constraints</summary>
          <ul>
            {step.constraints.map((c, i) => (
              <li key={i}><code>{c}</code></li>
            ))}
          </ul>
        </details>
      )}

      {step.approach && (
        <div className="approach">
          <span className="approach-label">💡 Approach</span>
          <RichText text={step.approach} />
        </div>
      )}

      <div className="editor-wrap">
        <textarea
          className="editor"
          value={code}
          spellCheck={false}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleTab}
          rows={Math.max(6, code.split('\n').length + 1)}
        />
      </div>

      <div className="challenge-actions">
        <Button onClick={run} disabled={running}>
          {running ? (status || 'Running…') : passed ? 'Run again' : '▶ Run & Check'}
        </Button>
        {step.hints && hintsShown < step.hints.length && (
          <Button variant="ghost" onClick={() => setHintsShown((n) => n + 1)}>
            Hint ({hintsShown}/{step.hints.length})
          </Button>
        )}
        <Button variant="ghost" onClick={() => setShowSolution((s) => !s)}>
          {showSolution ? 'Hide solution' : 'Solution'}
        </Button>
      </div>

      {step.hints && hintsShown > 0 && (
        <div className="hints">
          {step.hints.slice(0, hintsShown).map((h, i) => (
            <div className="hint" key={i}>👉 {h}</div>
          ))}
        </div>
      )}

      {result && (
        <div className={`run-result ${result.ok ? 'ok' : 'bad'}`}>
          {result.error ? (
            <div className="run-error">
              <strong>Error:</strong>
              <pre>{result.error}</pre>
            </div>
          ) : (
            <>
              <div className="run-headline">
                {result.ok ? '✅ All tests passed!' : '❌ Some tests failed'}
              </div>
              {result.cases.map((c, i) => (
                <div className={`case ${c.passed ? 'pass' : 'fail'}`} key={i}>
                  <span className="case-dot">{c.passed ? '✓' : '✗'}</span>
                  <span className="case-body">
                    {c.label ? c.label : <code>{prettyArgs(c.input)}</code>}
                    {' → got '}
                    <code>{JSON.stringify(c.got)}</code>
                    {!c.passed && (
                      <>
                        {', expected '}
                        <code>{JSON.stringify(c.expected)}</code>
                      </>
                    )}
                    {c.error && <div className="case-err">{c.error}</div>}
                  </span>
                </div>
              ))}
              {result.stdout && (
                <details className="stdout">
                  <summary>Printed output</summary>
                  <pre>{result.stdout}</pre>
                </details>
              )}
            </>
          )}
        </div>
      )}

      {showSolution && (
        <div className="solution">
          <CodeBlock code={step.solution} label="Reference solution" />
          {step.solutionNote && <RichText text={step.solutionNote} />}
        </div>
      )}
    </div>
  )
}

function prettyArgs(input) {
  if (!Array.isArray(input)) return JSON.stringify(input)
  return input.map((a) => JSON.stringify(a)).join(', ')
}
