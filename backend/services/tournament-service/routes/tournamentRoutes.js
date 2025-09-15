import express from "express";
import {
  createTournament,
  listTournaments,
  joinTournament,
  manageParticipants,
} from "../controllers/tournamentController.js";
import { protect, admin } from "../../../middleware/authMiddleware.js"; // ✅ single import

const router = express.Router();

// Public
router.get("/", listTournaments);

// Protected (players + admins)
router.post("/:id/join", protect, joinTournament);

// Admin only
router.get("/:id/participants", protect, admin, manageParticipants); 
router.post("/", protect, admin, createTournament);

export default router;