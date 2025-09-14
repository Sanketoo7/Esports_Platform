import express from "express";
import {
  createTournament,
  listTournaments,
  joinTournament,
  manageParticipants,
} from "../controllers/tournamentController.js";
import { protect } from "../../../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", listTournaments);

// Protected
router.post("/", protect, createTournament); // admin only
router.post("/:id/join", protect, joinTournament);
router.get("/:id/participants", protect, manageParticipants); // admin only

export default router;