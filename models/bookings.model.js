import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pickUpDate: {
        type: Date,
        required: true
    },
    dropOffDate: {
        type: Date,
        required: true
    },
    pickUpLocation: {
        type: String,
        required: true
    },
    dropOffLocation: {
        type: String,
        required: true
    },
    totalPrice: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["notBooked", "booked", "onTrip", "notPicked", "canceled", "overDue", "tripCompleted"],
        default: "notBooked"
    }
},
    { timestamps: true }
)

const Bookings = mongoose.model('Bookings', bookingSchema)

export default Bookings