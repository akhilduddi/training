const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(getPosts)
  .post(protect, authorize('admin'), createPost);

router.route('/:slug').get(getPostBySlug);

router.route('/:id')
  .put(protect, authorize('admin'), updatePost)
  .delete(protect, authorize('admin'), deletePost);

module.exports = router;
