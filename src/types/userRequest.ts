import { ObjectId } from "mongoose";

export interface userRequest {
  email: string;
  _id: ObjectId;
}
