import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
  },
  {
    timestamps: true,
  }
);

// 👇 Composite unique index

const User = mongoose.model("User", userSchema);

export default User;
