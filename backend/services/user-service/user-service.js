import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Correct export
export default router;