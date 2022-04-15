# Fetch Wrapper?

## Better Name TBD

### What is this?

I get tired of writing the same network mocking utilities at every company I go to.  I hope this will be the best wrapper around fetch you'll ever use.  I also hope that the network mocking utilities will be :100:.  Use this library and your network woes will (probably) go away.

### Intended Usage

Import the APICall class and watch the magic happen:

```js
import { APICall } from 'fetch-wrapper';

function doSomeNetworkMagic() {
  const apiCall = new APICall({
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
  const json = response.json();
}
```

### Extend It!

#### Auth Tokens

Want to make an authenticated call class for your own usage?  Just extend APICall to send your auth token header:

```js
import { APICall } from 'fetch-wrapper';
import { getAPIToken } from 'your-project';

class AuthenticatedAPICall extends APICall {
  constructor(params) {
    super({
      apiHost: process.env.API_HOST,
      path: params.path,
      search: params.search,
      method: params.method,
      headers: {
        "AUTH-TOKEN": getAPIToken(),
        ...(!!params.headers ? params.headers || {}),
      },
      body: params.body,
    });
  }
}
```

#### Route Params

Extend APICall to take custom parameters for your route params

```js
import { APICall } from 'fetch-wrapper';
import { getAPIToken } from 'your-project';

class APICallWithRouteParams extends APICall {
  constructor(params) {
    super({
      apiHost: process.env.API_HOST,
      path: `/api/user/${params.userId}`,
      search: {
        force: params.force,
      },
      method: "GET",
      body: params.body,
    });
  }
}
```

### Network Mocking

Utilizing the power of fetchMock, this lib has a powerful mocking API:

```js
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

  // Witness the awesome mocking magic.
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
```

### Network Errors

Every time I interact with anything on the web, network errors are bound to happen.  This lib has a utility NetworkError class for handling network-related errors:

```js
import { NetworkError } from 'fetch-wrapper';

const apiCall = new APICall<JSONResponse<{ test: string }>>({
  apiHost: 'http://localhost',
  path: '/api/test',
});

try {
  const response = apiCall.call();

  if (!response.ok) {
    throw new NetworkError('We had an oopsy.', response);
  }
} catch (e) {
  if (e instanceof NetworkError) {
    const errorName = e.name; // NetworkError500
    const status = e.response.status; // 500
    const message = e.message; // We had an oopsy.
  } else {
    ...
  }
}
```
