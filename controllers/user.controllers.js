import User from "../models/user.model.js"


export const getUserById = async(req, res) => {
    const {id} = req.params

    const selectedUser = await User.findById(id);

    try{
        if(!selectedUser){
            throw new Error("User Does not exist")
        }
        res.status(200).json({
            success: true,
            data: {
                user: selectedUser
            }
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
}