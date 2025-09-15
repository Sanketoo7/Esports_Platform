import Tournament from "../models/Tournament.js";

// ✅ Create tournament (admin only)
export const createTournament = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can create tournaments ❌" });
    }

    const { name, game, date, maxPlayers } = req.body;

    const tournament = await Tournament.create({
      name,
      game,
      date,
      maxPlayers,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: "Tournament created ✅", tournament });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ List tournaments (public)
export const listTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate("participants", "username email");
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Join tournament (players only)
export const joinTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) return res.status(404).json({ message: "Tournament not found ❌" });

    if (tournament.participants.includes(req.user._id)) {
      return res.status(400).json({ message: "Already joined this tournament ❌" });
    }

    if (tournament.participants.length >= tournament.maxPlayers) {
      return res.status(400).json({ message: "Tournament is full ❌" });
    }

    tournament.participants.push(req.user._id);
    await tournament.save();

    res.json({ message: "Joined tournament ✅", tournament });
  } catch (error) {
    res.status(500).json({ message: error.message });
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