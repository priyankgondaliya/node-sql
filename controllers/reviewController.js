// controllers/reviewController.js
const { Review, User, Post } = require("../models");

exports.createReview = async (req, res) => {
  const { postId } = req.params;
  const { rating, comment } = req.body;
  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const review = await Review.create({
      userId: req.user.id,
      postId: postId,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create review",
      error: error.message,
    });
  }
};

exports.getReviewsForPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const reviews = await Review.findAll({
      where: { postId },
      include: [{ model: User, attributes: ["id", "name"] }],
    });

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};
exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await review.destroy();

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete review",
      error: error.message,
    });
  }
};
exports.getTopReviews = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.query; // Assuming userId is passed as a query parameter

  try {
    const topReviews = await Review.findAll({
      where: { postId, userId },
      order: [["rating", "DESC"]],
      limit: 3,
      include: [{ model: User, attributes: ["id", "name"] }],
    });

    if (!topReviews.length) {
      return res.status(404).json({
        success: false,
        message: "No reviews found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Top 3 reviews fetched successfully",
      data: topReviews,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch top reviews",
      error: error.message,
    });
  }
};
