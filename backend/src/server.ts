import "dotenv/config";
import { createApp } from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT ?? 5000;

async function bootstrap() {
  await connectDB();

  const app = createApp();
  app.listen(PORT, () => {
    console.log(`[server] DOSSIER API running on port ${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("[server] Failed to start:", err);
  process.exit(1);
});
