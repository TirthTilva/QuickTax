import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taxRoutes from "./routes/taxRoutes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Tax routes
app.use("/api/tax", taxRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
