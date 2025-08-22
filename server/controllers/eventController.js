const Event = require('../models/Event');
const { addEventToQueue } = require('../services/notificationService');

// @desc    Create an event
// @route   POST /api/events
// @access  Public
exports.createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);

    // Add the event to the in-memory queue for processing
    addEventToQueue(event);

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
