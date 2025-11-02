# Prompt History Log

This file tracks all prompts given (exactly as written) and the actual code changes made in response.

---

## Session: 2025-11-02

### Prompt #1
**Prompt (exact):**
```
before we start developing, I want you to keep a log of every prompt you are given (EVEN THIS ONE) and add the actual changes you made to the code from that prompt, in a file called prompt-history.md
```

**Changes Made:**
- Created `/Users/amirmalek/WebstormProjects/digiex/prompt-history.md`
- Initialized prompt tracking system with exact prompt recording

---

### Prompt #2
**Prompt (exact):**
```
it all needs to be exactly what I say, to the letter
```

**Changes Made:**
- Updated prompt-history.md to clarify that prompts will be recorded exactly as written, word for word

---

### Prompt #3
**Prompt (exact):**
```
now I need you to plan implementing the maxWait propert in the debounce function according to the document @DigiExpress-Interview-Question-Debounce/README.md
```

**Changes Made:**
- Completely rewrote the `debounce` function in `/Users/amirmalek/WebstormProjects/digiex/DigiExpress-Interview-Question-Debounce/debounce.js`
  - Added default values: `leading = false`, `trailing = true`
  - Implemented `maxWait` property support with separate timer (`maxWaitTimeout`)
  - Added proper state tracking: `lastArgs`, `lastThis`, `lastInvokeTime`, `result`
  - Implemented `flush()` method for immediate invocation
  - Fixed `cancel()` method to clear all timers and state
  - Fixed return signature: debounced function now has `.cancel()` and `.flush()` methods attached
  - Preserved `this` context and latest arguments correctly
  - Added `invokeFunc()`, `clearTimers()`, `trailingEdge()`, and `leadingEdge()` helper functions
- Updated test function to call debounced function directly (removed `.debounced` property access)
- Added comprehensive test suite with three test scenarios:
  - `testBasic()`: Tests leading + trailing behavior
  - `testMaxWait()`: Tests maxWait enforcement with continuous calls
  - `testFlushAndCancel()`: Tests flush() and cancel() methods
- All tests pass successfully

---

### Prompt #4
**Prompt (exact):**
```
now we need to develop a very simple react app with a search input that uses this funciton to log something to the console
```

**Changes Made:**
- Created `/Users/amirmalek/WebstormProjects/digiex/DigiExpress-Interview-Question-Debounce/useDebouncedCallback.jsx`
  - Implemented React hook wrapper for debounce function (Part B of README)
  - Uses `useRef` to avoid stale closures
  - Uses `useCallback` for stable identity
  - Cleans up timers on unmount with `useEffect`
  - Returns debounced function with `.cancel()` and `.flush()` methods
- Modified `/Users/amirmalek/WebstormProjects/digiex/DigiExpress-Interview-Question-Debounce/debounce.js`
  - Added `export` keyword to debounce function
  - Modified test execution to only run when file is executed directly (not imported)
- Created Vite React project at `/Users/amirmalek/WebstormProjects/digiex/DigiExpress-Interview-Question-Debounce/react-demo/`
  - Initialized with `npm create vite@latest`
  - Installed dependencies with `npm install`
- Copied `debounce.js` and `useDebouncedCallback.jsx` to `react-demo/src/`
- Created `/Users/amirmalek/WebstormProjects/digiex/DigiExpress-Interview-Question-Debounce/react-demo/src/SearchDemo.jsx`
  - Search input component with debounced console logging
  - Uses `useDebouncedCallback` hook with 500ms delay
  - Simulated API call: `console.log('Searching for:', value)`
  - Added Cancel and Flush buttons to demonstrate `.cancel()` and `.flush()` methods
  - Shows current search value in UI
  - Includes instructions panel
- Created `/Users/amirmalek/WebstormProjects/digiex/DigiExpress-Interview-Question-Debounce/react-demo/src/SearchDemo.css`
  - Styled search input, buttons, and info panels
- Updated `/Users/amirmalek/WebstormProjects/digiex/DigiExpress-Interview-Question-Debounce/react-demo/src/App.jsx`
  - Replaced default Vite template with SearchDemo component
- Updated `/Users/amirmalek/WebstormProjects/digiex/DigiExpress-Interview-Question-Debounce/react-demo/src/App.css`
  - Simplified CSS to center content
- Started Vite dev server running at http://localhost:5173/

---
