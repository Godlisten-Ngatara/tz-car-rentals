import mongoose from "mongoose";
import { MONGO_URL, NODE_ENV } from "./env.js";

if (!MONGO_URL) {
  throw new Error(
    "Please define the MONGO_URL environment variable inside .env.<development/production>.local"
  );
}
const connectToDb = async () => {
  try {
    const isConnect = await mongoose.connect(MONGO_URL);
    const dbName = mongoose.connection.name
    if(isConnect){
        console.log(`Successfully connected to ${dbName} in ${NODE_ENV} mode`)
    }
  } catch (error) {
    console.log("Database error: ", error)
  }
};

export default connectToDb;
