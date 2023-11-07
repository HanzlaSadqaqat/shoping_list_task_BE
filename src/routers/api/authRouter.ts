import express, { Request, Response } from "express";
import { loginValidation, signupValidation } from "../../utils/authValidation";
import { responseVerify } from "../../models/user";
import AuthController from "../../controllers/auth";

const controller = new AuthController();

const authRouter = express.Router();

authRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    const { error, value: body } = signupValidation(req.body);
    if (error) return res.status(403).send(error.details[0].message);

    const response: responseVerify = await controller.signup(body);
    return res.status(response.code).send(response.message);
  } catch (error) {
    return res.status(error.code || 403).send(error.message);
  }
});
authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { error, value: body } = loginValidation(req.body);
    if (error) return res.status(403).send(error.details[0].message);
    const response: responseVerify = await controller.login(body);
    return res.status(response.code).send(response.message);
  } catch (error) {
    return res.status(error.code || 403).send(error.message);
  }
});

export default authRouter;
