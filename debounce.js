//TODO: needs validation

/**
 * @param {Function} fn
 * @param {number} wait
 * @param {{leading?: boolean, trailing?: boolean, maxWait?: number}} [options]
 * @returns {Function & { cancel:()=>void, flush:()=>void }}
 */
const debounce = (fn, wait, options) => {
  let { leading, trailing } = options;

  let timeout;
  let lastExecuted = undefined;

  const invoke = (...args) => {
    lastExecuted = new Date();
    return fn(...args);
  };

  const debounced = (...args) => {
    if (timeout) {
      cancel();
    }

    if (leading && !Boolean(lastExecuted)) {
      invoke(...args);
    }

    timeout = setTimeout(() => {
      if (trailing) {
        invoke(...args);
      }
    }, [wait]);
  };

  const cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  };

  return {
    cancel,
    debounced,
  };
};

function test() {
  const fn = (index) => {
    console.log("Hi: ", index);
  };

  const debouncedFn = debounce(fn, 1000, {
    leading: true,
    trailing: true,
    maxWait: 3000,
  });

  debouncedFn.debounced(1);
  debouncedFn.debounced(2);
  debouncedFn.debounced(3);
  debouncedFn.debounced(4);
  debouncedFn.debounced(5);
  debouncedFn.debounced(6);
}

test();

//PHASE 1: simple execution of a function after a time period
//PHASE 2: implement cleanup of previous timeouts + cancel whenever
//PHASE 3: implement leading and trailing
