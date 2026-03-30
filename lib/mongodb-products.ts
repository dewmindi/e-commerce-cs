/**
 * Separate MongoDB client for blog / products data.
 *
 * The blog-generation scripts (scripts/generate-blog-post.mjs and
 * app/api/generate-blog) store posts using:
 *   - production  → MONGODB_URI_PRODUCTS
 *   - development → MONGODB_DB_URI_PRODUCTS_DEV
 *
 * This module provides the matching connection so that blog pages and
 * blog API routes read from the same database the generator writes to.
 */

import { MongoClient } from "mongodb";

const uri =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI_PRODUCTS
    : process.env.MONGODB_DB_URI_PRODUCTS_DEV ?? process.env.MONGODB_URI!;

if (!uri) {
  throw new Error(
    "Please add MONGODB_URI_PRODUCTS (prod) or MONGODB_DB_URI_PRODUCTS_DEV (dev) to your env file"
  );
}

let clientPromiseProducts: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoProductsClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoProductsClientPromise) {
    const c = new MongoClient(uri);
    global._mongoProductsClientPromise = c.connect();
  }
  clientPromiseProducts = global._mongoProductsClientPromise!;
} else {
  const c = new MongoClient(uri);
  clientPromiseProducts = c.connect();
}

export default clientPromiseProducts;
