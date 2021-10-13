// example-abort-api.mjs

const controller = new AbortController();
const signal = controller.signal;

signal.addEventListener("abort", () => {
  console.log("The abort signal was triggered");
}, { once: true });

controller.abort();
