const Job = require('../models/Job');
const Company = require('../models/Company');

// @desc    Get all jobs
// @route   GET /api/v1/jobs
// @access  Public
const getJobs = async (req, res, next) => {
  try {
    const { search, location, type, companyId, page = 1, limit = 10 } = req.query;

    let query = {};

    if (search) query.$text = { $search: search };
    if (location) query.location = location;
    if (type) query.type = type;
    if (companyId) query.companyId = companyId;

    const startIndex = (Number(page) - 1) * Number(limit);
    const total = await Job.countDocuments(query);

    const jobs = await Job.find(query)
      .populate('companyId', 'companyName slug logo address')
      .sort('-postedAt')
      .skip(startIndex)
      .limit(Number(limit));

    res.json({
      success: true,
      count: jobs.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Post a job
// @route   POST /api/v1/jobs
// @access  Private (Company)
const createJob = async (req, res, next) => {
  try {
    const { companyId } = req.body;

    const company = await Company.findById(companyId);

    if (!company) {
      res.status(404);
      throw new Error('Company not found');
    }

    // Must be company owner to post a job
    if (company.owner?.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to post jobs for this company');
    }

    const job = await Job.create(req.body);

    res.status(201).json({ success: true, data: job });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a job
// @route   DELETE /api/v1/jobs/:id
// @access  Private (Admin or Owner)
const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('companyId', 'owner');

    if (!job) {
      res.status(404);
      throw new Error('Job not found');
    }

    if (
      job.companyId.owner?.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      res.status(403);
      throw new Error('Not authorized to delete this job');
    }

    await job.deleteOne();

    res.json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getJobs,
  createJob,
  deleteJob,
};
