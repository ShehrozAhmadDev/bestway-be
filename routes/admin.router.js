import express from "express";
import { catchErrors } from "../middleware/error.middleware.js";
import { verifyToken } from "../middleware/auth.js";

import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  editAdmin,
} from "../controller/admin.controller.js";

const router = express.Router();

// Route to register a new user
router.post("/register", catchErrors(registerAdmin));

// Route to log in a user
router.post("/login", catchErrors(loginAdmin));

// Route to get the user profile
router.get("/profile", verifyToken, catchErrors(getAdminProfile));

// Route to edit user profile
router.put("/:userId", verifyToken, catchErrors(editAdmin));

export default router;
