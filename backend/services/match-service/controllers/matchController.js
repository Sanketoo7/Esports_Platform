import Match from "../models/Match.js";

// ➤ Create match
export const createMatch = async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (err) {
    res.status(500).json({ message: "Error creating match", error: err.message });
  }
};

// ➤ Get all matches in a tournament
export const getTournamentMatches = async (req, res) => {
  try {
    const matches = await Match.find({ tournament: req.params.tournamentId })
      .populate("players", "username")
      .populate("winner", "username");
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: "Error fetching matches", error: err.message });
  }
};

// ➤ Join match
export const joinMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.matchId);
    if (!match) return res.status(404).json({ message: "Match not found" });

    if (!match.players.includes(req.user.id)) {
      match.players.push(req.user.id);
      await match.save();
    }

    res.json(match);
  } catch (err) {
    res.status(500).json({ message: "Error joining match", error: err.message });
  }
};

// ➤ Update match result
export const updateMatchResult = async (req, res) => {
  try {
    const { winner } = req.body;
    const match = await Match.findById(req.params.matchId);
    if (!match) return res.status(404).json({ message: "Match not found" });

    match.status = "completed";
    match.winner = winner;
    await match.save();

    res.json(match);
  } catch (err) {
    res.status(500).json({ message: "Error updating result", error: err.message });
  }
};