import React from 'react'

// A tiny, safe "markdown-lite" renderer for teaching text. It supports
// **bold**, `inline code`, "- " bullet lists and blank-line paragraphs.
// We deliberately keep it minimal (no raw HTML) so content stays safe.
function renderInline(text, keyPrefix) {
  // Split on **bold** and `code`, keeping the delimiters via capture groups.
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={`${keyPrefix}-${i}`}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={`${keyPrefix}-${i}`} className="inline-code">{part.slice(1, -1)}</code>
    }
    return <React.Fragment key={`${keyPrefix}-${i}`}>{part}</React.Fragment>
  })
}

export function RichText({ text }) {
  const lines = (text || '').split('\n')
  const blocks = []
  let list = null

  const flushList = () => {
    if (list) {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="rt-list">
          {list.map((item, i) => (
            <li key={i}>{renderInline(item, `li-${blocks.length}-${i}`)}</li>
          ))}
        </ul>
      )
      list = null
    }
  }

  lines.forEach((line, i) => {
    const trimmed = line.trimStart()
    if (trimmed.startsWith('- ')) {
      list = list || []
      list.push(trimmed.slice(2))
    } else if (trimmed === '') {
      flushList()
    } else {
      flushList()
      blocks.push(
        <p key={`p-${i}`} className="rt-p">
          {renderInline(line, `p-${i}`)}
        </p>
      )
    }
  })
  flushList()
  return <div className="rich-text">{blocks}</div>
}

export function CodeBlock({ code, label }) {
  const lines = String(code ?? '').replace(/\n+$/, '').split('\n')
  return (
    <div className="code-block">
      {label && <div className="code-label">{label}</div>}
      <div className="code-scroll">
        <div className="code-gutter" aria-hidden="true">
          {lines.map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <pre>
          <code>{lines.join('\n')}</code>
        </pre>
      </div>
    </div>
  )
}

export function Button({ children, onClick, variant = 'primary', disabled, full }) {
  return (
    <button
      className={`btn btn-${variant}${full ? ' btn-full' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
