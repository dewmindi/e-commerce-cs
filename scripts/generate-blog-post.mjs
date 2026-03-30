/**
 * scripts/generate-blog-post.mjs
 *
 * Manually generate a single SEO blog post.
 * Runs standalone — no dev server required.
 *
 * Usage:
 *   npm run blog:generate
 *   npm run blog:generate -- --keyword "logo design tips for startups"
 *   npm run blog:generate -- --keyword "web development" --topic "custom web development"
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";
import { GoogleGenAI } from "@google/genai";
import ImageKit from "@imagekit/nodejs";

// ---------------------------------------------------------------------------
// Parse .env
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
// CLI args  --keyword "..." --topic "..."
// ---------------------------------------------------------------------------
function parseArgs() {
  const args = process.argv.slice(2);
  const result = { keyword: "", topic: "" };
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--keyword" && args[i + 1]) result.keyword = args[++i];
    if (args[i] === "--topic"   && args[i + 1]) result.topic   = args[++i];
  }
  return result;
}

// ---------------------------------------------------------------------------
// Keyword pool (same as API route)
// ---------------------------------------------------------------------------
const TRENDING_KEYWORDS = [
  "logo design tips for startups",
  "why your business needs a professional website",
  "mobile app development cost breakdown",
  "graphic design trends 2025",
  "ecommerce website development guide",
  "social media branding for small businesses",
  "custom web development vs website builders",
  "responsive website design importance",
  "brand identity design process",
  "ui ux design best practices",
  "how to choose a web development agency",
  "color psychology in logo design",
  "progressive web apps vs native mobile apps",
  "why professional graphic design matters for your brand",
  "digital marketing and its relationship with graphic design",
  "wordpress vs custom web development which is right for you",
  "mobile first design approach explained",
  "web development stack for small businesses",
  "importance of visual identity for startups",
  "how to build a brand from scratch with design",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, "").trim();
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
(async () => {
  const { keyword: cliKeyword, topic: cliTopic } = parseArgs();

  let keyword = cliKeyword || TRENDING_KEYWORDS[Math.floor(Math.random() * TRENDING_KEYWORDS.length)];
  let topic   = cliTopic   || keyword;

  const DB_URI    = process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI_PRODUCTS
    : process.env.MONGODB_DB_URI_PRODUCTS_DEV;
  const DB_NAME   = process.env.MONGODB_DB_PRODUCTS ?? "cs-ecommerce";

  console.log("╔════════════════════════════════════════════════════╗");
  console.log("║   CS Graphic Meta – Manual Blog Generator          ║");
  console.log("╚════════════════════════════════════════════════════╝");
  console.log(`  Keyword : ${keyword}`);
  console.log(`  Topic   : ${topic}`);
  console.log(`  DB      : ${DB_NAME}\n`);

  // ─── 1. Connect MongoDB ───────────────────────────────────────────────────
  process.stdout.write("🔌  Connecting to MongoDB…  ");
  const client = new MongoClient(DB_URI, { tls: true });
  await client.connect();
  console.log("✅");

  const db         = client.db(DB_NAME);
  const collection = db.collection("blog_posts");

  // ─── 2. Duplicate check ───────────────────────────────────────────────────
  const preliminarySlug = toSlug(keyword);
  const existing = await collection.findOne({
    $or: [{ slug: preliminarySlug }, { keyword }],
  });

  if (existing) {
    console.log(`\n⚠️   A post with this keyword/slug already exists:`);
    console.log(`    Title : ${existing.title}`);
    console.log(`    Slug  : ${existing.slug}`);
    console.log("    Use a different --keyword to generate a new post.\n");
    await client.close();
    process.exit(0);
  }

  // ─── 3. Init Gemini ───────────────────────────────────────────────────────
  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  // ─── 4. Generate content ──────────────────────────────────────────────────
  process.stdout.write("✍️   Generating blog content (Gemini 2.5 Flash)…  ");
  const startText = Date.now();

  const contentPrompt = `You are a senior SEO content writer for CS Graphic Meta, a professional Development Agency based in Australia that specialises in Graphic Design, Web Development, and Mobile App Development.

Write a comprehensive, SEO-optimised blog post targeting the keyword: "${keyword}"
Topic context: "${topic}"

STRICT FORMATTING RULES (follow exactly):
1. Output ONLY valid HTML — no markdown, no code fences, no extra explanation.
2. The very first line must be an HTML comment with the meta description:
   <!-- META: A compelling 155-character meta description about ${keyword} for CS Graphic Meta. -->
3. Wrap the ENTIRE post in a single <article> tag.
4. Inside <article>, the FIRST element must be <h1>Your SEO Optimised Title Here</h1>.
5. Include several <h2> and <h3> subheadings to structure the content.
6. The post must be AT LEAST 1200 words using <p> tags for all paragraphs.
7. The writing tone must be professional, authoritative, and reader-friendly.
8. End the article with:
   a) A "Call to Action" <section> mentioning CS Graphic Meta's services.
   b) A <script type="application/ld+json"> block with an FAQPage JSON-LD schema containing at least 3 FAQs.
9. Do NOT include <html>, <head>, or <body> wrapper tags.`;

  const textResult = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contentPrompt,
  });

  const rawContent = textResult.text ?? "";
  if (!rawContent) throw new Error("Gemini returned empty content.");
  console.log(`✅  (${((Date.now() - startText) / 1000).toFixed(1)}s)`);

  // Extract meta + title
  const metaMatch       = rawContent.match(/<!--\s*META:\s*(.*?)\s*-->/i);
  const metaDescription = metaMatch
    ? metaMatch[1].slice(0, 160)
    : `Learn about ${keyword} with expert insights from CS Graphic Meta.`;

  const h1Match   = rawContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title     = h1Match ? stripHtml(h1Match[1]) : keyword;
  const finalSlug = toSlug(title) || preliminarySlug;
  const contentHtml = rawContent.replace(/<!--\s*META:.*?-->/i, "").trim();

  // Second duplicate check on title-derived slug
  if (finalSlug !== preliminarySlug) {
    const slugDup = await collection.findOne({ slug: finalSlug });
    if (slugDup) {
      console.log(`\n⚠️   A post with slug "${finalSlug}" already exists. Skipping.\n`);
      await client.close();
      process.exit(0);
    }
  }

  // ─── 5. Generate feature image ────────────────────────────────────────────
  let imageKitUrl = "";

  try {
    process.stdout.write("🎨  Generating feature image (Gemini 2.5 Flash Image)…  ");
    const startImg = Date.now();

    const imagePrompt =
      `Create a professional, photorealistic 16:9 blog feature image for an article titled "${title}". ` +
      `The image should evoke themes of ${keyword}. ` +
      `Style: modern, clean, corporate, suitable for a development agency website. ` +
      `Incorporate subtle visual metaphors related to graphic design, web development, or mobile apps. ` +
      `No text, watermarks, or overlays in the image.`;

    const imgResult = await genAI.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: imagePrompt,
      config: { responseModalities: ["IMAGE"] },
    });

    const parts = imgResult.candidates?.[0]?.content?.parts ?? [];
    let base64Data = null;
    let mimeType   = "image/png";

    for (const part of parts) {
      if (part.inlineData?.data) {
        base64Data = part.inlineData.data;
        mimeType   = part.inlineData.mimeType ?? "image/png";
        break;
      }
    }

    if (base64Data) {
      const imagekit   = new ImageKit({ privateKey: process.env.IMAGEKIT_PRIVATE_KEY });
      const seoFilename = toSlug(title).substring(0, 100) + (mimeType === "image/jpeg" ? ".jpg" : ".png");

      const uploadResponse = await imagekit.files.upload({
        file: `data:${mimeType};base64,${base64Data}`,
        fileName: seoFilename,
        folder: "/blog/featured-images",
        useUniqueFileName: false,
        overwriteFile: true,
      });

      if (uploadResponse.url) {
        imageKitUrl = `${uploadResponse.url}?tr=q-80,f-auto`;
      }
    }
    console.log(`✅  (${((Date.now() - startImg) / 1000).toFixed(1)}s)`);
  } catch (imgErr) {
    console.log("⚠️   (image skipped — continuing without)");
    console.error("    Detail:", imgErr.message);
  }

  // ─── 6. Save to MongoDB ───────────────────────────────────────────────────
  process.stdout.write("💾  Saving to MongoDB…  ");

  await collection.insertOne({
    title,
    slug: finalSlug,
    keyword,
    contentHtml,
    metaDescription,
    imageKitUrl,
    published: true,
    createdAt: new Date(),
  });

  console.log("✅");
  await client.close();

  // ─── 7. Summary ───────────────────────────────────────────────────────────
  const wordCount = contentHtml
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  console.log("\n╔════════════════════════════════════════════════════╗");
  console.log("║   🎉  Blog post published!                          ║");
  console.log("╚════════════════════════════════════════════════════╝");
  console.log(`  Title       : ${title}`);
  console.log(`  Slug        : ${finalSlug}`);
  console.log(`  Words       : ~${wordCount}`);
  console.log(`  Meta        : ${metaDescription.slice(0, 80)}…`);
  console.log(`  Image       : ${imageKitUrl || "(none)"}`);
  console.log(`  Live URL    : ${process.env.NEXT_PUBLIC_BASE_URL ?? "https://csgraphicmeta.com.au"}/blog/${finalSlug}`);
  console.log();
})().catch((err) => {
  console.error("\n❌  Generation failed:", err.message);
  process.exit(1);
});
