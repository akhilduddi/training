const express = require('express');
const router = express.Router();
const {
  getWatchlist,
  saveCompany,
  removeFromWatchlist,
  getNotifications,
  markNotificationRead,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All routes below are protected

router.route('/watchlist')
  .get(getWatchlist);

router.route('/watchlist/:companyId')
  .post(saveCompany)
  .delete(removeFromWatchlist);

router.route('/notifications')
  .get(getNotifications);

router.route('/notifications/:id/read')
  .put(markNotificationRead);

module.exports = router;
