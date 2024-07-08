const { Post } = require("../models");

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.create({ title, content, userId: req.user.id });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ where: { userId: req.user.id } });
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await Post.findOne({ where: { id, userId: req.user.id } });
    if (!post) return res.status(404).json({ message: "Post Not Found" });

    post.title = title;
    post.content = content;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ where: { id, userId: req.user.id } });
    if (!post) return res.status(404).json({ message: "Post Not Found" });

    await post.destroy();
    res.json({ message: "Post Deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
