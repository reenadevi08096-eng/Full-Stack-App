const express = require('express');
const router = express.Router();
const { 
  createPost, 
  getPosts, 
  deletePost, 
  getTopRecentPosts 
} = require('../controllers/postController');

// Top 3 recent posts route
router.get('/recent/top3', getTopRecentPosts);

// Main CRUD routes
router.route('/')
  .get(getPosts)
  .post(createPost);

router.delete('/:id', deletePost);

module.exports = router;