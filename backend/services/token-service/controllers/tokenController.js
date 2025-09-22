import jwt from "jsonwebtoken";
import Token from "../models/Token.js";

// ➤ Generate tokens (access + refresh)
export const generateTokens = async (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" } // short expiry for security
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  // Save refresh token in DB
  const tokenDoc = new Token({
    userId: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });
  await tokenDoc.save();

  return { accessToken, refreshToken };
};

// ➤ Refresh access token
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "No refresh token provided" });

    const tokenDoc = await Token.findOne({ token: refreshToken });
    if (!tokenDoc) return res.status(401).json({ message: "Invalid refresh token" });

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Token expired or invalid" });

      const accessToken = jwt.sign(
        { id: decoded.id },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ➤ Logout (delete refresh token)
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    await Token.deleteOne({ token: refreshToken });
    res.json({ message: "Logged out successfully ✅" });
  } catch (err) {
    res.status(500).json({ message: "Error logging out", error: err.message });
  }
};