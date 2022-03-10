import { HttpRequest, HttpResponse } from '../http';

export interface IController {
  path: string;
  handle(request: HttpRequest): Promise<HttpResponse<unknown>>;
}
