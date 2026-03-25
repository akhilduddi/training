const User = require('../models/User');
const Notification = require('../models/Notification');
const Company = require('../models/Company');

// @desc    Get saved companies (watchlist)
// @route   GET /api/v1/users/watchlist
// @access  Private
const getWatchlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('savedCompanies');

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.json({ success: true, count: user.savedCompanies.length, data: user.savedCompanies });
  } catch (error) {
    next(error);
  }
};

// @desc    Save company to watchlist
// @route   POST /api/v1/users/watchlist/:companyId
// @access  Private
const saveCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.companyId);

    if (!company) {
      res.status(404);
      throw new Error('Company not found');
    }

    const user = await User.findById(req.user.id);

    if (user.savedCompanies.includes(req.params.companyId)) {
      res.status(400);
      throw new Error('Company already in watchlist');
    }

    user.savedCompanies.push(req.params.companyId);
    await user.save();

    res.json({ success: true, data: user.savedCompanies });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove company from watchlist
// @route   DELETE /api/v1/users/watchlist/:companyId
// @access  Private
const removeFromWatchlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.savedCompanies.includes(req.params.companyId)) {
      res.status(400);
      throw new Error('Company not found in watchlist');
    }

    user.savedCompanies = user.savedCompanies.filter(
      (id) => id.toString() !== req.params.companyId
    );
    await user.save();

    res.json({ success: true, data: user.savedCompanies });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user notifications
// @route   GET /api/v1/users/notifications
// @access  Private
const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort('-createdAt');

    res.json({ success: true, count: notifications.length, data: notifications });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark notification as read
// @route   PUT /api/v1/users/notifications/:id/read
// @access  Private
const markNotificationRead = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      res.status(404);
      throw new Error('Notification not found');
    }

    if (notification.userId.toString() !== req.user.id) {
      res.status(403);
      throw new Error('Not authorized to access this notification');
    }

    notification.isRead = true;
    await notification.save();

    res.json({ success: true, data: notification });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWatchlist,
  saveCompany,
  removeFromWatchlist,
  getNotifications,
  markNotificationRead,
};
