import Bookings from "../models/bookings.model";
import Car from "../models/car.model";


//returning vehicles that are not booked in selected Date
const availableAtDate = async(pickupDate, dropOffDate) => {
  try {

    const existingBookings = await Bookings.find({
      $or: [
        { pickUpDate: { $lt: dropOffDate }, dropOffDate: { $gt: pickupDate } }, // Overlap condition
        { pickUpDate: { $gte: pickupDate, $lt: dropOffDate } }, // Start within range
        { dropOffDate: { $gt: pickupDate, $lte: dropOffDate } }, // End within range
        {
          pickUpDate: { $lte: pickupDate },
          dropOffDate: { $gte: dropOffDate },
        }, // Booking includes the entire time range
      ],
    });

    const vehicleIds = existingBookings.map((booking) => booking.car);
    const uniqueVehicleIds = [...new Set(vehicleIds)];

    // Find vehicles with status "tripCompleted" during the specified date range
    const vehiclesWithCompletedTrips = await Bookings.find(
      {
        $or: [
          { status: "tripCompleted" },
          { status: "canceled" },
          { status: "notBooked" },
        ],
        pickupDate: { $lt: dropOffDate },
        dropOffDate: { $gt: pickupDate },
      },
      { car: 1 }
    );

    const vehicleIdsWithCompletedTrips = vehiclesWithCompletedTrips.map(
      (booking) => booking.car
    );

    const vehiclesWithoutBookings = await Car.find({
      $or: [
        { _id: { $nin: uniqueVehicleIds } }, // Vehicles without bookings
        { _id: { $in: vehicleIdsWithCompletedTrips } }, // Vehicles with completed trips
      ],
    });

    return vehiclesWithoutBookings || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default availableAtDate