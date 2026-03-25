const Event = require('../models/Event');
const Company = require('../models/Company');

// @desc    Get all events
// @route   GET /api/v1/events
// @access  Public
const getEvents = async (req, res, next) => {
  try {
    const { type, companyId, upcoming, page = 1, limit = 10 } = req.query;

    let query = {};

    if (type) query.type = type;
    if (companyId) query.companyId = companyId;
    if (upcoming === 'true') {
      query.date = { $gte: new Date() }; // Only future events
    }

    const startIndex = (Number(page) - 1) * Number(limit);
    const total = await Event.countDocuments(query);

    const events = await Event.find(query)
      .populate('companyId', 'companyName slug logo')
      .sort('date') // ascending date for events makes sense
      .skip(startIndex)
      .limit(Number(limit));

    res.json({
      success: true,
      count: events.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create an event
// @route   POST /api/v1/events
// @access  Private (Company/Admin)
const createEvent = async (req, res, next) => {
  try {
    const { companyId } = req.body;

    const company = await Company.findById(companyId);

    if (!company) {
      res.status(404);
      throw new Error('Company not found');
    }

    // Must be company owner to create event
    if (company.owner?.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to post events for this company');
    }

    const event = await Event.create(req.body);

    res.status(201).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEvents,
  createEvent,
};
