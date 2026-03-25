const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    slug: { type: String, unique: true },
    tagline: { type: String, default: '' },
    logo: { type: String, default: '' },
    banner: { type: String, default: '' },
    overview: { type: String, default: '' },
    companyType: { type: String, default: '' },
    industryType: { type: String, default: '' },
    industrySubType: { type: String, default: '' },
    companySize: { type: String, default: '' }, // e.g., '1-10', '11-50', '51-200'
    foundedYear: { type: Number },
    revenue: { type: String, default: '' },
    ceoName: { type: String, default: '' },
    address: {
      street: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      country: { type: String, default: '' },
      zip: { type: String, default: '' },
    },
    website: { type: String, default: '' },
    careerPageUrl: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    socialLinks: {
      linkedin: { type: String, default: '' },
      instagram: { type: String, default: '' },
      twitter: { type: String, default: '' },
      facebook: { type: String, default: '' },
      youtube: { type: String, default: '' },
    },
    certifications: [{ type: String }],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    facilities: [{ type: String }],
    keyContacts: [
      {
        name: { type: String },
        title: { type: String },
        email: { type: String },
        phone: { type: String },
      },
    ],
    therapyAreaTags: [{ type: String }],
    capabilityTags: [{ type: String }],
    technologyTags: [{ type: String }],
    marketTags: [{ type: String }],
    documents: [
      {
        name: { type: String },
        url: { type: String },
      },
    ],
    isVerified: { type: Boolean, default: false },
    isClaimed: { type: Boolean, default: false },
    verificationBadges: [{ type: String }],
    profileCompletionScore: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['active', 'pending', 'rejected', 'suspended'],
      default: 'pending',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // can be claimed later
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for search, including text index
companySchema.index({
  companyName: 'text',
  overview: 'text',
  industryType: 'text',
  'address.country': 'text',
  therapyAreaTags: 'text',
});

module.exports = mongoose.model('Company', companySchema);
