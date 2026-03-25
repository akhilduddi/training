const express = require('express');
const router = express.Router();
const {
  getCompanies,
  getCompanyBySlug,
  createCompany,
  updateCompany,
  deleteCompany,
  claimCompany,
  incrementView,
  getCompanyAnalytics,
} = require('../controllers/companyController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(getCompanies)
  .post(protect, authorize('company', 'admin'), createCompany);

router.route('/:slug').get(getCompanyBySlug);

// using :id for updates/deletes to be robust against slug changes
router.route('/:id')
  .put(protect, authorize('company', 'admin'), updateCompany)
  .delete(protect, authorize('admin'), deleteCompany);

router.post('/:id/claim', protect, authorize('company', 'user'), claimCompany);
router.post('/:id/view', incrementView);
router.get('/:id/analytics', protect, getCompanyAnalytics);

module.exports = router;
