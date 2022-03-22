import Joi from 'joi';
import { IValidator } from '@/application/controllers/interfaces';

export class DeleteCardValidator implements IValidator {
  private validation: Joi.Schema;

  constructor() {
    this.validation = Joi.object({
      id: Joi.string().uuid().required(),
    });
  }

  async validate(object: unknown): Promise<void> {
    await this.validation.validateAsync(object);
  }
}
