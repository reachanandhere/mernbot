import { connect, disconnect } from "mongoose";
async function connectDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    throw new Error("Connection issue with MongoDB");
  }
}

async function disconnectDB() {
  try {
    await disconnect();
  } catch (error) {
    console.log("Error disconnecting database");
  }
}

export { connectDatabase, disconnectDB };
