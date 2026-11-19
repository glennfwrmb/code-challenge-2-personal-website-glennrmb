import "dotenv/config";
import express from "express";
import cors from "cors";
import { corsOptions } from "../config/cors.config";
import { errorMiddleware } from "../middleware/error.middleware";
import { ContactsRoute } from "../features/contacts/contacts.route";

const app = express();

const API_PREFIX: string = process.env.API_PREFIX || "/api/v1";

// CORS Configuration
app.use(cors(corsOptions));

// Parse JSON request body
app.use(express.json());

// Health Check
app.get(`${API_PREFIX}/health`, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Personal Website API is running",
  });
});

// Contact Form Routes
app.use(`${API_PREFIX}/contacts`, ContactsRoute);

// Global Error Handling
// Wajib dipasang setelah semua routes
app.use(errorMiddleware);

export default app;