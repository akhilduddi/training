const express = require('express');
const router = express.Router();
const {
  getEvents,
  createEvent,
} = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(getEvents)
  .post(protect, authorize('company', 'admin'), createEvent);

module.exports = router;
