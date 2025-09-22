import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();

// ========================
// Middleware
// ========================
app.use(cors());
app.use(express.json());

// ========================
// Import Routes
// ========================
import userAuthRoutes from "./services/user-service/routes/authRoutes.js";
import adminRoutes from "./services/admin-service/routes/adminRoutes.js";
import tournamentRoutes from "./services/tournament-service/routes/tournamentRoutes.js";
import communityRoutes from "./services/community-service/routes/communityRoutes.js";
import tokenRoutes from "./services/token-service/routes/tokenRoutes.js";

// ========================
// Mount Routes
// ========================
app.use("/api/auth", userAuthRoutes);          // USER APIs
app.use("/api/admin", adminRoutes);           // ADMIN APIs
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/tokens", tokenRoutes);

// ========================
// Health Check
// ========================
app.get("/", (req, res) => {
  res.json({ message: "PUBG Esports Backend API is running 🚀" });
});

// ========================
// Error Handling Middleware
// ========================
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// ========================
// DB Connection
// ========================
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/esportsDB";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ========================
// Start Server
// ========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});