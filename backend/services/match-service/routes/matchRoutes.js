import express from "express";
import {
  createMatch,
  getTournamentMatches,
  joinMatch,
  updateMatchResult,
} from "../controllers/matchController.js";
import { protect } from "../../../middleware/authMiddleware.js";

const router = express.Router();

// ➤ Matches
router.post("/", protect, createMatch);
router.get("/:tournamentId", getTournamentMatches);

// ➤ Join & Result
router.post("/:matchId/join", protect, joinMatch);
router.put("/:matchId/result", protect, updateMatchResult);

export default router;