import mongoose from "mongoose";

const klinikkSchema = new mongoose.Schema({
    navn: {
        type: String,
        required: [true, "Klinikknavn er påkrevd."]
    },
    adresse: {
        type: String,
        required: [true, "Adresse er påkrevd."]
    },
    latitude: {
        type: Number,
        required: [true, "Latitude er påkrevd."]
    },
    longitude: {
        type: Number,
        required: [true, "Latitude er påkrevd."]
    },
    behandlere: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    opprettetAv: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true, versionKey: false });

export const Klinikk = mongoose.model("Klinikk", klinikkSchema, "klinikker");