import User from "../models/User.js";
import jwt from "jsonwebtoken";

// 🔑 Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secret123", {
    expiresIn: "30d",
  });
};

// ✅ Register User
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    const user = await User.create({ username, email, password });

    res.status(201).json({
      message: "User registered successfully 🚀",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        message: "Login successful ✅",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password ❌" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};