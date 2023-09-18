import express from "express";
import { catchErrors } from "../middleware/error.middleware.js";

import { registerCompany } from "../controller/company.controller.js";

const router = express.Router();

// Route to add in a company
router.post("/", catchErrors(registerCompany));

export default router;
