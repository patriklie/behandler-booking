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