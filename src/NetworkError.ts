export class NetworkError extends Error {
  response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.name = `NetworkError${response.status}`;
    this.response = response;
  }
}
