import express from "express";

const authRouter = express.Router();

authRouter.post("/register", (req, res) => {
  res.send({ body: "User registered successfully" });
});

authRouter.post("/login", (req, res) => {
  res.send({ body: "User logged in successfully" });
});

authRouter.post("/logout", (req, res) => {
  res.send({ body: "Logged out created succesfully" });
});

export default authRouter;
