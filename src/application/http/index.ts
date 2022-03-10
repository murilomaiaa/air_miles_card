export type HttpRequest<T = unknown> = {
  body: T;
};

export type HttpResponse<T = any> = {
  body: T;
  status: number;
};
