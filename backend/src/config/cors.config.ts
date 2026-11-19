import { CorsOptions } from "cors";
import "dotenv/config";

// CORS untuk menyelaraskan origin yang berbeda antara FE dan BE
export const corsOptions: CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) {
    const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",");

    // Memeriksa apakah origin diizinkan
    if (origin && !ALLOWED_ORIGINS?.includes(origin)) {
      return callback(new Error("Origin not allowed by CORS"));
    }

    return callback(null, true);
  },

  // Mengizinkan credentials pada request dari frontend
  credentials: true,
};