// import mongoose from 'mongoose';
// const uri = process.env.MONGODB_URI_PRODUCTS!;
// if (!uri) throw new Error('MONGODB_URI missing');

// let cached = (global as any).mongoose as
//   | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
//   | undefined;

// if (!cached) cached = (global as any).mongoose = { conn: null, promise: null };

// export async function clientPromise() {
//   if (cached!.conn) return cached!.conn;
//   if (!cached!.promise) {
//     cached!.promise = mongoose.connect(uri, { bufferCommands: false });
//   }
//   cached!.conn = await cached!.promise;
//   return cached!.conn;
// }
// export default clientPromise;


import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI_PRODUCTS!;
const options = {};

if (!uri) {
  throw new Error("Please add MONGODB_URI to your env file");
}

let client;
let clientPromise: Promise<MongoClient>;

declare global {
  // allow global to have a cached connection
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise!;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
