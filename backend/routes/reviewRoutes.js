const express = require('express');
const router = express.Router();
const {
  getCompanyReviews,
  submitReview,
  deleteReview,
  approveReview,
} = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, authorize('user'), submitReview);

router.route('/company/:companyId').get(getCompanyReviews);

router.route('/:id')
  .delete(protect, authorize('admin'), deleteReview);

router.route('/:id/approve')
  .put(protect, authorize('admin'), approveReview);

module.exports = router;
