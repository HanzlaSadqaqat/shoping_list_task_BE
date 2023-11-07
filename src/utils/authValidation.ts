import Joi from "joi";
import { loginPayload, signupPayload } from "../models/user";

export const signupValidation = (data: signupPayload): Joi.ValidationResult =>
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    conformPassword: Joi.string().required(),
  }).validate(data);

export const loginValidation = (data: loginPayload): Joi.ValidationResult =>
  Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).validate(data);
