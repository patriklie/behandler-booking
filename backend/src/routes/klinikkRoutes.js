import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { verifyRoleMiddleware } from "../middleware/verifyRoleMiddleware.js";
import { validateIdMiddleware } from "../middleware/validateIdMiddleware.js";
import { opprettKlinikk } from "../controllers/klinikkController.js";

const router = express.Router();

router.post("/", authMiddleware, validateIdMiddleware, verifyRoleMiddleware("behandler", "admin"), opprettKlinikk);



export default router;