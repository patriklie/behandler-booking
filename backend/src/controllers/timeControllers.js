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
        const { dato, startTid, sluttTid, pris } = req.body;

        const behandler = await User.findById(id);
        if (!behandler) {
            return res.status(404).json({ message: "Behandler ID finnes ikke i databasen." })
        }

        if (!dato || !startTid || !sluttTid) {
            return res.status(400).json({ message: "Manglende input data for å opprette time i request" });
        }

        if (startTid === sluttTid) {
            return res.status(400).json({ message: "Start- og slutt er samme tidspunkt." })
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
        const now = new Date();
        const startDatoTidspunkt = new Date(`${dato}T${startTid}`);
        const sluttDatoTidspunkt = new Date(`${dato}T${sluttTid}`);

        if (now >= startDatoTidspunkt) {
            return res.status(400).json({ message: "Kan ikke opprette timer tilbake i tid." });
        }

        const nyTime = await Time.create({ behandler: id, dato, startTid, sluttTid, pris, startDatoTidspunkt, sluttDatoTidspunkt })
        res.status(201).json({message: `Ny time opprettet ${dato}`, time: nyTime })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// innlogget pasient henter alle sine bookede timer.
export const hentMineTimer = async (req, res) => {
    try {
        const { id } = req.user;
        const mineTimer = await Time.find({ pasient: id }).populate("behandler", "username typeBehandler profilbilde").sort({ startDatoTidspunkt: 1 });
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

export const bookTime = async (req, res) => {
    try {
        const { id: timeID } = req.params;
        const { id: pasientID } = req.user;
        if (!timeID) return res.status(400).json({ message: "Time ID mangler." });
        if (!mongoose.Types.ObjectId.isValid(timeID)) return res.status(400).json({ message: "Time ID er ikke riktig." });
        
        const bookaTime = await Time.findOneAndUpdate({ _id: timeID, status: "ledig" }, { pasient: pasientID, status: "booket" }, { returnDocument: "after" }).populate("behandler", "username");
        if (!bookaTime) return res.status(400).json({ message: "Time finnes ikke eller er ikke ledig." });

        res.status(200).json({ message: "Time booket!", bookaTime});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Avlys time setter den til ledig om du er behandler/pasient rolle og gjør timen tilgjengelig for andre.
export const avlysTime = async (req, res) => {
    try {
        const { id: timeID } = req.params;
        const { id: brukerID, role } = req.user;

        if (!timeID) return res.status(404).json({ message: "Mangler time ID." });
        if (!mongoose.Types.ObjectId.isValid(timeID)) return res.status(400).json({ message: "Ikke godkjent Time ID." });

        let endretTime;

        if (role === "pasient") {
            endretTime = await Time.findOneAndUpdate({ _id: timeID, pasient: brukerID }, { status: "ledig", pasient: null,  }, { returnDocument: "after" })
            if (!endretTime) return res.status(404).json({ message: "Fant ingen time med oppgitt ID" });
            res.status(200).json({
                endretTime, message: `Avlyst timen ${endretTime.dato.toLocaleDateString("no-NO", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
            })}, kl: ${endretTime.startTid}.` })
        } else {
            endretTime = await Time.findOneAndUpdate({ _id: timeID, behandler: brukerID }, { status: "ledig", pasient: null, }, { returnDocument: "after" })
            if (!endretTime) return res.status(404).json({ message: "Fant ingen time med oppgitt ID" });
            res.status(200).json({
                endretTime, message: `Avlyst timen ${endretTime.dato.toLocaleDateString("no-NO", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
            })}, kl: ${endretTime.startTid}.` })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const slettTime = async (req, res) => {
    try {

        const { id: timeID } = req.params;
        const { id: brukerID } = req.user;

        if (!timeID) return res.status(404).json({ message: "Mangler time ID." });
        if (!mongoose.Types.ObjectId.isValid(timeID)) return res.status(400).json({ message: "Ikke godkjent Time ID." })

        const slettetTime = await Time.findOneAndDelete({ _id: timeID, behandler: brukerID })
        if (!slettetTime) return res.status(400).json({ message: "Fant ingen time å slette." })
        
        res.status(200).json({
            message: `Slettet timen ${slettetTime.dato.toLocaleDateString("no-NO", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
        })}, klokken ${slettetTime.startTid}.` })
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const hentValgtBehandlerTimer = async (req, res) => {

    try {

        const { behandlerId: id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Ikke godkjent behandler ID." });

        const valgtBehandlerTimer = await Time.find({ behandler: id, status: "ledig" }).sort({ startDatoTidspunkt: 1 })
        res.status(200).json({ message: "Hentet alle ledige timer på valgt behandler.", valgtBehandlerTimer })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}