import { sessionResponse } from "../models/session";
import express from "express";
import User from "../models/user";

class sessionController {
  async manageSession(req: express.Request): Promise<sessionResponse> {
    const { email } = req.user!;
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      throw {
        code: 403,
        message: "User does not exist",
      };
    const newUser = {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
    };
    return newUser;
  }
}

export default sessionController;
