import Joi from 'joi';

export const email = Joi.string().email();
