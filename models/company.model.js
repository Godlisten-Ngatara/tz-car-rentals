import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Company name required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email required'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'phone required'],
        unique: true
    },
    businessLicence: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

const Company = mongoose.model('Company', companySchema)

export default Company;