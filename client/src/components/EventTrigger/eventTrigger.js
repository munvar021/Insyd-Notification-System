import React from 'react';
import styles from './eventTrigger.module.css';
import { triggerEvent } from '../../services/api'; // Updated import path

// Mock user IDs for POC
const MOCK_SOURCE_USER_ID = '60d21b4667d0d8992e610c85'; // A mock ObjectId
const MOCK_TARGET_USER_ID = '60d21b4667d0d8992e610c86'; // A different mock ObjectId

const EventTrigger = () => {
  const handleTrigger = (eventType) => {
    const eventData = {
      type: eventType,
      sourceUserId: MOCK_SOURCE_USER_ID,
      targetUserId: MOCK_TARGET_USER_ID,
      data: {
        postId: 'post123',
      },
    };

    console.log(`Sending event: ${eventType}`);
    triggerEvent(eventData)
      .then(response => console.log('Event sent successfully:', response.data))
      .catch(error => console.error('Error sending event:', error.response ? error.response.data : error.message));
  };

  return (
    <div className={styles.eventTriggerContainer}>
      <h3>Simulate Events</h3>
      <button className={`${styles.eventButton} ${styles.likeButton}`} onClick={() => handleTrigger('like')}>Trigger "Like" Event</button>
      <button className={`${styles.eventButton} ${styles.commentButton}`} onClick={() => handleTrigger('comment')}>Trigger "Comment" Event</button>
      <button className={`${styles.eventButton} ${styles.followButton}`} onClick={() => handleTrigger('follow')}>Trigger "Follow" Event</button>
    </div>
  );
};

export default EventTrigger;
