import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routers/api";
import dotenv from "dotenv";
import { saveUsers } from "./preSeedData/preSeedUsers";
import { saveList } from "./preSeedData/preSeedShoppingList";

dotenv.config();
const app = express();

const appPromise = async () => {
  const port = process.env.PORT || 8080;
  app.use(express.json({ limit: "100mb" }));
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use("/api", router);
  app.use(saveUsers);
  app.use(saveList);
  await mongoose.connect(`${process.env.MONGO_URI as string}`).then(() => {
    console.log("MongoDB connected");
  });

  app.listen(port, () => {
    console.log(`Server is running on port: http://localhost:${port} `);
  });
};

appPromise();
