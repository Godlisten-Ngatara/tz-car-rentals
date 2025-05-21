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
    address: {
        type: String,
        required: true
    },
    // To be added later
    // businessLicence: {
    //     type: String,
    //     required: true,
    // },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    registeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

const Company = mongoose.model('Company', companySchema)

export default Company;