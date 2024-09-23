import mongoose from 'mongoose';

let isConnected = false; // Track the connection status

export async function dbConnect() {
  if (isConnected) {
    // If already connected, no need to connect again
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DATABASE_URI);

    isConnected = db.connections[0].readyState; // Set the connection status

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
