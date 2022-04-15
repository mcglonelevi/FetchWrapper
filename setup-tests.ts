import fetch, { Headers } from 'node-fetch';

// @ts-expect-error
global.fetch = fetch;

// @ts-expect-error
global.Headers = Headers;
