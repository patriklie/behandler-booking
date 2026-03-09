import { Time } from "../models/Time.js";
import { User } from "../models/User.js";
import mongoose from "mongoose";

export const hentLedigeTimer = async (req, res) => {
    try {

        const { id, username, email} = req.user 
        const foundUser = await User.findById(id);
        
        if (!foundUser) return res.status(400).json({ message: "Fant ikke bruker i databasen." })



    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// kun behandler som kan opprette en ny tilgjengelig time.
export const opprettTime = async (req, res) => {
    try {

        const { id } = req.user;
        const { dato, startTid, sluttTid } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Not a valid user ID." })
        }

        const behandler = await User.findById(id);
        if (!behandler) {
            return res.status(404).json({ message: "User not found in database." })
        }

        if (!dato || !startTid || !sluttTid) {
            return res.status(400).json({ message: "Manglende input data for å opprette time i request" });
        }

        // Eksempel: Vi oppretter time med start 10:00 og slutt 12:00
        // da sjekker vi databasen om det finnes timer med starttid før kl 12:00 OG
        // har en slutttid etter kl 10:00
        const eksisterendeTime = await Time.findOne({
            behandler: id,
            dato: dato,
            startTid: { $lt: sluttTid },
            sluttTid: { $gt: startTid }
        });

        if (eksisterendeTime) {
            return res.status(400).json({ message: "Det finnes allerede en overlappende time, endre dato eller tidspunkt og prøv igjen." })
        }

        const nyTime = await Time.create({ behandler, dato, startTid, sluttTid })
        res.status(201).json({message: `Ny time opprettet ${dato}`, time: nyTime })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}