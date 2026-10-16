const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get all posts (populated with author info)
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('authorId', 'name email');
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete post by ID
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Top 3 Recent Posts (Phase 3 optimization)
exports.getTopRecentPosts = async (req, res) => {
  try {
    const topPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(3)
      .populate('authorId', 'name email');
      
    res.status(200).json({ success: true, data: topPosts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};