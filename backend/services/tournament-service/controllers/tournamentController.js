import Tournament from "../models/Tournament.js";

// ✅ Create a tournament (Admin only)
export const createTournament = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can create tournaments ❌" });
    }

    const { name, game, description, startDate, endDate } = req.body;

    const tournament = await Tournament.create({
      name,
      game,
      description,
      startDate,
      endDate,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: "Tournament created ✅", tournament });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ List tournaments (public)
export const listTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate("createdBy", "username email");
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Join a tournament (Player with token)
export const joinTournament = async (req, res) => {
  try {
    const { id } = req.params;
    const tournament = await Tournament.findById(id);
    if (!tournament) return res.status(404).json({ message: "Tournament not found ❌" });

    // Prevent duplicate join
    const alreadyJoined = tournament.participants.find(
      (p) => p.userId.toString() === req.user._id.toString()
    );
    if (alreadyJoined) return res.status(400).json({ message: "Already joined ❌" });

    tournament.participants.push({ userId: req.user._id, username: req.user.username });
    await tournament.save();

    res.json({ message: "Joined tournament ✅", tournament });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Manage participants (Admin only - view participants)
export const manageParticipants = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can manage participants ❌" });
    }

    const { id } = req.params;
    const tournament = await Tournament.findById(id).populate("participants.userId", "username email");
    if (!tournament) return res.status(404).json({ message: "Tournament not found ❌" });

    res.json({ participants: tournament.participants });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};