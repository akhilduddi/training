const express = require('express');
const router = express.Router();
const {
  sendInquiry,
  getCompanyInquiries,
  markInquiryRead,
} = require('../controllers/inquiryController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .post(sendInquiry); // Public route allowing guests to send messages

router.route('/company/:companyId')
  .get(protect, authorize('company', 'admin'), getCompanyInquiries);

router.route('/:id/read')
  .put(protect, authorize('company', 'admin'), markInquiryRead);

module.exports = router;
