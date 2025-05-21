import mongoose from "mongoose"
import Company from "../models/company.model.js";

export const addCompany = async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    try {
        const { name, email, phone, address, registeredBy } = req.body

        // Check if the company profile exists
        const existingCompany = await Company.findOne({ name, email })

        if (existingCompany) {
            throw new Error("The company profile already exists")

        }


        // Create a new company profile
        const newCompanies = await Company.create([{ name, email, phone, address, registeredBy }], { session })

        await session.commitTransaction()

        session.endSession();

        res.status(201).json({
            success: true,
            message: "Company profile is created successfully",
            data: {
                companies: newCompanies,
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

export const verifyCompany = async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    try {
        const { id } = req.params
        const { isVerified } = req.body

        // Check if the company profile exists
        const updatedCompany = await Company.findByIdAndUpdate(
            id,
            { isVerified },
            { new: true } // return the updated document
        );


        await session.commitTransaction()

        session.endSession();

        res.status(201).json({
            success: true,
            message: "The Company is verified successfully",
            data: {
                company: updatedCompany,
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