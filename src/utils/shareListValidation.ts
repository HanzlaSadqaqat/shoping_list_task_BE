import Joi from "joi";
import {
  getShareShoppingListPayload,
  shareShoppingListDocument,
} from "../models/shareShoppingList";

export const shareShoppingListValidation = (
  data: shareShoppingListDocument
): Joi.ValidationResult =>
  Joi.object({
    // id: Joi.string().required(),
    listId: Joi.string().required(),
    sharedWith: Joi.string().required(),
    permission: Joi.string().required(),
  }).validate(data);

export const getShoppingListValidation = (
  data: getShareShoppingListPayload
): Joi.ValidationResult =>
  Joi.object({
    id: Joi.string(),
  }).validate(data);
