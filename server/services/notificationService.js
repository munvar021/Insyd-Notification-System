// This service will handle the logic for processing events and creating notifications.

const Notification = require('../models/Notification');
const { sendNotificationToUser } = require('./webSocketService');

// Simple in-memory queue
const eventQueue = [];

const processQueue = async () => {
  if (eventQueue.length === 0) {
    return;
  }

  // Get the next event from the queue
  const event = eventQueue.shift();

  try {
    // Generate notification content based on event type
    let content = '';
    switch (event.type) {
      case 'like':
        content = `User ${event.sourceUserId} liked your post.`; // In a real app, you'd fetch the username
        break;
      case 'comment':
        content = `User ${event.sourceUserId} commented on your post.`;
        break;
      case 'follow':
        content = `User ${event.sourceUserId} started following you.`;
        break;
      default:
        return; // Or handle other event types
    }

    // Create the notification
    const newNotification = await Notification.create({
      userId: event.targetUserId,
      type: event.type,
      content: content,
    });

    console.log(`Notification created for event: ${event.type}`);

  } catch (error) {
    console.error('Error processing event:', error);
    // Optionally, add the event back to the queue for a retry
    // eventQueue.unshift(event);
  }
};

// Process the queue every few seconds
setInterval(processQueue, 3000);

const addEventToQueue = (event) => {
  eventQueue.push(event);
  console.log(`Event of type ${event.type} added to the queue.`);
};

module.exports = { addEventToQueue };
