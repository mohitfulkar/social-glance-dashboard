import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Replace this with your real secret key from .env
const JWT_SECRET = process.env.JWT_SECRET || "asdnkjnkjassss";
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Check for required fields
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Compare passwords
    const isMatch = password === user.password;
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        fullName: user.fullName,
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
};


