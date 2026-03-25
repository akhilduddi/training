const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // provides createdAt & updatedAt
  }
);

// Prevent user from submitting more than one review per company
reviewSchema.index({ companyId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
