// server.js
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { sequelize } = require("./db");
const authRoutes = require("./auth/auth.routes");
const secrets = require("./secrets.json");

const app = express();

app.use(cors());
app.use(express.json());

// JWT verification middleware
app.use((req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return next(); // No token, continue without setting req.user

  jwt.verify(token, secrets.jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user;
    next();
  });
});

app.use("/api", authRoutes);
sequelize.sync().then(() => {
  console.log("Database synced");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
