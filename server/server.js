const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Route files
const notificationRoutes = require('./routes/notificationRoutes');
const eventRoutes = require('./routes/eventRoutes');

// Load env vars
dotenv.config();

// Initialize Notification Service (starts the queue processing)
require('./services/notificationService');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS for a specific origin
app.use(cors({ origin: process.env.CLIENT_URL }));

// Mount routers
app.use("/api/notifications", notificationRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
