import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { corsOptions } from '../config/cors.config';
import { errorMiddleware } from '../middleware/error.middleware';
import { ContactsRoute } from '../features/contacts/contacts.route';

const app = express();

const API_PREFIX: string = process.env.API_PREFIX || '/api/v1';

// CORS Configuration
app.use(cors(corsOptions));

// Parse JSON request body
app.use(express.json());

// Health Check
app.get(`${API_PREFIX}/health`, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Personal Website API is running',
  });
});

// Contact Form Routes
app.use(`${API_PREFIX}/contacts`, ContactsRoute);

// Serve React Frontend only outside Vercel
if (!process.env.VERCEL) {
  const frontendPath = path.resolve(
    __dirname,
    '../../../intro-react/dist'
  );

  app.use(express.static(frontendPath));

  // React SPA fallback
  app.get('/{*path}', (req, res, next) => {
    if (req.path.startsWith('/api/') || path.extname(req.path)) {
      return next();
    }

    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// Global Error Handling
app.use(errorMiddleware);

export default app;
