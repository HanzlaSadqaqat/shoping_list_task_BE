import User, { userDocument } from "../models/user";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/generateAccessToken";
import { generateRefreshToken } from "../utils/generateRefreshToken";
class AuthController {
  async signup(body) {
    const { name, email, password, conformPassword } = body;

    const findUser = await User.findOne({ email });
    if (findUser)
      throw {
        code: 403,
        message: "User already exist",
      };

    if (password !== conformPassword)
      throw {
        code: 403,
        message: "Password are not matched",
      };

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashPassword,
      conformPassword,
    });

    newUser.save();
    return {
      code: 200,
      message: "User created successfully",
    };
  }

  async login(body) {
    const { email, password } = body;
    const findUser: userDocument | null = await User.findOne({ email });
    if (!findUser)
      throw {
        code: 403,
        message: "User not found",
      };

    const checkPassword = bcrypt.compare(password, findUser.password);
    if (!checkPassword)
      throw {
        code: 403,
        message: "Invalid Credentials",
      };

    const accessToken: string = generateAccessToken({
      email: findUser.email,
      id: findUser._id,
    });
    const refreshToken: string = generateRefreshToken({
      email: findUser.email,
      id: findUser._id,
    });
    console.log(accessToken);
    findUser.accessToken = accessToken;
    findUser.refreshToken = refreshToken;
    findUser.save();
    return {
      code: 200,
      message: "Login Successfully",
    };
  }
}

export default AuthController;
