const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['like', 'comment', 'follow', 'post', 'message'],
    required: true,
  },
  sourceUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  targetUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', EventSchema);
