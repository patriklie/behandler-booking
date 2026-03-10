import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUserById); // legg til protection her så ikke alle kan hente brukere
router.patch("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;