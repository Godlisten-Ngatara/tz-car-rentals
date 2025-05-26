export const verifyUser = async (req, res, next) => {
    const { id } = req.params

    const selectedUser = await User.findById(id)

    try {
        if (req.user.id !== id && req.user.role !== 'admin') {
            throw new Error("Access denied")
        }
        next()
    } catch (error) {
        res.status(403).json({
            message: error.message
        })
    }

}