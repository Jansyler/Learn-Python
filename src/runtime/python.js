// ---------------------------------------------------------------------------
// Pythopia Python runtime
//
// We run REAL Python in the browser using Pyodide (CPython compiled to
// WebAssembly). This means the coding challenges actually execute your code
// and check it against test cases — no backend, no API keys.
//
// The first time you open a code challenge the browser downloads Pyodide
// (~10 MB) from a CDN. After that it is cached.
// ---------------------------------------------------------------------------

const PYODIDE_VERSION = '0.26.4'
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`

let pyodidePromise = null

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.onload = resolve
    s.onerror = () => reject(new Error('Failed to load ' + src))
    document.head.appendChild(s)
  })
}

// Lazily boot Pyodide once and reuse it for every challenge.
export function getPyodide(onStatus) {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      onStatus && onStatus('Downloading Python runtime…')
      if (!window.loadPyodide) {
        await loadScript(PYODIDE_BASE + 'pyodide.js')
      }
      onStatus && onStatus('Starting Python…')
      const py = await window.loadPyodide({ indexURL: PYODIDE_BASE })
      return py
    })().catch((err) => {
      // Reset so a later retry (e.g. once back online) can try again.
      pyodidePromise = null
      throw err
    })
  }
  return pyodidePromise
}

// This Python harness runs the learner's code and grades it. It reads two
// values from globals that we set from JS: `user_code` (string) and
// `test_spec` (JSON string). It returns a JSON string describing the result.
const HARNESS = `
import json, sys, io, traceback

def _jsonable(v):
    try:
        json.dumps(v)
        return v
    except TypeError:
        if isinstance(v, (set, frozenset)):
            return sorted(_jsonable(x) for x in v)
        if isinstance(v, (list, tuple)):
            return [_jsonable(x) for x in v]
        if isinstance(v, dict):
            return {str(k): _jsonable(x) for k, x in v.items()}
        return repr(v)

def _canon(v, unordered):
    # Canonical form for comparison. When unordered=True we recursively sort
    # every list so order never matters at any depth (used by e.g. Group
    # Anagrams). When unordered=False, list order is significant.
    v = _jsonable(v)
    if isinstance(v, list):
        items = [_canon(x, unordered) for x in v]
        if unordered:
            items = sorted(items, key=lambda x: json.dumps(x, sort_keys=True))
        return items
    if isinstance(v, dict):
        return {k: _canon(x, unordered) for k, x in v.items()}
    return v

def _eq(a, b, unordered):
    return _canon(a, unordered) == _canon(b, unordered)

def _fmt_exc():
    et, ev, tb = sys.exc_info()
    return ''.join(traceback.format_exception_only(et, ev)).strip()

def _run():
    spec = json.loads(test_spec)
    out = {"ok": False, "stdout": "", "cases": [], "error": None}
    ns = {}
    buf = io.StringIO()
    real = sys.stdout
    sys.stdout = buf
    try:
        exec(user_code, ns)
    except Exception:
        sys.stdout = real
        out["error"] = _fmt_exc()
        out["stdout"] = buf.getvalue()
        return out
    sys.stdout = real
    out["stdout"] = buf.getvalue()

    # Mode 1: check printed output.
    if spec.get("expectedStdout") is not None:
        got = out["stdout"].strip()
        exp = str(spec["expectedStdout"]).strip()
        passed = got == exp
        out["cases"].append({"label": "Output", "expected": exp, "got": got, "passed": passed})
        out["ok"] = passed
        return out

    # Mode 2: call a function and compare return values.
    fn = spec.get("functionName")
    if fn:
        f = ns.get(fn)
        if not callable(f):
            out["error"] = "Define a function called \`" + str(fn) + "\`."
            return out
        all_pass = True
        unordered = bool(spec.get("unordered", False))
        for t in spec.get("tests", []):
            args = t.get("input", [])
            case = {"input": args, "expected": t.get("expected"), "got": None, "passed": False}
            try:
                res = f(*[__import__('copy').deepcopy(a) for a in args])
                case["got"] = _jsonable(res)
                case["passed"] = _eq(res, t.get("expected"), unordered)
            except Exception:
                case["error"] = _fmt_exc()
            if not case["passed"]:
                all_pass = False
            out["cases"].append(case)
        out["ok"] = all_pass
        return out

    # Mode 3: no automatic checks — just confirm it ran.
    out["ok"] = True
    return out

json.dumps(_run())
`

// Run user code against a spec. Returns { ok, stdout, cases, error }.
export async function runChallenge(userCode, spec, onStatus) {
  const py = await getPyodide(onStatus)
  py.globals.set('user_code', userCode)
  py.globals.set('test_spec', JSON.stringify(spec || {}))
  const resultJson = await py.runPythonAsync(HARNESS)
  return JSON.parse(resultJson)
}

// Run code with no grading (used by the free-play "Run" button in lessons).
export async function runFree(userCode, onStatus) {
  return runChallenge(userCode, {}, onStatus)
}
