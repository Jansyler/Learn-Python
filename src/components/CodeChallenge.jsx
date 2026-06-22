import React, { useRef, useState } from 'react'
import { RichText, CodeBlock, Button } from './ui.jsx'
import { Icon } from './icons.jsx'
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
  const taRef = useRef(null)

  // Apply new editor contents and place the caret, keeping React in control.
  const apply = (next, caret) => {
    setCode(next)
    requestAnimationFrame(() => {
      const el = taRef.current
      if (el) el.selectionStart = el.selectionEnd = caret
    })
  }

  // Make the textarea feel like a real Python editor: 4-space soft tabs,
  // Shift+Tab to dedent (how you "close"/leave a block), Enter that keeps the
  // current indent and adds one level after a line ending in ":", and a
  // Backspace that eats a whole soft tab.
  const handleKeyDown = (e) => {
    const el = e.target
    const start = el.selectionStart
    const end = el.selectionEnd

    if (e.key === 'Tab') {
      e.preventDefault()
      if (e.shiftKey) {
        const lineStart = code.lastIndexOf('\n', start - 1) + 1
        const lead = code.slice(lineStart).match(/^ {1,4}/)
        if (lead) {
          const n = lead[0].length
          apply(code.slice(0, lineStart) + code.slice(lineStart + n), Math.max(lineStart, start - n))
        }
      } else {
        apply(code.slice(0, start) + '    ' + code.slice(end), start + 4)
      }
      return
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      const lineStart = code.lastIndexOf('\n', start - 1) + 1
      const lineToCaret = code.slice(lineStart, start)
      let indent = (lineToCaret.match(/^[ \t]*/) || [''])[0]
      if (/:\s*$/.test(lineToCaret)) indent += '    '
      const insert = '\n' + indent
      apply(code.slice(0, start) + insert + code.slice(end), start + insert.length)
      return
    }

    if (e.key === 'Backspace' && start === end) {
      const lineStart = code.lastIndexOf('\n', start - 1) + 1
      if (start - lineStart >= 4 && code.slice(start - 4, start) === '    ') {
        e.preventDefault()
        apply(code.slice(0, start - 4) + code.slice(start), start - 4)
      }
    }
  }

  const lineCount = code.split('\n').length
  const rows = Math.max(6, lineCount + 1)

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
          <span className="approach-label">
            <Icon name="bulb" style={{ verticalAlign: 'middle', marginRight: '0.3em' }} />
            Approach
          </span>
          <RichText text={step.approach} />
        </div>
      )}

      <div className="editor-wrap">
        <div className="code-editor">
          <div className="gutter" aria-hidden="true">
            {Array.from({ length: rows }, (_, i) => (
              <span key={i} className={i < lineCount ? '' : 'gutter-empty'}>
                {i < lineCount ? i + 1 : ''}
              </span>
            ))}
          </div>
          <textarea
            ref={taRef}
            className="editor"
            value={code}
            spellCheck={false}
            wrap="off"
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={rows}
          />
        </div>
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
            <div className="hint" key={i}>
              <Icon name="arrowRight" style={{ verticalAlign: 'middle', marginRight: '0.4em', flexShrink: 0 }} />
              {h}
            </div>
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
                <Icon name={result.ok ? 'checkCircle' : 'xCircle'}
                  style={{ verticalAlign: 'middle', marginRight: '0.4em' }} />
                {result.ok ? 'All tests passed!' : 'Some tests failed'}
              </div>
              {result.cases.map((c, i) => (
                <div className={`case ${c.passed ? 'pass' : 'fail'}`} key={i}>
                  <span className="case-dot">
                    <Icon name={c.passed ? 'check' : 'x'} size="0.9em" />
                  </span>
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
