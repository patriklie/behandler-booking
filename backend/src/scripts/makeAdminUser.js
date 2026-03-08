import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/User.js";
import readline from "readline";

dotenv.config();



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
    return new Promise(resolve => rl.question(question, resolve))
}

async function createAdminUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    const username = await ask("Username for admin: ");
    const email = await ask("Email for admin: ");
    const password = await ask("Password for admin: ");

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        console.log("Username or email already exists. Try again.");
        return;
    }

    const admin = await User.create({ username, email, password, role: "admin" });
    console.log(`Created admin user: ${admin.username}`);
  } catch (error) {
    console.error(error);
  } finally {
    rl.close();
    mongoose.disconnect(); // kobler fra databasen når vi er ferdige
  }
}

createAdminUser();
