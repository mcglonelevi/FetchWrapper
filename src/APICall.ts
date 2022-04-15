
import { request } from './Request';

type Statuses = number[];
type URLSearchParamsParameters = ConstructorParameters<typeof URLSearchParams>[0];
type APIConfig = {
  apiHost: string;
  path: string;
  search?: URLSearchParamsParameters;
} & RequestInit;

function buildSearchParamsString(params: URLSearchParamsParameters | undefined) {
  if (params) {
    return `?${new URLSearchParams(params)}`;
  }

  return '';
}

export class APICall<ResponseType extends Response> {
  url: URL;
  requestInit: RequestInit;

  constructor(config: APIConfig) {
    const { path, apiHost, search, ...requestInit } = config;
    const queryString = buildSearchParamsString(search);

    this.url = new URL(
      path + queryString,
      apiHost
    );
    this.requestInit = requestInit;
  }

  async call() {
    return request<ResponseType>(this.url.toString(), this.requestInit);
  }
}
