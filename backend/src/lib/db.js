import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully to: ", connect.connection.host);
    } catch (error) {
        console.error("Connection to mongodb failed with following error: ", error);
        process.exit(1);
    }
}