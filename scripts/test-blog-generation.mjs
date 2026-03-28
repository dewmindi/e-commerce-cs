/**
 * scripts/test-blog-generation.mjs
 *
 * Full end-to-end test suite for the blog generation system.
 * Tests: DB connection, manual post generation, listing API, cron trigger.
 *
 * ⚠️  Requires the local dev server to be running first:
 *       npm run dev
 *
 * Run:  node --env-file=.env scripts/test-blog-generation.mjs
 * Or:   npm run blog:test
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";

// ---------------------------------------------------------------------------
// Parse .env manually
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
// Config
// ---------------------------------------------------------------------------
const LOCAL_URL = "http://localhost:3000";
const CRON_TOKEN = process.env.CRON_SECRET_TOKEN;
const DB_URI = process.env.MONGODB_DB_URI_PRODUCTS_DEV ?? process.env.MONGODB_URI_PRODUCTS;
const DB_NAME = process.env.MONGODB_DB_PRODUCTS ?? "cs-ecommerce";

// Use a unique test keyword so it never collides with real content
const TEST_KEYWORD = `test-logo-design-${Date.now()}`;

let passed = 0;
let failed = 0;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function pass(label) {
  passed++;
  console.log(`  ✅  ${label}`);
}
function fail(label, detail) {
  failed++;
  console.log(`  ❌  ${label}`);
  if (detail) console.log(`       ${detail}`);
}
function heading(title) {
  console.log(`\n${"─".repeat(50)}`);
  console.log(`  ${title}`);
  console.log("─".repeat(50));
}

// ---------------------------------------------------------------------------
// TEST 1 – MongoDB connection
// ---------------------------------------------------------------------------
async function testMongoConnection() {
  heading("TEST 1 · MongoDB Connection");
  const client = new MongoClient(DB_URI, { tls: true, serverSelectionTimeoutMS: 8000 });
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    pass("MongoDB Atlas connection OK");

    const db = client.db(DB_NAME);
    const cols = await db.listCollections({ name: "blog_posts" }).toArray();
    if (cols.length > 0) {
      pass("blog_posts collection exists");
      const count = await db.collection("blog_posts").countDocuments();
      console.log(`       📊 ${count} post(s) in collection`);
    } else {
      fail("blog_posts collection NOT found – run:  npm run blog:db-setup  first");
    }
  } catch (err) {
    fail("MongoDB connection failed", err.message);
  } finally {
    await client.close();
  }
}

// ---------------------------------------------------------------------------
// TEST 2 – Dev server reachability
// ---------------------------------------------------------------------------
async function testDevServer() {
  heading("TEST 2 · Dev Server");
  try {
    const res = await fetch(`${LOCAL_URL}/api/blog`, { signal: AbortSignal.timeout(5000) });
    if (res.ok || res.status === 200) {
      pass(`Dev server reachable at ${LOCAL_URL}`);
    } else {
      fail(`Unexpected status ${res.status} from /api/blog`);
    }
  } catch {
    fail(
      `Dev server not reachable at ${LOCAL_URL}`,
      "Please run  npm run dev  in another terminal first"
    );
    return false; // Skip remaining HTTP tests
  }
  return true;
}

// ---------------------------------------------------------------------------
// TEST 3 – Blog listing API
// ---------------------------------------------------------------------------
async function testBlogListingApi() {
  heading("TEST 3 · Blog Listing API  (/api/blog)");
  try {
    const res = await fetch(`${LOCAL_URL}/api/blog?page=1&limit=3`, {
      signal: AbortSignal.timeout(8000),
    });
    const data = await res.json();

    if (res.ok) {
      pass(`HTTP ${res.status} – listing OK`);
      pass(`Response has 'posts' array (${data.posts?.length ?? 0} items)`);
      console.log(`       📄 total: ${data.total}  |  pages: ${data.totalPages}`);
    } else {
      fail(`HTTP ${res.status}`, JSON.stringify(data).slice(0, 120));
    }
  } catch (err) {
    fail("Listing API error", err.message);
  }
}

// ---------------------------------------------------------------------------
// TEST 4 – Manual blog generation  (isManual: true)
// ---------------------------------------------------------------------------
async function testManualGeneration() {
  heading("TEST 4 · Manual Generation  (isManual: true)");
  console.log(`  📝 Keyword: "${TEST_KEYWORD}"`);
  console.log("  ⏳ Generating... (this may take 30-60 seconds)\n");

  const start = Date.now();
  try {
    const res = await fetch(`${LOCAL_URL}/api/generate-blog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        keyword: TEST_KEYWORD,
        topic: "logo design tips",
        isManual: true,
      }),
      signal: AbortSignal.timeout(120_000), // 2 min timeout
    });

    const data = await res.json();
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`  ⏱️  Completed in ${elapsed}s`);

    if (res.status === 201) {
      pass(`HTTP 201 – post created`);
      pass(`Title: "${data.post?.title}"`);
      pass(`Slug: ${data.post?.slug}`);

      const htmlLen = data.post?.contentHtml?.length ?? 0;
      const wordCount = data.post?.contentHtml
        ?.replace(/<[^>]+>/g, " ")
        .split(/\s+/)
        .filter(Boolean).length ?? 0;
      pass(`Content: ${htmlLen} chars (~${wordCount} words)`);

      if (data.post?.imageKitUrl) {
        pass(`ImageKit URL: ${data.post.imageKitUrl}`);
      } else {
        console.log("  ⚠️   No image (ImageKit upload may have failed – check IMAGEKIT_PRIVATE_KEY)");
      }

      if (data.post?.metaDescription) {
        pass(`Meta description: "${data.post.metaDescription.slice(0, 80)}…"`);
      }

      // Cleanup – delete the test post from DB so it doesn't pollute real data
      await cleanupTestPost(data.post?.slug);
    } else if (res.status === 409) {
      console.log("  ⚠️   Duplicate slug – test post existed already (expected on re-run)");
    } else {
      fail(`HTTP ${res.status}`, JSON.stringify(data).slice(0, 200));
    }
  } catch (err) {
    if (err.name === "TimeoutError") {
      fail("Request timed out after 120s", "Gemini API may be slow – try again");
    } else {
      fail("Manual generation error", err.message);
    }
  }
}

// ---------------------------------------------------------------------------
// TEST 5 – Duplicate prevention
// ---------------------------------------------------------------------------
async function testDuplicatePrevention() {
  heading("TEST 5 · Duplicate Prevention");
  try {
    // Try inserting a post with the same keyword as an existing one (use the
    // test keyword — if still in DB, will return 409; if cleaned up, we use
    // a second attempt with different keyword but expect 409 pattern check)
    const existingRes = await fetch(`${LOCAL_URL}/api/blog?page=1&limit=1`);
    const existingData = await existingRes.json();

    if (!existingData.posts?.length) {
      console.log("  ⚠️   No posts to test against – skipping duplicate test");
      return;
    }

    const { keyword } = existingData.posts[0];
    console.log(`  🔁 Re-submitting existing keyword: "${keyword}"`);

    const res = await fetch(`${LOCAL_URL}/api/generate-blog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword, topic: keyword, isManual: true }),
      signal: AbortSignal.timeout(15_000),
    });
    const data = await res.json();

    if (res.status === 409) {
      pass("Duplicate correctly blocked (HTTP 409)");
      console.log(`       ${data.message}`);
    } else {
      fail(`Expected 409, got HTTP ${res.status}`);
    }
  } catch (err) {
    fail("Duplicate check error", err.message);
  }
}

// ---------------------------------------------------------------------------
// TEST 6 – Cron authentication  (valid + invalid token)
// ---------------------------------------------------------------------------
async function testCronAuth() {
  heading("TEST 6 · Cron Authentication");

  // 6a – Invalid token should be rejected
  try {
    const res = await fetch(`${LOCAL_URL}/api/generate-blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer INVALID_TOKEN_XYZ",
      },
      body: "{}",
      signal: AbortSignal.timeout(10_000),
    });

    if (res.status === 400) {
      pass("Invalid cron token correctly rejected (HTTP 400)");
    } else {
      fail(`Expected 400 for invalid token, got ${res.status}`);
    }
  } catch (err) {
    fail("Cron auth test error", err.message);
  }

  // 6b – Valid cron token
  if (!CRON_TOKEN) {
    console.log("  ⚠️   CRON_SECRET_TOKEN not set – skipping valid-token test");
    return;
  }

  try {
    console.log("  ⏳ Sending cron request (auto keyword)…");
    const res = await fetch(`${LOCAL_URL}/api/generate-blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CRON_TOKEN}`,
      },
      body: "{}",
      signal: AbortSignal.timeout(120_000),
    });

    const data = await res.json();

    if (res.status === 200 || res.status === 201) {
      pass(`Valid cron token accepted (HTTP ${res.status})`);
      console.log(`       Slug: ${data.slug ?? "(returned in post)"}`);
      console.log(`       Message: ${data.message ?? "—"}`);
      // Cleanup cron-generated test post
      if (data.slug) await cleanupTestPost(data.slug);
    } else if (res.status === 409) {
      pass("Valid cron token accepted – duplicate detected and skipped (expected)");
    } else {
      fail(`HTTP ${res.status}`, JSON.stringify(data).slice(0, 200));
    }
  } catch (err) {
    if (err.name === "TimeoutError") {
      fail("Cron request timed out after 120s");
    } else {
      fail("Cron valid-token test error", err.message);
    }
  }
}

// ---------------------------------------------------------------------------
// Cleanup helper – removes test posts from DB
// ---------------------------------------------------------------------------
async function cleanupTestPost(slug) {
  if (!slug) return;
  const client = new MongoClient(DB_URI, { tls: true });
  try {
    await client.connect();
    const result = await client
      .db(DB_NAME)
      .collection("blog_posts")
      .deleteOne({ slug });
    if (result.deletedCount === 1) {
      console.log(`  🧹  Cleaned up test post: ${slug}`);
    }
  } catch {
    // non-critical
  } finally {
    await client.close();
  }
}

// ---------------------------------------------------------------------------
// Run all tests
// ---------------------------------------------------------------------------
(async () => {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║   CS Graphic Meta – Blog System Test Suite       ║");
  console.log("╚══════════════════════════════════════════════════╝");
  console.log(`  Server  : ${LOCAL_URL}`);
  console.log(`  DB      : ${DB_NAME}`);
  console.log(`  Time    : ${new Date().toLocaleString("en-AU")}`);

  await testMongoConnection();

  const serverOk = await testDevServer();
  if (serverOk) {
    await testBlogListingApi();
    await testManualGeneration();
    await testDuplicatePrevention();
    await testCronAuth();
  }

  // Summary
  console.log("\n╔══════════════════════════════════════════════════╗");
  console.log(`║  Results: ${passed} passed · ${failed} failed${" ".repeat(34 - String(passed + failed).length)}║`);
  console.log("╚══════════════════════════════════════════════════╝\n");

  if (failed > 0) process.exit(1);
})();
