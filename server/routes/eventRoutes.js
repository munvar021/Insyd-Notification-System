const express = require('express');
const router = express.Router();
const { createEvent } = require('../controllers/eventController');

// Route to create an event
router.post('/', createEvent);

module.exports = router;
