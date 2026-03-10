import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import timeRoutes from "./routes/timeRoutes.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";

dotenv.config();
console.log(process.env.MONGO_URI)
console.log(process.env.PORT)

await connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));

app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello mister api hello"});
})

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/time", timeRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/build", "index.html"));
    })
} else {
    console.log("App kjører i development.")
}

app.listen(port, () => {
    console.log(`Server is running, listening on port ${port}`);
})