import express from "express";
import { refreshAccessToken, logout } from "../controllers/tokenController.js";

const router = express.Router();

// ➤ Refresh access token
router.post("/refresh", refreshAccessToken);

// ➤ Logout
router.post("/logout", logout);

export default router;