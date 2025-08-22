import React, { useState, useEffect } from 'react';
import styles from './notificationList.module.css';
import { fetchNotifications } from '../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faUserPlus, faBell } from '@fortawesome/free-solid-svg-icons';

// This should be the user who is receiving the notifications
const MOCK_TARGET_USER_ID = '60d21b4667d0d8992e610c86';

const getNotificationIcon = (type) => {
  switch (type) {
    case 'like':
      return <FontAwesomeIcon icon={faThumbsUp} />;
    case 'comment':
      return <FontAwesomeIcon icon={faComment} />;
    case 'follow':
      return <FontAwesomeIcon icon={faUserPlus} />;
    default:
      return <FontAwesomeIcon icon={faBell} />;
  }
};

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadNotifications = async () => {
    try {
      // setLoading(true); // Optional: for visual feedback on each poll
      const response = await fetchNotifications(MOCK_TARGET_USER_ID);
      setNotifications(response.data.data);
      setError(null);
    } catch (err) {
      setError('Error fetching notifications. Is the server running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications(); // Fetch initially

    const interval = setInterval(() => {
      loadNotifications(); // Poll every 5 seconds
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className={styles.notificationContainer}>
      <h2>Notifications</h2>
      {loading && notifications.length === 0 && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && notifications.length === 0 && <p>No notifications yet.</p>}
      <ul className={styles.notificationList}>
        {notifications.map(notification => (
          <li key={notification._id} className={styles.notificationItem}>
            <div className={styles.notificationIcon}>{getNotificationIcon(notification.type)}</div>
            <div className={styles.notificationContent}>
              {notification.content}
              <br />
              <small>{new Date(notification.timestamp).toLocaleString()}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
