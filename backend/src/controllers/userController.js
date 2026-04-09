import { User } from "../models/User.js";
import { Time } from "../models/Time.js";
import mongoose from "mongoose";
import cloudinary from "../lib/cloudinary.js";


export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find().select("-password");
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ message: error.message, text: "Inni getAllUsers Catchen." })
    }
}

export const getAlleBehandlere = async (req, res) => {
   
    try {
        const alleBehandlere = await User.find({ role: "behandler" }).select("-password");
        if (alleBehandlere.length === 0) {
            return res.status(404).json({ message: "Ingen behandlere funnet." });
        }
        
        const now = new Date();
        const behandlerIds = alleBehandlere.map(b => b._id);
       
        const alleTimer = await Time.find({
            behandler: { $in: behandlerIds },
            status: "ledig",
            startDatoTidspunkt: { $gte: now }
        }).sort({ startDatoTidspunkt: 1 });
       
        const lagtTilTimeObjekt = alleBehandlere.map((b) => {
            const nesteTime = alleTimer.find(t => t.behandler.toString() === b._id.toString()); // Jeg konverterer ObjectId til string fordi ellers sammenligner jeg objektreferanser i minnet, ikke selve verdien
            return { ...b.toObject(), nesteTilgjengeligeTime: nesteTime || null };
        });

        res.status(200).json({ alleBehandlere: lagtTilTimeObjekt });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
    
        // jeg henter ut ID på brukeren som skal endres fra req.user som authMiddleware la der.
        const { id } = req.user;
        // Sjekker om ID faktisk er en godkjent mongoose id type.
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Ikke en valid bruker ID." })
        }

        // Henter eksisterende bruker (om det finnes fra DB)
        const foundUser = await User.findById(id);
        if (!foundUser) {
            return res.status(404).json({ message: "Bruker finnes ikke." })
        }

        // Felt vi IKKE vil tillate at klienten oppdaterer direkte
        const protectedKeys = ["_id", "__v", "createdAt", "updatedAt", "role", "profilbilde", "profilbildePublicId" ];

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

export const uploadProfilePicture = async (req, res) => {
    try {
    const { id } = req.user;
    
    if (!req.file) {
    return res.status(404).json({ message: "Mangler fil i req.file." })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Ikke en valid bruker ID." })
    }

    // options og filhåndtering, legger det i ram.
    const options = { overwrite: true, folder: `behandler-booking/${id}/profile` };
    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        
    // finner aktuell bruker og sletter det gamle profilbilde fra cloudinary
    const foundUser = await User.findById(id);
    if (foundUser.profilbildePublicId) {
        await cloudinary.uploader.destroy(foundUser.profilbildePublicId);
    }
        
    const response = await cloudinary.uploader.upload(base64, options);
        
     // Legger til url og public-id for profilbilde på brukeren i mongodb
    const findUser = await User.findByIdAndUpdate(id, {
        profilbilde: response.secure_url,
        profilbildePublicId: response.public_id,
    }, { returnDocument: "after" });

    console.log(response);
        res.status(200).json({
            message: "Profilbilde lastet opp.",
            profilbilde: response.secure_url,
        });
        
    } catch (error) {
      res.status(500).json({ message: error.message, text: "Inni uploadProfilePicture." })
    }
}

export const deleteProfilePicture = async (req, res) => {

    try {

    const { id } = req.user;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Ikke en valid bruker ID." })
    }

    const foundUser = await User.findById(id);
    if (foundUser.profilbildePublicId) {
        await cloudinary.uploader.destroy(foundUser.profilbildePublicId);
        await User.findByIdAndUpdate(id, {
            profilbilde: null,
            profilbildePublicId: null,
        });
    }

    res.status(200).json({ message: "Slettet profilbilde." })

    } catch (error) {
      res.status(500).json({ message: error.message, text: "Inni deleteProfilePicture." })
    }
}

export const hentAllePasienter = async (req, res) => {
    try {
        const pasienter = await User.find({ role: "pasient" }).sort({ username: 1 }).select("-password");
        res.status(200).json({ pasienter });
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
}