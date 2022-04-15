type FetchParams = Parameters<typeof window.fetch>

export type JSONResponse<JSONType, StatusCode extends number = 200> = {
  json: () => Promise<JSONType>;
  status: StatusCode;
} & Response;

export type EmptyResponse<StatusCode extends number = 200> = JSONResponse<never, StatusCode>;

export const request = async <T extends Response = Response> (...params: FetchParams) => {
  return await fetch(...params) as T;
}
