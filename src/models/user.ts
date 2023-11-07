import mongoose, { Document, Model } from "mongoose";

export interface userDocument extends Document, signupPayload {}

export interface signupPayload extends loginPayload {
  name: string;
  //   email: string;
  //   password: string;
  conformPassword: string;
}
export interface responseVerify {
  code: number;
  message: string;
}
export interface loginPayload {
  email: string;
  password: string;
  accessToken: string;
  refreshToken: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  accessToken: { type: String },
  refreshToken: { type: String },
});

const User: Model<userDocument> = mongoose.model<userDocument>(
  "User",
  userSchema
);
export default User;
