const express = require("express");
const cors = require("cors");
const { sequelize } = require("./db"); // Import Sequelize instance
const authRoutes = require("./auth/auth.routes");
const authController = require("./auth/auth.controller");

const app = express();

// Enable CORS for all routes
app.use(cors());

// Handle JSON requests
app.use(express.json());

// Use routes
app.use("/api", authRoutes);

// Initialize and sync Sequelize
sequelize.sync().then(() => {
  console.log("Database synced");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
