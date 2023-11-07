import express, { Request, Response } from "express";
import {
  getShoppingListValidation,
  shareShoppingListValidation,
} from "../../utils/shareListValidation";
import shareList from "../../controllers/shoppingList";
import { responseVerify } from "../../models/user";
import {
  getShareShoppingListPayload,
  getShoppingList,
} from "src/models/shareShoppingList";

const shoppingListRouter = express.Router();

const controller = new shareList();

shoppingListRouter.post("/share", async (req: Request, res: Response) => {
  try {
    const { error, value: body } = shareShoppingListValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const response: responseVerify = await controller.shareShoppingList(body);
    return res.status(response.code).send(response.message);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }
});
shoppingListRouter.get("/getlist/:id", async (req: Request, res: Response) => {
  try {
    const id: getShareShoppingListPayload = { id: req.params.id };
    const { error, value: body } = getShoppingListValidation(id);
    if (error) return res.status(400).send(error.details[0].message);
    const response: getShoppingList = await controller.getSharedShoppingList(
      body
    );
    return res.status(response.code).send(response.data);
  } catch (error) {
    return res.status(error.code).send(error.message);
  }
});
export default shoppingListRouter;
