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
} from "../../models/shareShoppingList";
import validateToken from "../../middlewares/authenticateToken";

const shoppingListRouter = express.Router();

const controller = new shareList();

shoppingListRouter.post(
  "/share",
  validateToken,
  async (req: Request, res: Response) => {
    try {
      const id = req.user?._id;
      console.log(id);
      const { error, value: body } = shareShoppingListValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      const response: responseVerify = await controller.shareShoppingList(
        body,
        id
      );
      return res.status(response.code).send(response.message);
    } catch (error) {
      return res.status(error.code).send(error.message);
    }
  }
);
shoppingListRouter.get(
  "/shopping-list/:id",
  validateToken,
  async (req: Request, res: Response) => {
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
  }
);
export default shoppingListRouter;
