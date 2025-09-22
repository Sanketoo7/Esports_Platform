import express from "express";
import { createPost, getPosts, addComment, toggleLike } from "../controllers/communityController.js";
import { protect } from "../../../middleware/authMiddleware.js";

const router = express.Router();

// ➤ Posts
router.post("/", protect, createPost);
router.get("/", getPosts);

// ➤ Comments
router.post("/:postId/comments", protect, addComment);

// ➤ Likes
router.post("/:postId/like", protect, toggleLike);

export default router;