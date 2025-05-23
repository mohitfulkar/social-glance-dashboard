import express from "express";
import {
  getAllProfiles,
  getProfileById,
  getUserStats,
} from "../controller/socialProfileController.js";

const router = express.Router();

// Get all profiles
router.get("/", getAllProfiles);
router.get("/profile-stats", getUserStats);
// // Get profile by ID
router.get("/:id", getProfileById);

export default router;
