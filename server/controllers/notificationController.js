const Notification = require('../models/Notification');

// @desc    Get notifications for a user
// @route   GET /api/notifications/:userId
// @access  Public
exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId }).sort({ timestamp: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
