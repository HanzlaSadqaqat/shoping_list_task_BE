import express, { Request, Response } from "express";
import validateToken from "../../middlewares/authenticateToken";
import sessionController from "../../controllers/session";
import { sessionResponse } from "../../models/session";

const sessionRouter = express.Router();
const controller = new sessionController();
sessionRouter.get("/", validateToken, async (req: Request, res: Response) => {
  try {
    const matchUser: sessionResponse = await controller.manageSession(req);
    return res.status(200).send(matchUser);
  } catch (error) {
    return res.status(error.code || 403).send(error.message);
  }
});

export default sessionRouter;
