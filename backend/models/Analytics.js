const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    inquiries: {
      type: Number,
      default: 0,
    },
    contactClicks: {
      type: Number,
      default: 0,
    },
    searchTerms: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure one metrics document per company per day
analyticsSchema.index({ companyId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Analytics', analyticsSchema);
