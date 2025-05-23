// models/SocialProfile.js
import mongoose from "mongoose";

const platformEngagementSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
  },
  followers: {
    type: String,
    required: true,
  },
  growth: {
    type: String,
    required: true,
  },
});

const recentPostSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  daysAgo: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  comments: {
    type: Number,
    required: true,
  },
  shares: {
    type: Number,
    required: true,
  },
});

const platformDistributionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const engagementBreakdownSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const weeklyPerformanceSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  posts: {
    type: Number,
    required: true,
  },
  engagement: {
    type: Number,
    required: true,
  },
});

const monthlyGrowthSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  followers: {
    type: Number,
    required: true,
  },
});

const analyticsSchema = new mongoose.Schema({
  platformDistribution: [platformDistributionSchema],
  engagementBreakdown: [engagementBreakdownSchema],
  weeklyPerformance: [weeklyPerformanceSchema],
  monthlyGrowth: [monthlyGrowthSchema],
});

const metricsSchema = new mongoose.Schema({
  posts: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  comments: {
    type: Number,
    required: true,
  },
  shares: {
    type: Number,
    required: true,
  },
  impressions: {
    type: Number,
    required: true,
  },
  engagementRate: {
    type: Number,
    required: true,
  },
  clickThroughRate: {
    type: Number,
    required: true,
  },
  conversionRate: {
    type: Number,
    required: true,
  },
  averageEngagement: {
    type: Number,
    required: true,
  },
  reach: {
    type: Number,
    required: true,
  },
  responseRate: {
    type: Number,
    required: true,
  },
});

const socialProfileSchema = new mongoose.Schema(
  {
    // If you want to link to your existing User model
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Make optional if importing standalone data
    },

    // Basic Profile Information
    name: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    company: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "paused", "inactive"],
      default: "active",
    },

    // Follower Information
    followers: {
      type: String,
      required: true,
    },
    growth: {
      type: String,
      required: true,
    },

    // Platforms
    platforms: [
      {
        type: String,
        required: true,
      },
    ],

    // Metrics
    metrics: {
      type: metricsSchema,
      required: true,
    },

    // Analytics
    analytics: {
      type: analyticsSchema,
      required: true,
    },

    // Recent Posts
    recentPosts: [recentPostSchema],

    // Platform Engagement
    platformEngagement: [platformEngagementSchema],
  },
  {
    timestamps: true, // This will add createdAt and updatedAt automatically
  }
);

// Indexes for better query performance
socialProfileSchema.index({ email: 1 });
socialProfileSchema.index({ status: 1 });
socialProfileSchema.index({ company: 1 });
socialProfileSchema.index({ platforms: 1 });
socialProfileSchema.index({ "metrics.engagementRate": -1 });

const SocialProfile = mongoose.model("SocialProfile", socialProfileSchema);
export default SocialProfile;
