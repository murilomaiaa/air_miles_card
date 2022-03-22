type Params = { id?: string };

export type HttpRequest<T = unknown, P extends Params = Params> = {
  body: T;
  params: P;
};

export type HttpResponse<T = any> = {
  body: T;
  status: number;
};
