import Company from "../models/company.model.js"

export const verifyCompany = async(req, res, next) => {
    const {company} = req.body

    try{
        const selectedCompany = await Company.findById(company);

        if(!selectedCompany.isApproved){
            throw new Error("Wait for Approval from the system admin")
        }

        next()
    }catch(error){
        res.status(409).json({
            message: error.message
        })
    }
}

export const verifyCompanyUser = async (req, res, next) => {
    
}