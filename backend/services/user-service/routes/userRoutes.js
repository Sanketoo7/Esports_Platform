import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { protect } from "../../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Profile data ✅", user: req.user });
});

export default router;

