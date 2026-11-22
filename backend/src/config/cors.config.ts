import { CorsOptions } from 'cors';
import 'dotenv/config';
import { AppError } from '../errors/app.error';

// CORS untuk menyelaraskan origin yang berbeda antara FE dan BE
export const corsOptions: CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) {
    const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
      ?.split(',')
      .map((item) => item.trim());

    // Memeriksa apakah origin diizinkan
    if (origin && !ALLOWED_ORIGINS?.includes(origin)) {
      return callback(new AppError(403, 'Origin not allowed by CORS'));
    }

    return callback(null, true);
  },

  // Mengizinkan credentials pada request dari frontend
  credentials: true,
};
