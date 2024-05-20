import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = "mongodb+srv://teja:tejas@cluster0.nlvvywg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

console.log(MONGODB_URL);

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");

  cached.promise =
    cached.promise ||
    mongoose.connect(
      MONGODB_URL,

      {
        dbName: "final",
        bufferCommands: false,
      }
    );

  cached.conn = await cached.promise;

  return cached.conn;
};
