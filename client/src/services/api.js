import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const triggerEvent = (eventData) => {
  return apiClient.post('/events', eventData);
};

export const fetchNotifications = (userId) => {
  return apiClient.get(`/notifications/${userId}`);
};
