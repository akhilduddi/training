const BlogPost = require('../models/BlogPost');
const { generateSlug } = require('../utils/slugGenerator');

// @desc    Get all published posts
// @route   GET /api/v1/blog
// @access  Public
const getPosts = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 9 } = req.query;
    
    let query = { isPublished: true };

    if (category) query.category = category;
    if (search) query.$text = { $search: search };

    const startIndex = (Number(page) - 1) * Number(limit);
    const total = await BlogPost.countDocuments(query);

    const posts = await BlogPost.find(query)
      .sort('-publishedAt')
      .skip(startIndex)
      .limit(Number(limit));

    res.json({
      success: true,
      count: posts.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single post by slug
// @route   GET /api/v1/blog/:slug
// @access  Public
const getPostBySlug = async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, isPublished: true });

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a blog post
// @route   POST /api/v1/blog
// @access  Private (Admin)
const createPost = async (req, res, next) => {
  try {
    const { title } = req.body;
    let slug = generateSlug(title);

    // Ensure slug is unique
    const existingPost = await BlogPost.findOne({ slug });
    if (existingPost) {
      slug = `${slug}-${Date.now()}`;
    }

    const postData = { ...req.body, slug, author: req.user.name };
    if (req.body.isPublished) {
      postData.publishedAt = Date.now();
    }

    const post = await BlogPost.create(postData);

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a blog post
// @route   PUT /api/v1/blog/:id
// @access  Private (Admin)
const updatePost = async (req, res, next) => {
  try {
    let post = await BlogPost.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    // if publishing for the first time
    if (!post.isPublished && req.body.isPublished) {
      req.body.publishedAt = Date.now();
    }

    if (req.body.title && req.body.title !== post.title) {
        req.body.slug = generateSlug(req.body.title);
    }

    post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/v1/blog/:id
// @access  Private (Admin)
const deletePost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    await post.deleteOne();

    res.json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
};
