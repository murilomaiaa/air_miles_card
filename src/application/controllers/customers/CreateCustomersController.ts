import { HttpRequest, HttpResponse } from '@/application/http';
import { ICreateCustomer, CreateCustomerDTO } from '@/domain/features/CreateCustomer';
import { IController } from '../IController';

type Response = {
  id: string;
};

export class CreateCustomersController implements IController {
  public path: string;
  constructor(private readonly createCustomer: ICreateCustomer) {
    this.path = '/customers';
  }

  async handle(request: HttpRequest<CreateCustomerDTO.Input>): Promise<HttpResponse<Response>> {
    const customer = await this.createCustomer.execute(request.body);
    // notify queue

    return {
      body: { id: customer.getId() },
      status: 201,
    };
  }
}
