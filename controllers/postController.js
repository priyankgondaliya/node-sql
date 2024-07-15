const { Post } = require("../models");
const { getPagination, getPagingData } = require("../middleware/pagination");

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.create({ title, content, userId: req.user.id });
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create post",
      error: error.message,
    });
  }
};

exports.getPosts = async (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  try {
    const data = await Post.findAndCountAll({
      where: { userId: req.user.id },
      limit,
      offset,
    });
    const response = getPagingData(data, page, limit);
    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await Post.findOne({ where: { id, userId: req.user.id } });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    post.title = title;
    post.content = content;
    await post.save();
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update post",
      error: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ where: { id, userId: req.user.id } });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    await post.destroy();
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete post",
      error: error.message,
    });
  }
};
