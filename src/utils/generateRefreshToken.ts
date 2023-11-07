import { jwtInfo } from "../types/jwtInfo";
import jwt from "jsonwebtoken";

export const generateRefreshToken = (info: jwtInfo) =>
  jwt.sign(info, process.env.REFRESH_SECRET_KEY as string, {
    expiresIn: "1d",
  });
