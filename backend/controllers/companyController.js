const Company = require('../models/Company');
const Analytics = require('../models/Analytics');
const { generateSlug } = require('../utils/slugGenerator');

// @desc    Get all companies with search and filters
// @route   GET /api/v1/companies
// @access  Public
const getCompanies = async (req, res, next) => {
  try {
    const {
      search,
      industryType,
      country,
      state,
      companySize,
      revenue,
      foundedYear,
      isVerified,
      tags,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    let query = {};

    // Only return active companies for public listing unless specified
    query.status = 'active';

    // Search via text index
    if (search) {
      query.$text = { $search: search };
    }

    // Exact match filters
    if (industryType) query.industryType = industryType;
    if (country) query['address.country'] = country;
    if (state) query['address.state'] = state;
    if (companySize) query.companySize = companySize;
    if (revenue) query.revenue = revenue;
    if (foundedYear) query.foundedYear = Number(foundedYear);
    if (isVerified) query.isVerified = isVerified === 'true';

    // Tags searching (in various tag arrays)
    if (tags) {
      const tagsArray = tags.split(',');
      query.$or = [
        { therapyAreaTags: { $in: tagsArray } },
        { capabilityTags: { $in: tagsArray } },
        { technologyTags: { $in: tagsArray } },
      ];
    }

    // Sorting block
    let sortObj = { createdAt: -1 }; // Default sort
    if (search) {
      sortObj = { score: { $meta: 'textScore' } };
    } else if (sort) {
      if (sort === 'newest') sortObj = { createdAt: -1 };
      if (sort === 'most_viewed') sortObj = { views: -1 };
      if (sort === 'rating') sortObj = { profileCompletionScore: -1 }; // Placeholder until dynamic rating query
    }

    const startIndex = (Number(page) - 1) * Number(limit);
    const total = await Company.countDocuments(query);

    const companies = await Company.find(query)
      .sort(sortObj)
      .skip(startIndex)
      .limit(Number(limit));

    res.json({
      success: true,
      count: companies.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: companies,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single company by slug
// @route   GET /api/v1/companies/:slug
// @access  Public
const getCompanyBySlug = async (req, res, next) => {
  try {
    const company = await Company.findOne({ slug: req.params.slug })
      .populate('products') // Assuming Product model is connected
      .populate('owner', 'name avatar');

    if (!company) {
      res.status(404);
      throw new Error('Company not found');
    }

    res.json({ success: true, data: company });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new company
// @route   POST /api/v1/companies
// @access  Private (company or admin)
const createCompany = async (req, res, next) => {
  try {
    const { companyName } = req.body;
    let slug = generateSlug(companyName);

    // Ensure slug is unique
    const existingCompany = await Company.findOne({ slug });
    if (existingCompany) {
      slug = `${slug}-${Date.now()}`;
    }

    const companyData = {
      ...req.body,
      slug,
      owner: req.user.id,
      status: 'pending', // Requires admin approval
    };

    const company = await Company.create(companyData);

    res.status(201).json({ success: true, data: company });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an existing company
// @route   PUT /api/v1/companies/:id
// @access  Private (Owner or Admin)
const updateCompany = async (req, res, next) => {
  try {
    let company = await Company.findById(req.params.id);

    if (!company) {
      res.status(404);
      throw new Error('Company not found');
    }

    // Ensure user is company owner or admin
    if (company.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to update this company');
    }

    // Do not allow status change via this route unless admin
    if (req.body.status && req.user.role !== 'admin') {
      delete req.body.status;
    }

    company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: company });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a company
// @route   DELETE /api/v1/companies/:id
// @access  Private (Admin only)
const deleteCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      res.status(404);
      throw new Error('Company not found');
    }

    await company.deleteOne();

    res.json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

// @desc    Claim a company listing
// @route   POST /api/v1/companies/:id/claim
// @access  Private (User)
const claimCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      res.status(404);
      throw new Error('Company not found');
    }

    if (company.owner) {
      res.status(400);
      throw new Error('Company is already claimed');
    }

    // Logic for claim verification can be complex.
    // For now, set user as owner and mark as claimed but pending verification
    company.owner = req.user.id;
    company.isClaimed = true;
    company.status = 'pending';
    
    await company.save();

    res.json({ success: true, message: 'Claim submitted successfully', data: company });
  } catch (error) {
    next(error);
  }
};

// @desc    Increment company view count
// @route   POST /api/v1/companies/:id/view
// @access  Public
const incrementView = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    company.views += 1;
    await company.save();

    // Also update daily analytics
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    await Analytics.findOneAndUpdate(
      { companyId: company._id, date: { $gte: todayStart, $lte: todayEnd } },
      { $inc: { views: 1 }, $setOnInsert: { date: todayStart } },
      { upsert: true, new: true }
    );

    res.json({ success: true, views: company.views });
  } catch (error) {
    next(error);
  }
};

// @desc    Get company analytics
// @route   GET /api/v1/companies/:id/analytics
// @access  Private (Owner or admin)
const getCompanyAnalytics = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      res.status(404);
      throw new Error('Company not found');
    }

    // Ensure user is company owner or admin
    if (company.owner?.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to view analytics');
    }

    const analytics = await Analytics.find({ companyId: req.params.id }).sort('date');

    res.json({ success: true, data: analytics });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCompanies,
  getCompanyBySlug,
  createCompany,
  updateCompany,
  deleteCompany,
  claimCompany,
  incrementView,
  getCompanyAnalytics,
};
