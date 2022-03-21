import Joi from 'joi';

type Helpers = {
  message: (message: any) => any;
};

const validator = (value: string, helpers: Helpers): string | Record<string, unknown> => {
  let result: string | Record<string, unknown> = value;

  if (Number.isNaN(value)) {
    result = helpers.message('Field must contain only numbers');
  }

  return result;
};

export const number = Joi.string().custom(validator);
