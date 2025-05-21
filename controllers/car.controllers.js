import mongoose from "mongoose";
import Car from "../models/car.model.js";

// Add car to a fleet

export const addCar = async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();

    try {
        const { brand, model, year, rentPrice, category, features, company } =
            req.body;

        const existingCar = await Car.findOne({ brand, model, year, category });

        if (existingCar) {
            const error = new Error("Car already exists");
            error.statusCode = 409;
            throw error;
        }

        const newCars = await Car.create([
            {
                brand,
                model,
                year,
                rentPrice,
                category,
                features,
                company
            },
        ]);
        await session.commitTransaction();

        session.endSession();

        res.status(201).json({
            success: true,
            message: "Car created successfully",
            data: {
                car: newCars,
            },
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(409).json({
            message: error.message,
        });
    }
};
