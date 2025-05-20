import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.send({ body: "List of all users" });
});

userRouter.get("/:id", (req, res) => {
  res.send({ body: "A user with details" });
});

userRouter.put("/:id", (req, res) => {
  res.send({ body: "User with id is updated" });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ body: "User with id is deleted" });
});

export default userRouter;
