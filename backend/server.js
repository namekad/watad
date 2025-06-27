const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./src/routes/auth.routes");
const contentRoutes = require("./src/routes/content.routes");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
