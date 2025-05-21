export const verifyRole = (req, res, next) => {
    const { role } = req.user

    try {
        if (!role || role !== 'admin') {
            throw new Error("Access denied")
        }
        next()
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }

}