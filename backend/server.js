import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taxRoutes from "./routes/taxRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import { notFound , errorHandler} from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173",
    credentials: true 
 }));
app.use(express.json());
app.use(cookieParser());

// Health check
// app.get("/api/health", (_req, res) => res.json({ ok: true }));

connectDB();

//user routes
app.use("/api/user",userRoutes);

// Tax routes
app.use("/api/tax", taxRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
