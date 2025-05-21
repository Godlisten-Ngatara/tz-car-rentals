import express from "express";
import { signIn, signUp } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);

authRouter.post("/login", signIn);

authRouter.post("/logout", (req, res) => {
  res.send({ body: "Logged out created succesfully" });
});

export default authRouter;
