import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import socialProfileRoutes from "./routes/socialProfilesRoutes.js";
import cors from "cors"; // or const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // if you send cookies or auth headers
  })
);
dotenv.config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/api", authRoutes);
app.use("/api/profile", socialProfileRoutes);

// MongoDB connection
const MONGO_URI =
  "mongodb+srv://mohitfulkar:mohitfulkar@mohit.mvv8f91.mongodb.net/socialmedia?retryWrites=true&w=majority&appName=mohit";
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
