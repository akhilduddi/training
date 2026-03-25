const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
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
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true, // e.g., Full-time, Part-time, Contract, Remote
    },
    description: {
      type: String,
      required: true,
    },
    applyLink: {
      type: String,
      required: true,
    },
    postedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // provides createdAt & updatedAt
  }
);

// Add search index
jobSchema.index({ title: 'text', description: 'text', location: 'text' });

module.exports = mongoose.model('Job', jobSchema);
