const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    casNumber: {
      type: String,
      default: '',
    },
    therapeuticArea: {
      type: String,
      default: '',
    },
    regulatoryStatus: {
      type: String,
      default: '',
    },
    brochureUrl: {
      type: String,
      default: '',
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create text indexes
productSchema.index({
  name: 'text',
  description: 'text',
  therapeuticArea: 'text',
});

module.exports = mongoose.model('Product', productSchema);
