const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

dotenv.config();

const { connectDB } = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// =========================
// MIDDLEWARE
// =========================

app.use(helmet());

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      "http://localhost:5173",
  })
);

app.use(express.json());

// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "TaskFlow API is running 🚀",
  });
});

// =========================
// API ROUTES
// =========================

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api", taskRoutes);

// =========================
// 404
// =========================

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// =========================
// SERVER
// =========================

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `TaskFlow API running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Server startup error:",
      error.message
    );
  }
};

startServer();