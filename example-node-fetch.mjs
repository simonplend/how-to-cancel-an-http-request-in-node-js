// example-node-fetch.mjs

import fetch from "node-fetch";

import { setTimeout } from "node:timers/promises";

const cancelRequest = new AbortController();
const cancelTimeout = new AbortController();

async function makeRequest(url) {
  try {
    const response = await fetch(url, { signal: cancelRequest.signal });
    const responseData = await response.json();

    return responseData;
  } finally {
    cancelTimeout.abort();
  }
}

async function timeout(delay) {
  try {
    await setTimeout(delay, undefined, { signal: cancelTimeout.signal });

    cancelRequest.abort();
  } catch (error) {
    return;
  }

  throw new Error(`Request aborted as it took longer than ${delay}ms`);
}

const url = "https://jsonplaceholder.typicode.com/posts";

const result = await Promise.race([makeRequest(url), timeout(100)]);

console.log({ result });
