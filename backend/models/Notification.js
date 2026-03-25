const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true, // e.g., 'inquiry_received', 'profile_approved', 'system_alert'
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // provides createdAt & updatedAt
  }
);

module.exports = mongoose.model('Notification', notificationSchema);
