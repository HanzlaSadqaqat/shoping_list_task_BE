import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { jwtInfo } from "../types/jwtInfo";

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers["authorization"];
    console.log("toke:", token);
    if (!token) {
      throw { code: 401, message: "unauthorized user" };
    }
    token = token.split(" ")[1];

    const data: jwtInfo = await jwt.verify(
      token,
      process.env.ACCESS_SECRET_KEY
    );
    const user = await User.findOne({ email: data.email });
    if (!user)
      throw {
        code: 401,
        message: "unauthorized1",
      };

    req.user = {
      email: user?.email,
      _id: user?.id,
    };
    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
  }
};

export default validateToken;
