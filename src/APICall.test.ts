import { APICall } from './APICall';
import fetchMock = require('fetch-mock');
import { JSONResponse } from './Request';

it('initializes the url correctly with hostname and path', () => {
  const apiCall = new APICall({
    apiHost: 'http://localhost',
    path: '/api/test',
  });

  expect(apiCall.url.toString()).toEqual('http://localhost/api/test');
});

it('initializes the url correctly with hostname, path, and search params', () => {
  const apiCall = new APICall({
    apiHost: 'http://localhost',
    path: '/api/test',
    search: new URLSearchParams({
      foo: 'bar',
    }),
  });

  expect(apiCall.url.toString()).toEqual('http://localhost/api/test?foo=bar');
});

it('calls fetch with the expected parameters', async () => {
  const mock = fetchMock.mock({
    url: 'http://localhost/api/test?foo=bar',
    method: 'POST',
    headers: {
      baz: 'barbaz'
    },
    body: {
      test: 'mcgee',
    },
  }, {
    test: 'mcgee',
  });

  const apiCall = new APICall<JSONResponse<{ test: string }>>({
    apiHost: 'http://localhost',
    path: '/api/test',
    search: new URLSearchParams({
      foo: 'bar',
    }),
    method: 'POST',
    headers: {
      baz: 'barbaz'
    },
    body: JSON.stringify({ test: 'mcgee' }),
  });

  const response = await apiCall.call();
  const body = await response.json();

  expect(body).toEqual(expect.objectContaining({ test: 'mcgee' }));

  expect(mock.called()).toEqual(true);
});
