const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    content: {
      type: String, // Likely HTML or Markdown content
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      default: 'General',
    },
    publishedAt: {
      type: Date,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // provides createdAt & updatedAt
  }
);

// Search indexes
blogPostSchema.index({ title: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('BlogPost', blogPostSchema);
