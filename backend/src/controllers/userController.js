import { User } from "../models/User.js";
import mongoose from "mongoose";


export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find().select("-password");
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: error.message, text: "Inni getAllUsers Catchen." })
    }
}

export const getUserById = async (req, res) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Ikke en valid bruker ID." })
        }

        const foundUser = await User.findById(id).select("-password");

        if (!foundUser) {
            return res.status(404).json({ message: "Bruker ikke funnet i databasen." })
        }

        res.status(200).json(foundUser);

    } catch (error) {
        res.status(500).json({ message: error.message, text: "Inni getUserById Catchen." })
    }
}

export const updateUser = async (req, res) => {
    try {
    
        // jeg henter ut ID på brukeren som skal endres fra req.params
        const { id } = req.params;
        // Sjekker om ID faktisk er en godkjent mongoose id type.
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Ikke en valid bruker ID." })
        }

        // Henter eksisterende bruker (om det finnes fra DB)
        const foundUser = await User.findById(id);
        if (!foundUser) {
            return res.status(404).json({ message: "Bruker ikke funnet i databasen." })
        }

        // Felt vi IKKE vil tillate at klienten oppdaterer direkte
        const protectedKeys = ["_id", "__v", "createdAt", "updatedAt", "role"];

        for (let key in req.body) {
            if (protectedKeys.includes(key)) continue; // hopper over sensitive felter
            if (req.body[key] === undefined || req.body[key] === "") continue;

            // klare til å oppdatere felter som er endret under
            foundUser[key] = req.body[key];
        }

        const updatedUser = await foundUser.save();

        const updatedUserObject = updatedUser.toObject();
        delete updatedUserObject.password;

        res.status(200).json({ message: `Oppdatert profile din ${updatedUser.username}.`, ...updatedUserObject })
    
    } catch (error) {
        res.status(500).json({ message: error.message, text: "Inni getUserById Catchen." })
    }
};

export const deleteUser = async (req, res) => {


    // hente ut ID på bruker vi skal slette fra params
    // sjekke om ID er korrekt mongoose
    // finne bruker i DB
    // slette bruker fra databasen og returnere info om brukeren som er slettet
    // logge ut bruker?

    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Ikke en valid bruker ID." })
        }

        const foundUser = await User.findByIdAndDelete(id);
        if (!foundUser) return res.status(404).json({ message: "Bruker ikke funnet." });

        res.status(200).json({ message: `Slettet bruker ${foundUser.username}` })


    } catch (error) {
        res.status(500).json({ message: error.message, text: "Inni getUserById Catchen." })
    }
}