import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/env.js"
import User from "../models/user.model.js"

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization

    // Check if the token exists and it starts with Beare
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(401).json({
            message: 'Access Denied'
        })
    }

    try {
        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token, JWT_SECRET)

        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({
            message: 'Access denied due to invalid token'
        })
    }
}

export const verifyUser = async (req, res, next) => {
    const { id } = req.params

    const selectedUser = await User.findById(id)

    try {
        if (req.user.id !== id && req.user.role !== 'admin') {
            throw new Error("Access denied")
        }
        next()
    } catch (error) {
        res.status(401).json({
            message: error.message
        })
    }

}