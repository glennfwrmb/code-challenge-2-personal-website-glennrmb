import "dotenv/config";
import app from "./application/app";

const PORT: number = Number(process.env.PORT) || 8000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Application Running On Port ${PORT}`);
});

export default app;