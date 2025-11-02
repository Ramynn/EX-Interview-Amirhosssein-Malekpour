# DigiExpress, Debounce (Core JS → React Hook) — #09
## Part A — Implement `debounce`

**Goal:** Write a **pure JavaScript** `debounce(fn, wait, options?)` that delays invoking `fn` until `wait` ms since the last call.

**Signature**

```js
/**
 * @param {Function} fn
 * @param {number} wait
 * @param {{leading?: boolean, trailing?: boolean, maxWait?: number}} [options]
 * @returns {Function & { cancel:()=>void, flush:()=>void }}
 */
function debounce(fn, wait, options) { /* your code */ }

```

**Requirements**

-   Defaults: `trailing=true`, `leading=false`.
    
-   If `leading=true`, call on the leading edge.
    
-   If `trailing=true`, call once after the quiet period with the **latest** args.
    
-   Preserve `this` and latest args.
    
-   Support `maxWait` (ensure at least one invoke within `maxWait` under constant calls).
    
-   Provide `.cancel()` and `.flush()` on the returned function.
    
-   Errors from `fn` should surface to the caller of the debounced wrapper.
    

**Edge cases to consider:** rapid bursts, `wait=0`, combinations of leading/trailing, cancellation.

----------

## Part B — Wrap in a React Hook

**Goal:** Create `useDebouncedCallback` that reuses your Part A function.

**Signature (TypeScript or JS w/ JSDoc ok)**

```ts
function useDebouncedCallback<T extends (...args:any[])=>any>(
  fn: T,
  wait: number,
  options?: { leading?: boolean; trailing?: boolean; maxWait?: number },
  deps?: any[]
): T & { cancel: () => void; flush: () => void };

```

**Requirements**

-   Use your Part A `debounce` internally.
    
-   Avoid stale closures (always call the latest `fn`).
    
-   Stable identity unless `wait/options/deps` change.
    
-   Clean up timers on unmount (cancel pending).
    

----------

## Deliverables

-   `debounce.js` (or `.ts`)
    
-   `useDebouncedCallback.ts(x)` using your debounce
    
-   A brief README or inline comments explaining behavior and edge cases.
    
-   (Optional) minimal demo or quick tests showing default trailing, leading, `maxWait`, cancel, and flush.
    

**Evaluation focuses on:** correctness (incl. edge cases), API design, clarity, and React interop (memoization & cleanup).
