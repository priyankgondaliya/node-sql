const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviewsForPost,
  deleteReview,
} = require("../controllers/reviewController");
const authenticateToken = require("../middleware/authenticateToken");

// Create a review for a post
router.post("/posts/:postId/reviews", authenticateToken, createReview);

// Get all reviews for a post
router.get("/posts/:postId/reviews", getReviewsForPost);
// Delete a review
router.delete("/reviews/:reviewId", authenticateToken, deleteReview);

module.exports = router;
