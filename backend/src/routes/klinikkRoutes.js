import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { verifyRoleMiddleware } from "../middleware/verifyRoleMiddleware.js";
import { validateIdMiddleware } from "../middleware/validateIdMiddleware.js";
import { fjernBehandler, hentAlleKlinikker, hentMineKlinikker, leggTilBehandler, opprettKlinikk, redigerKlinikk, slettKlinikk } from "../controllers/klinikkController.js";

const router = express.Router();

router.post("/", authMiddleware, validateIdMiddleware, verifyRoleMiddleware("behandler", "admin"), opprettKlinikk);
router.get("/", authMiddleware, validateIdMiddleware, hentAlleKlinikker);
router.get("/mine", authMiddleware, validateIdMiddleware, verifyRoleMiddleware("behandler", "admin"), hentMineKlinikker);
router.delete("/:id", authMiddleware, validateIdMiddleware, verifyRoleMiddleware("behandler", "admin"), slettKlinikk);
router.patch("/:id", authMiddleware, validateIdMiddleware, verifyRoleMiddleware("behandler", "admin"), redigerKlinikk);
router.post("/:id/behandler", authMiddleware, validateIdMiddleware, verifyRoleMiddleware("behandler", "admin"), leggTilBehandler);
router.delete("/:id/behandler/:behandlerId", authMiddleware, validateIdMiddleware, verifyRoleMiddleware("behandler", "admin"), fjernBehandler);

export default router;