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

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  const uri =
    process.env.NODE_ENV === "production"
      ? process.env.MONGODB_URI_FALLBACK
      : process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Please add MONGODB_URI (dev) or MONGODB_URI_FALLBACK (prod) to your env file");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri).connect();
    }
    return global._mongoClientPromise;
  }
  return new MongoClient(uri).connect();
}

// Lazy thenable – connection is deferred until first `await clientPromise`
const clientPromise = {
  then: <T, U>(
    onfulfilled?: ((v: MongoClient) => T | PromiseLike<T>) | null,
    onrejected?: ((r: unknown) => U | PromiseLike<U>) | null
  ) => createClientPromise().then(onfulfilled, onrejected),
  catch: <T>(onrejected?: ((r: unknown) => T | PromiseLike<T>) | null) =>
    createClientPromise().catch(onrejected),
  finally: (onfinally?: (() => void) | null) =>
    createClientPromise().finally(onfinally),
  [Symbol.toStringTag]: "Promise" as const,
} as unknown as Promise<MongoClient>;

export default clientPromise;
