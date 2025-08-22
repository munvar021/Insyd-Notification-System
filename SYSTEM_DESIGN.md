### **System Design Document: Insyd Notification System**

#### **1. Introduction**

This document outlines the system design for a notification system for Insyd, a social web platform for the Architecture Industry. The purpose of this system is to enhance user engagement by providing timely and relevant updates about activities on the platform. This document covers the initial proof-of-concept (POC) design, built to serve 100 Daily Active Users (DAUs), and details the strategies for scaling the system to support 1 million DAUs.

#### **2. System Overview**

The notification system is an essential feature for Insyd, designed to keep users informed about interactions relevant to them. It handles various types of events, such as likes on a post, comments, new followers, and new posts from followed users. For the initial POC, the system focuses on delivering these notifications through an in-app interface. The core goal is to create a reliable, scalable, and real-time notification experience that encourages users to return to the platform.

#### **3. Architecture**

The system is designed using an event-driven architecture, which is highly scalable and decouples the components.

**3.1. Components**

*   **Event Source (Frontend Client):** The ReactJS application where user actions (e.g., clicking "like," "comment," or "follow") originate.
*   **API Server (Node.js/Express):** The backend server that receives events from the client via a REST API (`POST /api/events`). It validates and persists these events.
*   **Database (MongoDB):** A NoSQL database used to store user data, event logs, and the notifications themselves. Its flexible schema is ideal for evolving requirements.
*   **In-Memory Queue (POC):** A simple, array-based in-memory queue within the Node.js application to handle asynchronous processing of events. This ensures that event ingestion is fast and doesn't block the user's request.
*   **Notification Service:** A backend service that continuously processes events from the queue. It contains the business logic to transform an event (e.g., a "like" event) into a user-facing notification message.
*   **Delivery Service (In-App):** For the POC, this is the API endpoint (`GET /api/notifications/:userId`) that the frontend client polls to retrieve notifications for a specific user.

**3.2. Flow of Execution**

1.  A user performs an action (e.g., likes a post) in the React frontend.
2.  The frontend sends a request to the backend API (`POST /api/events`) with details about the event.
3.  The `eventController` in the Express server receives the request, creates an `Event` document, and saves it to MongoDB.
4.  The `eventController` then pushes the newly created event object into the in-memory queue managed by the `notificationService`. The API immediately returns a success response to the client.
5.  The `notificationService`, running as a background process, periodically pulls an event from the queue.
6.  It processes the event, generates the appropriate notification content (e.g., "User X liked your post"), and creates a `Notification` document in the database, associating it with the correct recipient.
7.  The frontend client, which is polling the `GET /api/notifications/:userId` endpoint every few seconds, fetches the newly created notification and displays it to the user in the UI.

**3.3. Architecture Diagram Description**

*(This description can be used in a tool like draw.io or Lucidchart to create a visual diagram.)*

A diagram would show the "Frontend Client" on the left, sending an arrow labeled "POST /api/events" to the "API Server". The "API Server" has an arrow pointing to the "MongoDB Database" labeled "Write Event". The "API Server" also has an arrow pointing to an "In-Memory Queue" box inside a larger "Notification Service" box. The "Notification Service" has an arrow pointing from the "In-Memory Queue" to a "Processing Logic" component, which then points back to the "MongoDB Database" with an arrow labeled "Write Notification". On the right, the "Frontend Client" has a polling arrow labeled "GET /api/notifications/:userId" pointing to the "API Server", which in turn has an arrow pointing from the "MongoDB Database" back to the "API Server" labeled "Read Notifications".

#### **4. Data Design**

The data is stored in MongoDB using the following Mongoose schemas:

*   **Users:**
    ```json
    {
      "userId": "ObjectId",
      "username": "String",
      "email": "String",
      "preferences": {
        "inApp": "Boolean",
        "email": "Boolean",
        "push": "Boolean"
      }
    }
    ```
*   **Events:**
    ```json
    {
      "eventId": "ObjectId",
      "type": "String (like, comment, follow)",
      "sourceUserId": "ObjectId",
      "targetUserId": "ObjectId",
      "data": "Mixed",
      "timestamp": "Date"
    }
    ```
*   **Notifications:**
    ```json
    {
      "notificationId": "ObjectId",
      "userId": "ObjectId", // The recipient
      "type": "String (like, comment, follow)",
      "content": "String",
      "status": "String (read, unread)",
      "timestamp": "Date"
    }
    ```

#### **5. Scalability and Performance**

**For 100 DAUs (Current POC):**
*   A single Node.js server instance is sufficient.
*   A simple in-memory queue is effective for handling the low volume of events.
*   A free-tier MongoDB Atlas cluster can easily handle the database load.
*   Polling via the REST API is acceptable and simple to implement.

**For 1 Million DAUs:**
*   **Message Queue:** The in-memory queue must be replaced with a robust, dedicated message queue like **RabbitMQ** or **Apache Kafka**. This allows for persistent, scalable, and reliable event processing. Multiple `Notification Service` workers can consume events from the queue, allowing for horizontal scaling.
*   **Database Scaling:** The MongoDB database will need to be scaled. This can be achieved through **sharding**, where the data is partitioned across multiple servers based on a shard key (e.g., `userId`). Read replicas can also be used to distribute the load from read-heavy operations like fetching notifications.
*   **Real-time Delivery:** Polling becomes inefficient at scale. The system should be upgraded to use **WebSockets**. This would allow the server to push notifications to the client in real-time, reducing latency and server load.
*   **Horizontal Scaling:** The API server and Notification Service should be containerized (e.g., using Docker) and deployed behind a load balancer to allow for horizontal scaling by adding more instances as needed.
*   **Rate Limiting:** To prevent spam and abuse, rate limiting should be implemented on the `/api/events` endpoint.

#### **6. Limitations**

The current POC has several limitations by design to ensure simplicity:
*   **In-Memory Queue:** The queue is not persistent. If the server restarts, any events in the queue will be lost.
*   **No User Authentication:** The POC uses mock user IDs and has no authentication or authorization, making it insecure for production.
*   **Polling:** The polling mechanism introduces latency and is not as efficient as WebSockets.
*   **No Caching:** User data and preferences are fetched directly from the database for each event, which can be inefficient. A caching layer like Redis would improve performance.
*   **Simplified Notification Content:** The notification content is generic (e.g., "User X liked your post"). A production system would need to fetch actual usernames and more context.

#### **7. Conclusion**

The designed proof-of-concept successfully demonstrates the core functionality of a notification system using a scalable, event-driven architecture. While the initial implementation is tailored for a small user base, the design lays a clear and solid foundation for scaling to support a large platform like Insyd. By replacing the in-memory queue with a dedicated message broker, upgrading to WebSockets, and scaling the database, this system can evolve into a robust, real-time, and highly available notification platform.
