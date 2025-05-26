import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { verifyUser } from "../middlewares/user.middleware.js";
import { verifyRole } from "../middlewares/role.middleware.js";
import { getUserById } from "../controllers/user.controllers.js";

const userRouter = express.Router();

userRouter.get("/", verifyToken, verifyRole, (req, res) => {
  res.send({ body: "List of all users" });
});

userRouter.get("/:id", verifyToken, verifyUser, getUserById);

userRouter.put("/:id", (req, res) => {
  res.send({ body: "User with id is updated" });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ body: "User with id is deleted" });
});

export default userRouter;
