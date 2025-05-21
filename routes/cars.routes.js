import express from "express";
import { addCar } from "../controllers/car.controllers.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { verifyCompany } from "../middlewares/company.middleware.js";
const carRouter = express.Router();

carRouter.get("/", verifyToken, (req, res) => {
  res.send({ body: "List of all cars" });
});

carRouter.get("/:id", verifyToken, (req, res) => {
  res.send({ body: "A car with details" });
});

carRouter.post("/add-car", verifyToken, verifyCompany, addCar);

carRouter.put("/:id", verifyToken, (req, res) => {
  res.send({ body: "Car with id is updated" });
});

carRouter.delete("/:id", verifyToken, (req, res) => {
  res.send({ body: "car with id is deleted" });
});

export default carRouter;
