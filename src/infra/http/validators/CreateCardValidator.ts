import Joi from 'joi';
import { IValidator } from '@/application/controllers/interfaces';
import { cardExpiry, email, number } from './helpers';

export class CreateCardValidator implements IValidator {
  private validation: Joi.Schema;

  constructor() {
    this.validation = Joi.object({
      number: number.length(16).required(),
      holderName: Joi.string().required(),
      holderEmail: email.required(),
      expiration: cardExpiry.required(),
      cvv: number.length(3).required(),
      creditCardCompany: Joi.object({
        name: Joi.string().required(),
      }),
    });
  }

  async validate(object: unknown): Promise<void> {
    await this.validation.validateAsync(object);
  }
}
