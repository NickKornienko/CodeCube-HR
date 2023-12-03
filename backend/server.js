// server.js
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { sequelize } = require("./db/db");
const authRoutes = require("./auth/auth.routes");
const dbRoutes = require("./db/db.routes");
const secrets = require("../secrets.json");

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

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.use("/api", authRoutes);
    app.use("/api", dbRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Unable to sync database:", error);
  });
