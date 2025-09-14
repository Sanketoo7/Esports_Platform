import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    game: { type: String, required: true }, // e.g. PUBG, Valorant
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    participants: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        username: String,
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Admin
  },
  { timestamps: true }
);

export default mongoose.model("Tournament", tournamentSchema);