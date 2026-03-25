const Inquiry = require('../models/Inquiry');
const Company = require('../models/Company');
const Analytics = require('../models/Analytics');

// @desc    Send inquiry to a company
// @route   POST /api/v1/inquiries
// @access  Public
const sendInquiry = async (req, res, next) => {
  try {
    const { companyId, senderName, senderEmail, senderPhone, message } = req.body;

    const company = await Company.findById(companyId);

    if (!company) {
      res.status(404);
      throw new Error('Company not found');
    }

    const inquiry = await Inquiry.create({
      companyId,
      senderName,
      senderEmail,
      senderPhone,
      message,
    });

    // Update Analytics for today
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    await Analytics.findOneAndUpdate(
      { companyId: company._id, date: { $gte: todayStart, $lte: todayEnd } },
      { $inc: { inquiries: 1 }, $setOnInsert: { date: todayStart } },
      { upsert: true, new: true }
    );

    // Later: Send notification via email to company owner here using Nodemailer

    res.status(201).json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};

// @desc    Get inquiries for a company
// @route   GET /api/v1/inquiries/company/:companyId
// @access  Private (Company Owner or Admin)
const getCompanyInquiries = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.companyId);

    if (!company) {
      res.status(404);
      throw new Error('Company not found');
    }

    if (company.owner?.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to view these inquiries');
    }

    const inquiries = await Inquiry.find({ companyId: req.params.companyId }).sort('-createdAt');

    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark inquiry as read
// @route   PUT /api/v1/inquiries/:id/read
// @access  Private (Company Owner or Admin)
const markInquiryRead = async (req, res, next) => {
  try {
    let inquiry = await Inquiry.findById(req.params.id).populate('companyId', 'owner');

    if (!inquiry) {
      res.status(404);
      throw new Error('Inquiry not found');
    }

    if (
      inquiry.companyId.owner?.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      res.status(403);
      throw new Error('Not authorized to update this inquiry');
    }

    inquiry.isRead = true;
    await inquiry.save();

    res.json({ success: true, data: inquiry });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendInquiry,
  getCompanyInquiries,
  markInquiryRead,
};
