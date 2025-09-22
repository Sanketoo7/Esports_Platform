import Admin from "../models/Admin.js";
import Tournament from "../../tournament-service/models/Tournament.js";
import jwt from "jsonwebtoken";

// helper to generate token
const generateToken = (id) => {
  return jwt.sign({ id }, "your_jwt_secret", { expiresIn: "30d" });
};

// Admin login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (admin && (await admin.matchPassword(password))) {
      res.json({
        success: true,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create Tournament
export const createTournament = async (req, res) => {
  try {
    const { name, date } = req.body;
    const tournament = await Tournament.create({ name, date });
    res.status(201).json({ success: true, tournament });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all tournaments
export const getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json({ success: true, tournaments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};