import mongoose from "mongoose";

/**
 * Connects to MongoDB Atlas using MONGODB_URI from environment variables.
 * Called once from server.ts on boot. No models/schemas are defined yet —
 * this only establishes the connection.
 */
export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not set in the environment.");
  }

  mongoose.connection.on("connected", () => {
    console.log("[db] MongoDB connected");
  });

  mongoose.connection.on("error", (err) => {
    console.error("[db] MongoDB connection error:", err);
  });

  await mongoose.connect(uri);
}
