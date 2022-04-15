import { APICall } from '../src/APICall';
import { JSONResponse } from '../src/Request';
import { mockAPICall } from './test-utils/MockAPICall';

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

it('calls fetch with the expected parameters with maximum parameters defined', async () => {
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

  const mock = mockAPICall<JSONResponse<{ test: string }>>(
    apiCall,
    {
      test: 'mcgee'
    }
  );

  const response = await apiCall.call();
  const body = await response.json();

  expect(body).toEqual(expect.objectContaining({ test: 'mcgee' }));

  expect(mock.called()).toEqual(true);
});

it('calls fetch with the expected parameters when the minimum is defined', async () => {
  const apiCall = new APICall<Response>({
    apiHost: 'http://localhost',
    path: '/api/test',
  });

  const mock = mockAPICall<Response>(
    apiCall,
    {}
  );

  await apiCall.call();

  expect(mock.called()).toEqual(true);
});
