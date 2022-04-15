
type Statuses = number[];

type URLSearchParamsParameters = ConstructorParameters<typeof URLSearchParams>;

type APIConfig = {
  apiHost: string;
  path: string;
  search: URLSearchParamsParameters;
} & RequestInit;



class APICall {
  url: URL;

  constructor(config: APIConfig) {
    this.url = new URL(config.path, config.apiHost);
  }
}

// class CustomAPICall extends APICall {
//   constructor({ id }) {
//     super({
//       hostname: 'localhost:3000',
//       path: `/user/${id}/foo`,
//       body: '',
//       queryParameters: {},
//       method: 'GET',
//       headers: '',
//     });
//   }
// }

// try {
//   await (
//     new CreateUser({ userName, password })
//   ).call();
// }
