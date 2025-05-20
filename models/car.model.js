import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, 'Car Brand required']
    },
    model: {
      type: String,
      required: [true, 'Car model required']
    },
    year: {
      type: String,
      required: [true, 'Year is required']
    },
    rentPrice: {
      type: String,
      required: [true, 'RentPrice Brand required']
    },
    category: {
      type: String,
      enum: [
        "Mini",
        "Economy",
        "Midsize",
        "Standard",
        "Full Size",
        "Compact",
        "SUV",
        "Minivan",
        "Van",
      ],
      required: [true, 'Category Brand required']
    },
    features: {
      seats: {
        type: Number,
        required: [true, 'Category required']
      },
      doors: {
        type: Number,
        required: [true, 'Number of doors required']
      },
      airCondition: {
        type: Boolean,
        required: [true, 'AirCondtioning Status is required']
      },
      fuelType: {
        type: String,
        enum: ["petrol", "diesel"],
        required: [true, 'Fuel type required']
      },
      transmissionType: {
        type: String,
        enum: ["manual", "automatic"],
        required: [true, 'Transmission type required']
      },
      drivingWheel: {
        type: String,
        enum: ["left", "right"],
        required: [true, 'Driving wheel postion required']
      },
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true
    }
  },
  {
    timestamps: true,
  }
);

// 👇 Composite unique index
carSchema.index({
  brand: 1,
  model: 1,
  year: 1,
  "features.fuelType": 1,
  "features.transmissionType": 1,
  "features.drivingWheel": 1,
  "features.seats": 1,
  "features.doors": 1
}, { unique: true });

const Car = mongoose.model("Car", carSchema);

export default Car;
