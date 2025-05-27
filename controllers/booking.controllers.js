import mongoose from "mongoose";
import Bookings from "../models/bookings.model.js";
import Car from "../models/car.model.js";

export const bookCar = async (req, res, next) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    if (!req.body) {
      next(errorHandler(401, "bad request on body"));
    }

    const {
      user,
      car,
      totalPrice,
      pickUpDate,
      dropOffDate,
      pickUpLocation,
      dropOffLocation,
      status
    } = req.body;

    const newBookings = await Bookings.create([{
      user,
      car,
      totalPrice,
      pickUpDate,
      dropOffDate,
      pickUpLocation,
      dropOffLocation,
      status
    }], {session})
    if(!newBookings) {
      throw new Error("Something went wrong, booking was not successful")
    }
    else{
      const bookedCar = await Car.findById(car)
      bookedCar.isAvailable = false
      await bookedCar.save({session})
    }
    res.status(200).json({
      success: true,
      message: "car booked successfully",
      data: {
        book: newBookings
      },
    });

    session.commitTransaction()
    session.endSession()
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
};