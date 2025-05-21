import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/env.js"

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