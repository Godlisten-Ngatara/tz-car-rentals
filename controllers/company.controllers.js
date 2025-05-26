import mongoose from "mongoose"
import Company from "../models/company.model.js";
import Car from "../models/car.model.js"
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

export const getCompanys = async (req, res) => {
    try {
        const allCompanies = await Company.find();
        if (allCompanies === 0) {
            res.status(200).json({
                success: true,
                message: "No data found",
                data: []
            })
        }
        const companiesWithCars = await Promise.all(
            allCompanies.map(async (company) => {
                const cars = await Car.find({ company: company._id });
                return {
                    ...company.toObject(),
                    cars,
                };
            })
        );
        res.status(200).json({
            success: true,
            message: "",
            data: {
                companies: companiesWithCars
            }
        })
    } catch {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const approveCompany = async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    try {
        const { id } = req.params
        const { isApproved } = req.body

        // Check if the company profile exists
        const updatedCompany = await Company.findByIdAndUpdate(
            id,
            { isApproved },
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
