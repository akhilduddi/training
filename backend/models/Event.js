const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    type: {
      type: String,
      enum: ['webinar', 'tradeshow', 'conference'],
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      default: 'Online',
    },
    link: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // provides createdAt & updatedAt
  }
);

module.exports = mongoose.model('Event', eventSchema);
