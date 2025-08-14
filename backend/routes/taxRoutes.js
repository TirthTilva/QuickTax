import { Router } from "express";
import { calculateIncomeTax } from "../controllers/taxController.js";

const router = Router();

// POST /api/tax/calculate
router.post("/calculate", calculateIncomeTax);

export default router;
