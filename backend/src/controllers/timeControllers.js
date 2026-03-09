import { Time } from "../models/Time.js";
import { User } from "../models/User.js";
import mongoose from "mongoose";

export const hentLedigeTimer = async (req, res) => {
    try {

        const ledigeTimer = await Time.find({ status: "ledig" }).populate("behandler", "username");
        if (ledigeTimer.length === 0) return res.status(404).json({ message: "Ingen ledige timer tilgjengelig." })
        res.status(200).json({ message: "Returnerer ledige timer fra databasen.", ledigeTimer });

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

// innlogget pasient henter alle sine bookede timer.
export const hentMineTimer = async (req, res) => {
    try {
        const { id } = req.user;
        const mineTimer = await Time.find({ pasient: id }).populate("behandler", "username");
        if (mineTimer.length === 0) return res.status(404).json({ message: "Ingen timeavtaler funnet." })
        res.status(200).json({ mineTimer, message: "Mine timeavtaler på innlogget pasient." })
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// innlogget behandler henter alle sine opprettede timer.

export const hentBehandlerTimer = async (req, res) => {

    try {
        const { id } = req.user;
        const { status } = req.query;
        if (status) {
            const foundBehandlerTimer = await Time.find({ behandler: id, status }).populate("pasient", "username email");
            if (foundBehandlerTimer.length === 0) return res.status(404).json({ message: `Ingen timer med funnet med status: ${status}.` });
            return res.status(200).json({ foundBehandlerTimer, message: `Fant alle timer med status ${status}.` })
        }
        const foundAlleBehandlerTimer = await Time.find({ behandler: id }).populate("pasient", "username email");
        if (foundAlleBehandlerTimer.length === 0) return res.status(404).json({ message: "Ingen timer funnet." });
        res.status(200).json({ foundAlleBehandlerTimer, message: "Fant alle behandlertimer." });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}