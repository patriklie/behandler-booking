import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { verifyRoleMiddleware } from "../middleware/verifyRoleMiddleware.js";
import { validateIdMiddleware } from "../middleware/validateIdMiddleware.js";
import {
    hentLedigeTimer,
    opprettTime,
    hentMineTimer,
    hentBehandlerTimer,
    bookTime,
    avlysTime,
    slettTime
} from "../controllers/timeControllers.js"

const router = express.Router();

// denne vil returnere alle ledige timer for pasient
router.get("/", authMiddleware, validateIdMiddleware, verifyRoleMiddleware("pasient", "behandler"), hentLedigeTimer);

// dennne vil opprette en tilgjengelig timeavtale kun av rollen behandler som kan bookes
router.post("/", authMiddleware, validateIdMiddleware, verifyRoleMiddleware("behandler", "admin"), opprettTime);

// henter alle timer for pasient
router.get("/mine", authMiddleware, validateIdMiddleware, verifyRoleMiddleware("pasient"), hentMineTimer);

// hent alle timer for innlogget behandler
router.get("/behandlerTimer", authMiddleware, validateIdMiddleware, verifyRoleMiddleware("behandler"), hentBehandlerTimer);

/* 
vi avventer med endring av oppsatt time, dette blir i såfall bare at behandler endrer tidspunkt
// endre oppsatt time behandler/pasient
router.patch("/:id", endreTime);
*/


// book time av rolle pasient.
router.patch("/:id/book",authMiddleware, validateIdMiddleware, verifyRoleMiddleware("pasient", "behandler"), bookTime);

// avlys time av rollen behandler/pasient
router.patch("/:id/avlys", authMiddleware, validateIdMiddleware, verifyRoleMiddleware("pasient", "behandler"), avlysTime);

// slett opprettet time av behandler
router.delete("/:id", authMiddleware, validateIdMiddleware, verifyRoleMiddleware("behandler"), slettTime);

export default router;