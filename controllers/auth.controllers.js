import mongoose from "mongoose"
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
export const signUp = async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    try {
        const { userName, email, password } = req.body

        // Check if the company profile exists
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            throw new Error("The user already exists")

        }

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // Create a new company profile
        const newUsers = await User.create([{ userName, email, password: hashedPassword }], { session })

        await session.commitTransaction()

        session.endSession();

        res.status(201).json({
            success: true,
            message: "User profile is created successfully, Go to the login to signin",
            data: {
                user: newUsers,
            },
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(409).json({
            message: error.message,
        });
    }



}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body

        
        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            throw new Error("Invalid Email or Password")
        }
        // compare the password
        const isMatched = await bcrypt.compare(password, existingUser.password)
        
        // Check if the password is correct
        if(!isMatched) {
            throw new Error("Invalid email or password")
        }

        const token = jwt.sign({
            id: existingUser._id,
            email: existingUser.email,
            userName: existingUser.userName,
            role: existingUser.role,
        }, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})

        res.status(201).json({
            success: true,
            message: `Welcome ${existingUser.userName}, you have successfulyy logged in`,
            token: token,
            data: {
                user: existingUser,
            },
        });
    } catch (error) {
        res.status(409).json({
            message: error.message,
        });
    }



}