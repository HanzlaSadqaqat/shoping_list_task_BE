import ListModel from "../models/shoppingList";
import ShareShoppingList from "../models/shareShoppingList";
import {
  getShoppingList,
  shareShoppingListDocument,
} from "../models/shareShoppingList";
import User, { responseVerify } from "../models/user";
import { ObjectId } from "mongoose";

class shareShoppingList {
  async shareShoppingList(body, id): Promise<responseVerify> {
    const { listId, sharedWith, permission } = body;

    const findList = await ListModel.findById({ _id: listId as ObjectId });
    if (!findList)
      throw {
        code: 404,
        message: "List not found",
      };
    const findUser = await User.findOne({ email: sharedWith as string });
    console.log(findUser);
    if (!findUser)
      throw {
        code: 404,
        message: "User not found",
      };

    const newSharedList = new ShareShoppingList({
      id,
      listId,
      sharedWith,
      permission,
    });
    newSharedList.save();
    return {
      code: 200,
      message: "shared",
    };
  }
  async getSharedShoppingList(id): Promise<getShoppingList> {
    const findList: shareShoppingListDocument[] | null =
      await ShareShoppingList.find(id);
    console.log(findList);

    return {
      code: 200,
      data: findList,
    };
  }
}

export default shareShoppingList;
