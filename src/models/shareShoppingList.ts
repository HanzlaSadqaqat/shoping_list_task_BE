import mongoose, { Model, Document, Schema } from "mongoose";
enum permission {
  write = "write",
  read = "read",
}
export interface shareShoppingListDocument extends Document {
  id: string;
  listId: string;
  sharedWith: string;
  permission: permission;
}
export interface getShareShoppingListPayload {
  id: string | null;
}

export interface getShoppingList {
  code: number;
  data: shareShoppingListDocument[] | null;
}

const shoppingListSchema = new Schema({
  id: { type: String },
  listId: { type: Schema.Types.ObjectId, ref: "User" },
  sharedWith: { type: String, required: true },
  permission: { type: String, enum: permission, required: true },
});

const ShareShoppingList: Model<shareShoppingListDocument> =
  mongoose.model<shareShoppingListDocument>("ShoppingList", shoppingListSchema);

export default ShareShoppingList;
