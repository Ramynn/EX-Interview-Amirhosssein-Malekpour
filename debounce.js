/**
 * @param {Function} fn
 * @param {number} wait
 * @param {{leading?: boolean, trailing?: boolean, maxWait?: number}} [options]
 * @returns {Function & { cancel:()=>void, flush:()=>void }}
 */
const debounce = (fn, wait, options = {}) => {
  // Set defaults: trailing=true, leading=false
  const {
    leading = false,
    trailing = true,
    maxWait
  } = options;

  // State tracking
  let timeout;              // Timer for normal trailing debounce
  let maxWaitTimeout;       // Timer for maxWait enforcement
  let lastArgs;             // Latest arguments passed
  let lastThis;             // Latest context (this)
  let result;               // Last result from fn
  let lastInvokeTime = 0;   // When fn was last actually invoked

  // Actually invoke the function with stored context and args
  const invokeFunc = (time) => {
    const args = lastArgs;
    const thisArg = lastThis;

    lastInvokeTime = time;
    result = fn.apply(thisArg, args);
    return result;
  };

  // Clear all timers
  const clearTimers = () => {
    if (timeout !== undefined) {
      clearTimeout(timeout);
      timeout = undefined;
    }
    if (maxWaitTimeout !== undefined) {
      clearTimeout(maxWaitTimeout);
      maxWaitTimeout = undefined;
    }
  };

  // Handle the trailing edge - fire after quiet period
  const trailingEdge = (time) => {
    clearTimers();

    // Only invoke if trailing is true and we have args (debounced was called)
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }

    // Reset state
    lastArgs = lastThis = undefined;
    return result;
  };

  // Handle leading edge - fire immediately on first call
  const leadingEdge = (time) => {
    // Reset invoke time for this new burst
    lastInvokeTime = time;

    // Start the trailing timer
    timeout = setTimeout(() => trailingEdge(Date.now()), wait);

    // Start maxWait timer if specified (only on first call of burst)
    if (maxWait !== undefined) {
      maxWaitTimeout = setTimeout(() => trailingEdge(Date.now()), maxWait);
    }

    // Invoke immediately if leading is true
    return leading ? invokeFunc(time) : result;
  };

  // The debounced function
  const debounced = function(...args) {
    const time = Date.now();
    const isFirstCall = timeout === undefined;

    // Store latest args and context
    lastArgs = args;
    lastThis = this;

    if (isFirstCall) {
      // First call in a burst - handle leading edge
      return leadingEdge(time);
    }

    // Subsequent call - reset the trailing timer
    clearTimeout(timeout);
    timeout = setTimeout(() => trailingEdge(Date.now()), wait);

    return result;
  };

  // Cancel pending invocations
  const cancel = () => {
    clearTimers();
    lastInvokeTime = 0;
    lastArgs = lastThis = timeout = maxWaitTimeout = undefined;
  };

  // Immediately invoke with current args if pending
  const flush = () => {
    if (timeout === undefined && maxWaitTimeout === undefined) {
      return result;
    }
    return trailingEdge(Date.now());
  };

  // Attach methods to debounced function
  debounced.cancel = cancel;
  debounced.flush = flush;

  return debounced;
};

function testBasic() {
  console.log("=== Test 1: Basic leading + trailing ===");
  const fn = (index) => {
    console.log("Invoked with:", index);
  };

  const debouncedFn = debounce(fn, 1000, {
    leading: true,
    trailing: true,
  });

  debouncedFn(1);
  debouncedFn(2);
  debouncedFn(3);
  // Expected: immediate invoke with 1 (leading), then invoke with 3 after 1000ms (trailing)
}

function testMaxWait() {
  console.log("\n=== Test 2: maxWait enforcement ===");
  const fn = (index) => {
    console.log(`[${Date.now() % 100000}] Invoked with:`, index);
  };

  const debouncedFn = debounce(fn, 500, {
    leading: false,
    trailing: true,
    maxWait: 2000,
  });

  let counter = 0;
  // Call every 200ms for 3 seconds (15 calls total)
  // maxWait should force invokes at 2000ms, 4000ms, etc.
  const interval = setInterval(() => {
    counter++;
    console.log(`[${Date.now() % 100000}] Calling with: ${counter}`);
    debouncedFn(counter);

    if (counter >= 15) {
      clearInterval(interval);
      // Wait for final trailing invoke
      setTimeout(() => {
        console.log("Test 2 complete");
      }, 1000);
    }
  }, 200);
}

function testFlushAndCancel() {
  console.log("\n=== Test 3: flush() and cancel() ===");
  const fn = (msg) => {
    console.log("Flushed/Cancelled:", msg);
  };

  const debouncedFn = debounce(fn, 2000, {
    trailing: true,
  });

  debouncedFn("first");
  debouncedFn("second");

  setTimeout(() => {
    console.log("Calling flush()...");
    debouncedFn.flush(); // Should invoke immediately with "second"
  }, 500);

  setTimeout(() => {
    debouncedFn("third");
    setTimeout(() => {
      console.log("Calling cancel()...");
      debouncedFn.cancel(); // Should prevent invoke
    }, 500);
  }, 2000);
}

// Run tests
testBasic();
setTimeout(testMaxWait, 2000);
setTimeout(testFlushAndCancel, 8000);

//PHASE 1: simple execution of a function after a time period
//PHASE 2: implement cleanup of previous timeouts + cancel whenever
//PHASE 3: implement leading and trailing
