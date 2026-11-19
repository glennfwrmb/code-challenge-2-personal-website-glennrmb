import "dotenv/config";
import app from "./application/app";

const PORT: number = Number(process.env.PORT) || 8000;

// Start server only in development
if (process.env.NODE_ENV === "development") {
  app.listen(PORT, () => {
    console.log(`Application Running On Port ${PORT}`);
  });
}

export default app;