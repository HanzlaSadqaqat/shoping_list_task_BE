import User, { userDocument } from "../models/user";
import ShoppingList, { itemDocument } from "../models/shoppingList";

export const saveList = async () => {
  try {
    const name = "owner";
    const findOwner: userDocument | null = await User.findOne({ name });
    console.log(findOwner);

    let listData: itemDocument[] = [
      {
        ownerId: findOwner?._id,
        items: [
          {
            product: "football",
            quantity: 2,
          },
          {
            product: "Bat",
            quantity: 1,
          },
          {
            product: "snooker",
            quantity: 3,
          },
        ],
      },
      {
        ownerId: findOwner?._id,
        items: [
          {
            product: "football",
            quantity: 5,
          },
          {
            product: "ball",
            quantity: 10,
          },
          {
            product: "snooker",
            quantity: 1,
          },
        ],
      },
    ];

    await ShoppingList.deleteMany();

    await ShoppingList.insertMany(listData);
  } catch (error) {
    console.log(error);
  }
};
saveList();
