// controllers/socialProfileController.js
import SocialProfile from "../models/SocialProfile.js";
import User from "../models/User.js"; // Adjust the path as needed

import mongoose from "mongoose";

// Get all social profiles with optional filtering and pagination
export const getAllProfiles = async (req, res) => {
  try {
    console.log("getAllProfiles called");
    debugger; // Execution will pause here if a debugger is attached

    const result = await SocialProfile.find();

    console.log("Social profiles fetched:", result);

    res.status(200).json({
      success: true,
      data: result,
      message: "Social profiles retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching social profiles:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching social profiles",
      error: "Internal server error",
    });
  }
};

// Get social profile by ID
export const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid profile ID format",
      });
    }

    const profile = await SocialProfile.findById(id)
      .populate("userId", "username email firstName lastName")
      .lean();

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Social profile not found",
      });
    }

    // Calculate additional metrics
    const additionalMetrics = {
      totalEngagement:
        profile.metrics.likes +
        profile.metrics.comments +
        profile.metrics.shares,
      avgPostEngagement:
        profile.metrics.posts > 0
          ? Math.round(
              (profile.metrics.likes +
                profile.metrics.comments +
                profile.metrics.shares) /
                profile.metrics.posts
            )
          : 0,
      platformCount: profile.platforms.length,
      recentPostsCount: profile.recentPosts.length,
    };

    res.status(200).json({
      success: true,
      data: {
        profile,
        additionalMetrics,
      },
      message: "Social profile retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching social profile by ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching social profile",
      error: "Internal server error",
    });
  }
};

export const getUserStats = async (req, res) => {
  try {
    // Fetch only the necessary fields
    console.log("Invalid profile");
    const users = await SocialProfile.find({}, { status: 1, growth: 1 });
    console.log("users", users);

    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.status === "active").length;

    // Parse growth strings like "+12.5%" into numbers
    const growthValues = users
      .map((user) =>
        parseFloat(user.growth?.replace("%", "").replace("+", "").trim())
      )
      .filter((g) => !isNaN(g));

    const totalGrowth = growthValues.reduce((sum, g) => sum + g, 0);
    const averageGrowth = growthValues.length
      ? (totalGrowth / growthValues.length).toFixed(2) + "%"
      : "0%";

    res.status(200).json({
      totalUsers,
      activeUsers,
      averageGrowth,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user stats", error: error.message });
  }
};
