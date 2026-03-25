const Review = require('../models/Review');
const Company = require('../models/Company');

// @desc    Get all approved reviews for a company
// @route   GET /api/v1/reviews/company/:companyId
// @access  Public
const getCompanyReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      companyId: req.params.companyId,
      isApproved: true,
    }).populate('userId', 'name avatar');

    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit a review
// @route   POST /api/v1/reviews
// @access  Private (User only)
const submitReview = async (req, res, next) => {
  try {
    const { companyId, rating, comment } = req.body;

    const company = await Company.findById(companyId);
    if (!company) {
      res.status(404);
      throw new Error('Company not found');
    }

    // Check if user already reviewed this company
    const existingReview = await Review.findOne({
      companyId,
      userId: req.user.id,
    });

    if (existingReview) {
      res.status(400);
      throw new Error('You have already reviewed this company');
    }

    const review = await Review.create({
      companyId,
      userId: req.user.id,
      rating,
      comment,
      isApproved: false, // pending admin approval
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete review
// @route   DELETE /api/v1/reviews/:id
// @access  Private (Admin)
const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      res.status(404);
      throw new Error('Review not found');
    }

    await review.deleteOne();

    res.json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve a review
// @route   PUT /api/v1/reviews/:id/approve
// @access  Private (Admin)
const approveReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      res.status(404);
      throw new Error('Review not found');
    }

    review.isApproved = true;
    await review.save();

    // Optionally update the company's profileCompletionScore or average rating here.

    res.json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCompanyReviews,
  submitReview,
  deleteReview,
  approveReview,
};
