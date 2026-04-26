import { Time } from "../models/Time.js";
import { User } from "../models/User.js";
import { Klinikk } from "../models/Klinikk.js";
import mongoose from "mongoose";

export const opprettKlinikk = async (req, res) => {
    try {
        const { id } = req.user;
        const { navn, adresse, latitude, longitude } = req.body;

        const foundUser = await User.findById(id);
        if (!foundUser) return res.status(400).json({ message: "Bruker finnes ikke i databasen." })

        if (!navn) return res.status(400).json({ message: "Klinikknavn mangler." })
        if (!adresse) return res.status(400).json({ message: "Adresse mangler." })
        if (!latitude) return res.status(400).json({ message: "Latitude koordinater mangler." })
        if (!longitude) return res.status(400).json({ message: "Longitude koordinater mangler." })
        
        const eksisterendeKlinikkNavn = await Klinikk.findOne({ navn: navn });
        if (eksisterendeKlinikkNavn) return res.status(406).json({ message: `Klinikknavn: ${navn} er i bruk.` });
        
        const opprettetKlinikk = await Klinikk.create({
            navn,
            adresse,
            latitude, 
            longitude,
            opprettetAv: id
        })
        
        res.status(201).json({ message: `Ny klinikk opprettet ${opprettetKlinikk.navn}`})

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const hentAlleKlinikker = async (req, res) => {
    try {
        const alleKlinikker = await Klinikk.find()
            .populate("opprettetAv", "username email profilbilde")
            .populate("behandlere", "username email profilbilde")
        res.status(200).json(alleKlinikker)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const hentMineKlinikker = async (req, res) => {
    try {
        const { id } = req.user;
        const mineKlinikker = await Klinikk.find({ behandlere: id });
        if (mineKlinikker.length === 0) return res.status(404).json({ message: "Fant ingen klinikker på brukeren." });
        
        return res.status(200).json(mineKlinikker)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Ikke så elegant men sletter alle timer tilhørende en klinikk når man sletter tilhørende klinikk.
export const slettKlinikk = async (req, res) => {
    try {
        const { id } = req.params;

        const slettetKlinikk = await Klinikk.findByIdAndDelete(id);
        if (!slettetKlinikk) return res.status(404).json({ message: "Fant ingen klinikk å slette." });
        
        await Time.deleteMany({ klinikk: id });

        res.status(200).json({ message: `Slettet ${slettetKlinikk.navn}.` })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Her redigerer vi alt bortsett fra behandlere lager eget endpoint for det.
export const redigerKlinikk = async (req, res) => {
    try {
        const { id } = req.params;
        const { navn, adresse, latitude, longitude } = req.body;

        if (!navn || !adresse || !latitude || !longitude) return res.status(400).json({ message: "Mangler klinikkinfo." });

        const klinikk = await Klinikk.findByIdAndUpdate(id, { navn, adresse, latitude, longitude }, { returnDocument: "after", runValidators: true });
        if (!klinikk) return res.status(404).json({ message: "Fant ingen klinikk." })
        
        return res.status(200).json({ klinikk, message: `Oppdatert klinikk ${klinikk.navn}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const leggTilBehandler = async (req, res) => {
    try {
        const { id: klinikkId } = req.params;
        const { behandlerId } = req.body;

        if (!klinikkId) return res.status(400).json({ message: "Klinikk ID mangler." })
        if (!behandlerId) return res.status(400).json({ message: "Behandler ID mangler." })
        
        const klinikk = await Klinikk.findByIdAndUpdate(klinikkId, { $addToSet: { behandlere: behandlerId } }, { returnDocument: "after" });
        if (!klinikk) return res.status(404).json({ message: "Fant ingen klinikk" });
        
        return res.status(200).json({ klinikk, message: "Lagt til behandler" })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const fjernBehandler = async (req, res) => {
    try {
        const { id, behandlerId } = req.params;
        if (!id) return res.status(400).json({ message: "Klinikk ID mangler." });
        if (!behandlerId) return res.status(400).json({ message: "Behandler Id mangler." });

        const fjernetBehandlerKlinikk = await Klinikk.findByIdAndUpdate(id, { $pull: { behandlere: behandlerId } }, { returnDocument: "after" });
        if (!fjernetBehandlerKlinikk) return res.status(404).json({ message: "Fant ingen klinikk." });
        return res.status(200).json({ fjernetBehandlerKlinikk, message: `Fjernet behandler` })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
