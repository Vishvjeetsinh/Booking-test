'use strict';

const Joi = require('joi');

const userSignupSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .max(50)
    .messages({
      'any.required': 'First name is required.',
      'string.empty': 'First name cannot be empty.',
      'string.max': 'First name must be at most {#limit} characters long.',
    }),
  lastName: Joi.string()
    .required()
    .max(50)
    .messages({
      'any.required': 'Last name is required.',
      'string.max': 'Last name must be at most {#limit} characters long.',
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'any.required': 'Email is required.',
      'string.email': 'Invalid email format.',
      'string.empty': 'Email cannot be empty.',
    }),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$'))
    .messages({
      'any.required': 'Password is required.',
      'string.empty': 'Password cannot be empty.',
      'string.pattern.base':
        'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number.',
    }),
});

const userSignInSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'any.required': 'Email is required.',
      'string.email': 'Invalid email format.',
      'string.empty': 'Email cannot be empty.',
    }),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$'))
    .required(),
});

module.exports = {
  userSignupSchema,
  userSignInSchema,
};
