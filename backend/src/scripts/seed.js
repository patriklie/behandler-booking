import mongoose from "mongoose";
import { Time } from "../models/Time.js";
import dotenv from "dotenv";

// Fyller database 14 dager fremover med timer fra 8-15 random klnikker pr dag for alle behandlere som er hardkoda i lista under.
// husk å kjøre fra backend nivå slik at vi får tilgang til env fila node src/scripts/seed.js
// manuelt legger jeg til behandlere til klinikk i app først.

dotenv.config();

const behandlerIder = [
    "69c2ed2e90ce0712c2de8fc8",
    "69c2ed4990ce0712c2de8fce",
    "69c2ed7090ce0712c2de8fd4",
    "69c2ef2690ce0712c2de8fde",
    "69c3ccbabec35cb8601f7904",
    "69e29e4cd55448ecb0aabe3b",
    "69f132817081ecd863cb2fa7"
];

const klinikker = [
    "69fc7015e830aadb2667b093",
    "69fc7066e830aadb2667b099",
    "69fc70afe830aadb2667b09f",
    "69fc710fe830aadb2667b0a5"
];

const startTider = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00"
];

const genererTimer = () => {
    const timer = [];

    const nå = new Date();
    const idag = new Date(Date.UTC(
        nå.getFullYear(),
        nå.getMonth(),
        nå.getDate()
    ));

    for (let dag = 1; dag <= 14; dag++) {
        const dato = new Date(idag);
        dato.setUTCDate(idag.getUTCDate() + dag);

        const ukedag = dato.getUTCDay();
        if (ukedag === 0 || ukedag === 6) continue;

        const år = dato.getUTCFullYear();
        const måned = String(dato.getUTCMonth() + 1).padStart(2, "0");
        const dagStr = String(dato.getUTCDate()).padStart(2, "0");
        const datoString = `${år}-${måned}-${dagStr}`;

        behandlerIder.forEach((behandlerId) => {
            const tilfeldigKlinikk =
                klinikker[Math.floor(Math.random() * klinikker.length)];

            startTider.forEach((startTid) => {
                const startDatoTidspunkt = new Date(
                    `${datoString}T${startTid}:00Z`
                );

                const sluttDatoTidspunkt = new Date(
                    startDatoTidspunkt.getTime() + 45 * 60000
                );

                const sluttTid = sluttDatoTidspunkt
                    .toISOString()
                    .slice(11, 16);

                timer.push({
                    behandler: behandlerId,
                    klinikk: tilfeldigKlinikk,
                    dato: dato,
                    startTid,
                    sluttTid,
                    startDatoTidspunkt,
                    sluttDatoTidspunkt,
                    pris: 1500,
                    status: "ledig"
                });
            });
        });
    }

    return timer;
};

await mongoose.connect(process.env.MONGO_URI);

await Time.deleteMany();

await Time.insertMany(genererTimer());

console.log("Opprettet timer.");

await mongoose.disconnect();