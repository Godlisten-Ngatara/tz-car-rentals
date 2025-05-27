import express from "express"
import { bookCar } from "../controllers/booking.controllers.js"

const bookingRouter = express.Router()

bookingRouter.get("/", (req, res) => {
    res.json({
        message: "Bookings"
    })
})
bookingRouter.post("/make-bookings", bookCar)

export default bookingRouter