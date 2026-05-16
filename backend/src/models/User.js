import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Brukernavn er påkrevd."],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Epost er påkrevd."],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Ugyldig epostadresse."]
    },
    password: {
        type: String,
        required: [true, "Passord er påkrevd"],
        minLength: [6, "Passord må være minst 6 tegn."]
    },
    role: {
        type: String,
        enum: ["admin", "behandler", "pasient"],
        default: "pasient"
    },
    typeBehandler: {
        type: String,
        enum: [
            "kiropraktor",
            "fysioterapeut", 
            "lege",
            "tannlege",
            "psykolog",
            "naprapat",
            "osteopat",
            "akupunktør",
            "personligtrener",
            "ernæringsfysiolog"
        ],
        default: null,
    },
    omBehandler: {
        type: String,
        maxLength: [150, "Teksten kan ikke være over 150 tegn."],
        default: ""
    },
    profilbilde: {
        type: String,
        default: null,
    },
    profilbildePublicId: {
        type: String,
        default: null,
    },
    pushSubscription: {
        type: {
            endpoint: String,
            keys: {
                p256dh: String,
                auth: String
            }
        },
        default: null
    }
}, { timestamps: true, versionKey: false });

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
})

export const User = mongoose.model("User", userSchema);