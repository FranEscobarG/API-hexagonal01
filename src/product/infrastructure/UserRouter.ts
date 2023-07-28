import express from "express";

import { createUserController } from "./dependencies";
import { getAllUserController } from "./dependencies";

// import { getByIdProductController } from "./dependencies";

export const userRouter = express.Router();

userRouter.get(
  "/",
  getAllUserController.run.bind(getAllUserController)
);
userRouter.post(
  "/",
  createUserController.run.bind(createUserController)
);

// userRouter.get(
//   "/:id",
//   getByIdProductController.run.bind(getByIdProductController)
// );