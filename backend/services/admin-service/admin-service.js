import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const PORT = 5000; // you can adjust this

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/admin", adminRoutes);

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/esports-platform", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Admin service running on http://localhost:${PORT}`);
});