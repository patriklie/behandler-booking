import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()


export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No authorization header found." });
        }
        const token = authHeader.split(" ")[1];
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedPayload;
        console.log("Dette er req.user inni auth middleware: ", req.user);
        next()
    } catch (error) {
        res.status(401).json({ message: error.message, text: "Middleware catchblock error." })
    }
}