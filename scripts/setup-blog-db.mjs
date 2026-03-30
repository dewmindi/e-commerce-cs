/**
 * scripts/setup-blog-db.mjs
 *
 * One-time setup: creates the blog_posts collection + all required indexes
 * in MongoDB Atlas.
 *
 * Run:  node --env-file=.env scripts/setup-blog-db.mjs
 */

import { MongoClient } from "mongodb";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ---------------------------------------------------------------------------
// Parse .env manually so the script works without a separate dotenv package
// ---------------------------------------------------------------------------
function loadEnv() {
  const __dir = dirname(fileURLToPath(import.meta.url));
  const envPath = resolve(__dir, "../.env");
  const lines = readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnv();

// ---------------------------------------------------------------------------
// Connection — mirrors the lib/mongodb.ts logic
// ---------------------------------------------------------------------------
const isProduction = process.env.NODE_ENV === "production";
const uri = isProduction
  ? process.env.MONGODB_URI_PRODUCTS
  : process.env.MONGODB_DB_URI_PRODUCTS_DEV;
const dbName = process.env.MONGODB_DB_PRODUCTS ?? "cs-ecommerce";

if (!uri) {
  console.error("❌  No MongoDB URI found. Check MONGODB_DB_URI_PRODUCTS_DEV or MONGODB_URI_PRODUCTS in .env");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------
async function setup() {
  const client = new MongoClient(uri, { tls: true });

  console.log("╔══════════════════════════════════════════╗");
  console.log("║   CS Graphic Meta – Blog DB Setup        ║");
  console.log("╚══════════════════════════════════════════╝\n");

  console.log(`🌐  Environment : ${isProduction ? "production" : "development"}`);
  console.log(`🗄️   Database    : ${dbName}`);
  console.log(`📦  Collection  : blog_posts\n`);

  try {
    // -----------------------------------------------------------------------
    // 1. Connect
    // -----------------------------------------------------------------------
    console.log("🔌  Connecting to MongoDB Atlas…");
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅  Connected\n");

    const db = client.db(dbName);

    // -----------------------------------------------------------------------
    // 2. Create collection (silent if already exists)
    // -----------------------------------------------------------------------
    const existing = await db.listCollections({ name: "blog_posts" }).toArray();
    if (existing.length === 0) {
      await db.createCollection("blog_posts");
      console.log("✅  Created collection: blog_posts");
    } else {
      console.log("ℹ️   Collection already exists: blog_posts");
    }

    const col = db.collection("blog_posts");

    // -----------------------------------------------------------------------
    // 3. Indexes
    // -----------------------------------------------------------------------
    console.log("\n📐  Creating indexes…");

    const indexSpecs = [
      {
        key: { slug: 1 },
        options: { unique: true, name: "slug_unique" },
        label: "slug  (unique)",
      },
      {
        key: { keyword: 1 },
        options: { unique: true, name: "keyword_unique" },
        label: "keyword  (unique)",
      },
      {
        key: { published: 1, createdAt: -1 },
        options: { name: "published_date_desc" },
        label: "published + createdAt desc  (listing query)",
      },
      {
        key: { createdAt: -1 },
        options: { name: "created_at_desc" },
        label: "createdAt desc  (recent posts)",
      },
    ];

    for (const spec of indexSpecs) {
      try {
        await col.createIndex(spec.key, spec.options);
        console.log(`   ✅  ${spec.label}`);
      } catch (err) {
        // Code 85 = index already exists with same name — safe to ignore
        if (err.code === 85 || err.code === 86) {
          console.log(`   ℹ️   ${spec.label} — already exists`);
        } else {
          console.error(`   ❌  ${spec.label}:`, err.message);
        }
      }
    }

    // -----------------------------------------------------------------------
    // 4. Stats
    // -----------------------------------------------------------------------
    const total = await col.countDocuments();
    const published = await col.countDocuments({ published: true });

    console.log("\n📊  Collection stats:");
    console.log(`   Total documents  : ${total}`);
    console.log(`   Published posts  : ${published}`);

    const indexes = await col.indexes();
    console.log(`\n📋  Active indexes (${indexes.length}):`);
    for (const idx of indexes) {
      console.log(`   • ${idx.name}  →  ${JSON.stringify(idx.key)}`);
    }

    console.log("\n🎉  Database setup complete!\n");
  } catch (err) {
    console.error("❌  Setup failed:", err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

setup();
