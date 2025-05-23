import express from "express";
import { login } from "../controller/authController.js";
const router = express.Router();
router.post("/login", login);
router.get("/social-profile", login);

export default router;
