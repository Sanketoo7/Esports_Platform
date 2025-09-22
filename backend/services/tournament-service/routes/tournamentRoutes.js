import express from "express";
import { createTournament, getTournaments, joinTournament } from "../controllers/tournamentController.js";
import { protect, admin } from "../../../middleware/authMiddleware.js";

const router = express.Router();

// ➤ Public: Get all tournaments
router.get("/", getTournaments);

// ➤ Admin: Create new tournament
router.post("/", protect, admin, createTournament);

// ➤ User: Join tournament
router.post("/:tournamentId/join", protect, joinTournament);

export default router;