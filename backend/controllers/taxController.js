import { calculateTax } from "../utils/taxCalculator.js";

export const calculateIncomeTax = (req, res) => {
  try {
    const result = calculateTax(req.body || {});
    return res.json(result);
  } catch (e) {
    console.error("Tax calc error:", e);
    return res.status(400).json({ error: e.message || "Invalid input" });
  }
};
