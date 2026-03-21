import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    uploadProfilePicture,
    deleteProfilePicture
} from "../controllers/userController.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUserById); // legg til protection her så ikke alle kan hente brukere
router.patch("/", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);
router.post("/:id/profilbilde", authMiddleware, upload.single("profilbilde"), uploadProfilePicture);
router.delete("/:id/profilbilde", authMiddleware, deleteProfilePicture);

export default router;