/**
 * Separate MongoDB client for blog / products data.
 *
 * The blog-generation scripts store posts using:
 *   - production  → MONGODB_URI_PRODUCTS
 *   - development → MONGODB_DB_URI_PRODUCTS_DEV (falls back to MONGODB_URI)
 *
 * Connection is deferred until first await so `next build` doesn’t fail
 * when env vars are absent from the build environment.
 */

import { MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoProductsClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise(): Promise<MongoClient> {
  const uri =
    process.env.NODE_ENV === "production"
      ? process.env.MONGODB_URI_PRODUCTS
      : (process.env.MONGODB_DB_URI_PRODUCTS_DEV ?? process.env.MONGODB_URI);

  if (!uri) {
    throw new Error(
      "Please add MONGODB_URI_PRODUCTS (prod) or MONGODB_DB_URI_PRODUCTS_DEV (dev) to your env file"
    );
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoProductsClientPromise) {
      global._mongoProductsClientPromise = new MongoClient(uri).connect();
    }
    return global._mongoProductsClientPromise;
  }
  return new MongoClient(uri).connect();
}

// Lazy thenable – connection is deferred until first `await clientPromiseProducts`
const clientPromiseProducts = {
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

export default clientPromiseProducts;
