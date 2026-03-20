import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import dotenv from "dotenv";

dotenv.config()
const secret = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
    try {
        const { password, username, email, role, typeBehandler } = req.body;
        if (!password || !username || !email || !role) return res.status(400).json({ message: "Mangler passord, brukernavn eller epost." })
        
        if (role === "behandler" && !typeBehandler) {
            return res.status(400).json({ message: "Behandler mangler fagfelt." })
        }
        
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            let message;
            if (existingUser.username === username) message = "Brukernavnet er tatt."
            else if (existingUser.email === email) message = "Epost i bruk."
            return res.status(400).json({ message });
        }
        const newUser = await User.create({ password, username, email, role, typeBehandler });
        res.status(201).json({ message: "Bruker opprettet.", id: newUser.id, username: newUser.username, email: newUser.email });
        
    } catch (error) {
        res.status(500).json({ message: error.message, text: "Dette er inni catchen på lag ny bruker." })
    }
}

export const loginUser = async (req, res) => {
    try {
        console.log("Logging in user.");

        // 1. Jeg trenger brukernavn/epost og passord fra req.body
        const { username, email, password } = req.body;
        console.log("req.body inni loginUser: ", req.body)
        // 2. Jeg bør først validere om feltene finnes i req.body. 
        if (!password) return res.status(400).json({ message: "Passord mangler!" });
        else if (!username && !email) return res.status(400).json({ message: "Brukernavn eller epost mangler." });

        // 3. Da henter jeg matchende brukernavn eller epost fra DB begge deler er satt til unik i schema så bør bare være en. .findOne().

            const foundUser = await User.findOne({ $or: [{ username }, { email }] });
            if (!foundUser) return res.status(401).json({ message: "Bruker finnes ikke." });
        // 4. Så når jeg har funnet en bruker så sammenligner jeg passord som er skrevet inn med det som er lagret på brukeren i db med bcrypt.compare?
            if (await bcrypt.compare(password, foundUser.password)) {
        // 5. Jeg returnerer en JWT token om det er match og kanskje en melding om at brukeren er logget inn.
                const token = jwt.sign({ id: foundUser._id, role: foundUser.role }, secret, { expiresIn: "10h" });
                res.status(200).json({
                    message: "Logget inn!",
                    token,
                    id: foundUser._id,
                    username: foundUser.username,
                    email: foundUser.email,
                    role: foundUser.role,
                    typeBehandler: foundUser.typeBehandler
                });
            } else {
        // 6. Her returnerer jeg feilmelding om hva som ikke stemmer, jeg velger å gjøre dette konkret siden det er en test.
                return res.status(401).json({ message: "Feil passord." });
            }
    } catch (error) {
            res.status(500).json({ message: error.message, text: "Dette er inni catchen for login username" })
        }
}

export const userInfo = async (req, res) => {
    try {
        const { id } = req.user
        const foundUser = await User.findById(id).select("-password");
        if (!foundUser) {
            return res.status(404).json({ message: "Fant ikke bruker." })
        }
        res.status(200).json(foundUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}