import Tournament from "../models/Tournament.js";

// ➤ Create new tournament
export const createTournament = async (req, res) => {
  try {
    const { name, game, date, prizePool } = req.body;

    const tournament = new Tournament({
      name,
      game,
      date,
      prizePool,
      createdBy: req.user._id, // comes from auth middleware
    });

    await tournament.save();
    res.status(201).json(tournament);
  } catch (err) {
    res.status(500).json({ message: "Error creating tournament", error: err.message });
  }
};

// ➤ Get all tournaments
export const getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate("createdBy", "username email");
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tournaments", error: err.message });
  }
};

// ➤ Join a tournament
export const joinTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) return res.status(404).json({ message: "Tournament not found" });

    if (tournament.participants.includes(req.user._id)) {
      return res.status(400).json({ message: "Already joined this tournament" });
    }

    tournament.participants.push(req.user._id);
    await tournament.save();

    res.json({ message: "Joined successfully ✅", tournament });
  } catch (err) {
    res.status(500).json({ message: "Error joining tournament", error: err.message });
  }
};