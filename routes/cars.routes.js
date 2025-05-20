import express from "express";
import { addCar } from "../controllers/car.controllers.js";
const carRouter = express.Router();

carRouter.get("/", (req, res) => {
  res.send({ body: "List of all cars" });
});

carRouter.get("/:id", (req, res) => {
  res.send({ body: "A car with details" });
});

carRouter.post("/add-car", addCar);

carRouter.put("/:id", (req, res) => {
  res.send({ body: "Car with id is updated" });
});

carRouter.delete("/:id", (req, res) => {
  res.send({ body: "car with id is deleted" });
});

export default carRouter;
