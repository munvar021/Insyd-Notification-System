# Insyd Notification System - Backend Server

This directory contains the Node.js, Express, and MongoDB backend for the Insyd Notification System POC.

## Features

-   REST API for creating events and fetching notifications.
-   Event-driven architecture using an in-memory queue.
-   Asynchronous processing of events to generate notifications.
-   Mongoose schemas for Users, Events, and Notifications.

## Project Structure

```
/server
|-- /config
|   |-- db.js           # MongoDB connection logic
|-- /controllers
|   |-- eventController.js
|   |-- notificationController.js
|-- /models
|   |-- Event.js
|   |-- Notification.js
|   |-- User.js
|-- /routes
|   |-- eventRoutes.js
|   |-- notificationRoutes.js
|-- /services
|   |-- notificationService.js # In-memory queue and processing logic
|-- .env                # Environment variables (requires manual creation)
|-- .gitignore
|-- index.js            # Server entry point
|-- package.json
```

## Setup and Installation

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Create Environment File:**
    Create a `.env` file in this directory and add the following variables:
    ```
    PORT=5000
    MONGO_URI=<Your_MongoDB_Connection_String>
    ```

3.  **Run the Server:**
    *   For development (with auto-restarting):
        ```bash
        npm run dev
        ```
    *   For production:
        ```bash
        npm start
        ```

The server will start on the port specified in your `.env` file.

## API Endpoints

-   `POST /api/events`: Creates a new event.
-   `GET /api/notifications/:userId`: Fetches all notifications for a specific user.
