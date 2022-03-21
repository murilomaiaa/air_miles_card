import Joi from 'joi';

type Helpers = {
  message: (message: any) => any;
};

const formatValidator = (date: string, helpers: Helpers): string | Record<string, unknown> => {
  let result: string | Record<string, unknown> = date;

  const splitted = date.split('/');
  if (splitted.length !== 2) {
    helpers.message('Invalid format');
  }

  splitted.forEach(s => {
    if (Number.isNaN(Number(s))) {
      result = helpers.message('Invalid format');
    }
  });

  const [month, year] = date.split('/');
  if (Number(month) < 1 || Number(month) > 12) {
    result = helpers.message('Invalid format');
  }

  // 2022 => 22; 2025 => 25
  const YY = Number(new Date().getFullYear().toString().slice(2, 4));
  if (Number(year) < YY) {
    result = helpers.message('Expired card');
  }

  return result;
};

export const cardExpiry = Joi.string().length(5).custom(formatValidator);
