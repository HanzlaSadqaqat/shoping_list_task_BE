import ShoppingList, {
  getShoppingList,
  shareShoppingListDocument,
} from "../models/shareShoppingList";
import { responseVerify } from "../models/user";

class shareShoppingList {
  async shareShoppingList(body): Promise<responseVerify> {
    const { listId, sharedWith, permission, id } = body;
    const newSharedList = new ShoppingList({
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
    console.log("done");

    const findList: shareShoppingListDocument[] | null =
      await ShoppingList.find(id);

    console.log(findList);

    return {
      code: 200,
      data: findList,
    };
  }
}

export default shareShoppingList;
