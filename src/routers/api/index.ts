import express from "express";
import authRouter from "./authRouter";
import shoppingListRouter from "./shoppingListRouter";
import sessionRouter from "./sessionRouter";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/shoppinglist", shoppingListRouter);
router.use("/session", sessionRouter);

export default router;
