import fetchMock = require('fetch-mock');
import { APICall } from '../../src/APICall';
import { MockResponse, MockResponseFunction } from 'fetch-mock';

function headersToObject(headers: Headers) {
  const headersObject: Record<string, string> = {};

  for (const [key, value] of headers.entries()) {
    headersObject[key] = value;
  }
  
  return headersObject;
}

export function mockAPICall<ResponseType extends Response>(
  apiCall: APICall<ResponseType>,
  response: MockResponse | MockResponseFunction,
) {
  return fetchMock.mock({
    url: apiCall.url.toString(),
    body: typeof apiCall.requestInit.body === 'string' ? JSON.parse(apiCall.requestInit.body) : undefined,
    method: apiCall.requestInit.method || 'GET',
    headers: !!apiCall.requestInit.headers ? headersToObject(new Headers(apiCall.requestInit.headers)) : undefined,
  }, response);
}
