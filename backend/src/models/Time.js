import mongoose from "mongoose";

const timeSchema = new mongoose.Schema({
    behandler: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Behandler er påkrevd."]
    },
    dato: {
        type: Date,
        required: [true, "Dato er påkrevd."],
    },
    startTid: {
        type: String,
        required: [true, "Starttid er påkrevd."],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Starttid må være i format HH:MM"]
    },
    sluttTid: {
        type: String,
        required: [true, "Sluttid er påkrevd."],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Sluttid må være i format HH:MM"]
    },
    startDatoTidspunkt: {
        type: Date,
        required: [true, "Start dato tidspunkt er påkrevd."]
    },
    sluttDatoTidspunkt: {
        type: Date,
        required: [true, "Slutt dato tidspunkt er påkrev."]
    },
    pris: {
        type: Number,
        default: 0,
        min: [0, "Pris kan ikke være negativ"]
    },
    pasient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    status: {
        type: String,
        enum: ["ledig", "booket", "avlyst"],
        default: "ledig"
    },
    klinikk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Klinikk",
        required: [true, "Klinikk er påkrevd."]
    }
}, { timestamps: true, versionKey: false });

export const Time = mongoose.model("Time", timeSchema, "timer");