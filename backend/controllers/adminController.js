const User = require('../models/User');
const Company = require('../models/Company');
const Inquiry = require('../models/Inquiry');
const Review = require('../models/Review');
const AuditLog = require('../models/AuditLog');
const fs = require('fs');
const csv = require('csv-parser');
const Analytics = require('../models/Analytics');

// @desc    Get dashboard stats
// @route   GET /api/v1/admin/dashboard
// @access  Private (Admin)
const getDashboardStats = async (req, res, next) => {
  try {
    const totalCompanies = await Company.countDocuments();
    const activeCompanies = await Company.countDocuments({ status: 'active' });
    const pendingCompanies = await Company.countDocuments({ status: 'pending' });
    
    const totalUsers = await User.countDocuments();
    const totalInquiries = await Inquiry.countDocuments();
    
    // Sum total views across all companies
    const companies = await Company.find({}, 'views');
    const totalViews = companies.reduce((acc, curr) => acc + curr.views, 0);

    const pendingReviews = await Review.countDocuments({ isApproved: false });

    res.json({
      success: true,
      data: {
        totalCompanies,
        activeCompanies,
        pendingCompanies,
        totalUsers,
        totalInquiries,
        totalViews,
        pendingReviews,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get system logs
// @route   GET /api/v1/admin/logs
// @access  Private (Admin)
const getLogs = async (req, res, next) => {
  try {
    const logs = await AuditLog.find().populate('performedBy', 'name email role').sort('-createdAt');
    res.json({ success: true, count: logs.length, data: logs });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all companies with status filter
// @route   GET /api/v1/admin/companies
// @access  Private (Admin)
const getAdminCompanies = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    let query = {};
    if (status) query.status = status;

    const startIndex = (Number(page) - 1) * Number(limit);
    const total = await Company.countDocuments(query);

    const companies = await Company.find(query)
      .sort('-createdAt')
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

// @desc    Verify a company
// @route   PUT /api/v1/admin/companies/:id/verify
// @access  Private (Admin)
const verifyCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      res.status(404);
      throw new Error('Company not found');
    }

    company.isVerified = req.body.isVerified !== undefined ? req.body.isVerified : !company.isVerified;
    
    if (req.body.badge && !company.verificationBadges.includes(req.body.badge)) {
        company.verificationBadges.push(req.body.badge);
    }

    await company.save();
    
    await AuditLog.create({ action: 'COMPANY_VERIFIED', details: `Identity Verification Modified globally`, entityType: 'Company', entityId: company._id, performedBy: req.user._id });

    res.json({ success: true, data: company });
  } catch (error) {
    next(error);
  }
};

// @desc    Change company status (approve/reject/suspend)
// @route   PUT /api/v1/admin/companies/:id/status
// @access  Private (Admin)
const changeCompanyStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const company = await Company.findById(req.params.id);

    if (!company) {
      res.status(404);
      throw new Error('Company not found');
    }

    company.status = status;
    await company.save();

    await AuditLog.create({ action: 'COMPANY_STATUS_CHANGED', details: `Company status overridden to ${status}`, entityType: 'Company', entityId: company._id, performedBy: req.user._id });

    res.json({ success: true, data: company });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/v1/admin/users
// @access  Private (Admin)
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort('-createdAt');
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a user explicitly from Admin Panel
// @route   POST /api/v1/admin/users
// @access  Private (Admin)
const addUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400); return next(new Error('User already exists'));
    }

    const user = await User.create({
      name, email, password, role: role || 'user'
    });
    
    await AuditLog.create({ action: 'USER_CREATED', details: `Constructed ${role || 'user'} systematically inside panel`, entityType: 'User', entityId: user._id, performedBy: req.user._id });

    res.status(201).json({ success: true, data: user });
  } catch (error) { next(error); }
};

// @desc    Change user role
// @route   PUT /api/v1/admin/users/:id/role
// @access  Private (Admin)
const changeUserRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    user.role = req.body.role;
    await user.save();
    
    await AuditLog.create({ action: 'USER_ROLE_CHANGED', details: `Assigned role ${req.body.role}`, entityType: 'User', entityId: user._id, performedBy: req.user._id });

    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user details
// @route   PUT /api/v1/admin/users/:id
// @access  Private (Admin)
const updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        res.status(400);
        throw new Error('Email already explicitly registered to another account');
      }
    }

    const priorName = user.name;
    const priorEmail = user.email;

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();
    
    let alterations = [];
    if (priorName !== user.name) alterations.push(`Name to ${user.name}`);
    if (priorEmail !== user.email) alterations.push(`Email to ${user.email}`);

    await AuditLog.create({ action: 'USER_UPDATED', details: `Updated identity metadata: ${alterations.join(' & ')}`, entityType: 'User', entityId: user._id, performedBy: req.user._id });

    res.json({ success: true, data: user });
  } catch (error) { next(error); }
};

// @desc    Delete user
// @route   DELETE /api/v1/admin/users/:id
// @access  Private (Admin)
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const eraseMail = user.email;
    await user.deleteOne();
    
    await AuditLog.create({ action: 'USER_DELETED', details: `Permenantly wiped record: ${eraseMail}`, entityType: 'User', entityId: req.params.id, performedBy: req.user._id });

    res.json({ success: true, message: 'User permanently deleted' });
  } catch (error) { next(error); }
};

// @desc    Get pending reviews
// @route   GET /api/v1/admin/reviews
// @access  Private (Admin)
const getPendingReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ isApproved: false })
      .populate('companyId', 'companyName slug')
      .populate('userId', 'name email')
      .sort('createdAt');
      
    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    next(error);
  }
};

// @desc    Platform-wide analytics over time
// @route   GET /api/v1/admin/analytics/growth
// @access  Private (Admin)
const getPlatformGrowth = async (req, res, next) => {
  try {
    // Basic implementation aggregating Analytics models over time
    const data = await Analytics.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          views: { $sum: '$views' },
          inquiries: { $sum: '$inquiries' },
          contactClicks: { $sum: '$contactClicks' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve a review
// @route   PUT /api/v1/admin/reviews/:id/approve
// @access  Private (Admin)
const approveReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      res.status(404);
      throw new Error('Review not found');
    }
    review.isApproved = true;
    await review.save();
    
    await AuditLog.create({ action: 'REVIEW_APPROVED', details: `Manually pushed pending review live.`, entityType: 'Review', entityId: review._id, performedBy: req.user._id });

    res.json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a new company
// @route   POST /api/v1/admin/companies
// @access  Private (Admin)
const addCompany = async (req, res, next) => {
  try {
    const {
      companyName, slug: customSlug, tagline, logo, industryType, industrySubType, overview,
      address, companyType, companySize, foundedYear,
      revenue, ceoName, website, careerPageUrl, email, phone, socialLinks
    } = req.body;

    const slug = customSlug || companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

    const company = await Company.create({
      companyName, slug, tagline, logo, industryType, industrySubType, overview,
      address, companyType, companySize, foundedYear,
      revenue, ceoName, website, careerPageUrl, email, phone, socialLinks,
      status: 'active',
      isVerified: true
    });
    
    await AuditLog.create({ action: 'COMPANY_ADDED', details: `Imported specific entity: ${company.companyName}`, entityType: 'Company', entityId: company._id, performedBy: req.user._id });

    res.status(201).json({ success: true, data: company });
  } catch (error) {
    next(error);
  }
};

// @desc    Bulk import companies from CSV
// @route   POST /api/v1/admin/companies/bulk-import
// @access  Private (Admin)
const bulkImportCompanies = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'Please upload a CSV file' });

    const results = [];
    const skipped = [];
    let insertedCount = 0;
    
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        // Guard missing minimum data sets
        if (!data.companyName && !data.Name) return;

        const baseName = data.companyName || data.Name;
        // Construct standard payload
        results.push({
          companyName: baseName,
          slug: data.slug || baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now() + Math.floor(Math.random()*1000),
          tagline: data.tagline || '',
          industryType: data.industryType || data.Industry || 'Others',
          industrySubType: data.industrySubType || '',
          companyType: data.companyType || data.Type || 'Privately Held',
          companySize: data.companySize || data.Size || '1-10',
          foundedYear: parseInt(data.foundedYear) || null,
          careerPageUrl: data.careerPageUrl || '',
          website: data.website || '',
          overview: data.overview || '',
          address: {
            street: data.street || '',
            city: data.city || '',
            state: data.state || '',
            country: data.country || '',
            zip: data.zip || '',
          },
          socialLinks: {
            linkedin: data.linkedin || '',
            instagram: data.instagram || '',
            twitter: data.twitter || '',
            youtube: data.youtube || '',
          },
          email: data.email || '',
          phone: data.phone || '',
          status: 'active',
          isVerified: true
        });
      })
      .on('end', async () => {
        // Free File System space synchronously
        try { fs.unlinkSync(req.file.path); } catch (e) {}

        const chunkSize = 1000; // chunk stream arrays to prevent Mongo connection flooding on 30k datasets
        
        for (let i = 0; i < results.length; i += chunkSize) {
          const chunk = results.slice(i, i + chunkSize);
          try {
            const insertResult = await Company.insertMany(chunk, { ordered: false });
            insertedCount += insertResult.length;
          } catch (error) {
            // Detect Mongo BulkWriteError. Extrapolate failed entities for reporting!
            if (error.writeErrors) {
              insertedCount += (error.insertedDocs?.length || 0);
              error.writeErrors.forEach((err) => {
                const doc = chunk[err.index]; // Mongoose error retains positional index corresponding to chunk structure
                if (doc) skipped.push(doc.companyName);
              });
            } else {
              console.error('Unexpected bulk import chunk failure:', error);
            }
          }
        }
        
        await AuditLog.create({ action: 'COMPANY_BULK_IMPORTED', details: `Automated CSV payload parsed yielding ${insertedCount} directories onboarded.`, entityType: 'System', performedBy: req.user._id });
        
        res.status(200).json({
          success: true,
          data: {
            totalProcessed: results.length,
            insertedCount,
            skippedCount: skipped.length,
            skippedCompanies: skipped
          }
        });
      });
  } catch (error) {
    if (req.file) { try { fs.unlinkSync(req.file.path); } catch(e) {} }
    next(error);
  }
};

// @desc    Add an employee
// @route   POST /api/v1/admin/employees
// @access  Private (Admin)
const addEmployee = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, jobRole, primaryManager, employeeId } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User email already exists');
    }

    const employee = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password,
      role: 'employee',
      employeeProfile: {
        firstName, lastName, jobRole, primaryManager, employeeId
      }
    });

    await AuditLog.create({ action: 'EMPLOYEE_ADDED', details: `Drafted Employee ID ${employeeId}`, entityType: 'User', entityId: employee._id, performedBy: req.user._id });

    res.status(201).json({ success: true, data: employee });
  } catch (error) { next(error); }
};

// @desc    Get all employees
// @route   GET /api/v1/admin/employees
// @access  Private (Admin)
const getEmployees = async (req, res, next) => {
  try {
    const employees = await User.find({ role: 'employee' }).select('-password').sort('-createdAt');
    res.json({ success: true, count: employees.length, data: employees });
  } catch (error) { next(error); }
};

module.exports = {
  getDashboardStats,
  getLogs,
  getAdminCompanies,
  verifyCompany,
  changeCompanyStatus,
  getUsers,
  changeUserRole,
  getPendingReviews,
  getPlatformGrowth,
  approveReview,
  addCompany,
  bulkImportCompanies,
  getEmployees,
  addEmployee,
  addUser,
  updateUser,
  deleteUser,
};
