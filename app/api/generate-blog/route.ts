/**
 * POST /api/generate-blog
 *
 * Automated SEO blog post generation using:
 *   - Google Gemini 2.5 Flash  → 1200-word HTML content
 *   - Gemini 2.0 Flash (image) → 16:9 feature image (base64)
 *   - ImageKit.io              → image hosting with q-80/f-auto transformation
 *   - MongoDB                  → deduplicated post storage
 *
 * Manual trigger  → body: { keyword, topic, isManual: true }
 * Cron trigger    → Authorization: Bearer <CRON_SECRET_TOKEN>  (keyword auto-selected)
 */

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import ImageKit from "@imagekit/nodejs";
import clientPromise from "@/lib/mongodb-products";

// Extend the serverless function timeout for long-running AI workflows
export const maxDuration = 300;

// ---------------------------------------------------------------------------
// Current year – ensures all generated content uses the correct year
// ---------------------------------------------------------------------------
const CURRENT_YEAR = new Date().getFullYear();

// ---------------------------------------------------------------------------
// Fallback keyword pool – used if Google Trends AU fetch fails
// ---------------------------------------------------------------------------
const FALLBACK_KEYWORDS = [
  `logo design tips for startups`,
  `why your business needs a professional website in ${CURRENT_YEAR}`,
  `mobile app development cost breakdown`,
  `graphic design trends ${CURRENT_YEAR}`,
  `ecommerce website development guide`,
  `social media branding for small businesses`,
  `custom web development vs website builders`,
  `responsive website design importance`,
  `brand identity design process`,
  `ui ux design best practices for ${CURRENT_YEAR}`,
  `how to choose a web development agency`,
  `color psychology in logo design`,
  `progressive web apps vs native mobile apps`,
  `why professional graphic design matters for your brand`,
  `digital marketing and its relationship with graphic design`,
  `wordpress vs custom web development which is right for you`,
  `mobile first design approach explained`,
  `web development stack for small businesses`,
  `importance of visual identity for startups`,
  `how to build a brand from scratch with design`,
];

// ---------------------------------------------------------------------------
// Fetch a relevant trending keyword from Google Trends – Australia (geo: AU)
// Falls back to the static pool on any error.
// ---------------------------------------------------------------------------
const TREND_SEED_KEYWORDS = [
  "graphic design",
  "web development",
  "logo design",
  "website design",
  "mobile app development",
  "social media marketing",
  "brand identity",
  "ecommerce website",
];

async function fetchAuTrendingKeyword(): Promise<string | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const googleTrends = require("google-trends-api") as {
      relatedQueries: (opts: Record<string, unknown>) => Promise<string>;
    };
    const seed =
      TREND_SEED_KEYWORDS[
        Math.floor(Math.random() * TREND_SEED_KEYWORDS.length)
      ];
    const raw = await googleTrends.relatedQueries({
      keyword: seed,
      geo: "AU",
      startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // last 7 days
    });
    const data = JSON.parse(raw) as {
      default?: {
        rankedList?: Array<{ rankedKeyword?: Array<{ query: string }> }>;
      };
    };
    const topList = data?.default?.rankedList ?? [];
    // rankedList[0] = top queries, rankedList[1] = rising queries
    for (const list of topList) {
      const queries = list.rankedKeyword ?? [];
      if (queries.length > 0) {
        const keyword = queries[0].query.trim();
        if (keyword) return keyword;
      }
    }
  } catch {
    // Google Trends fetch failed – will fall back to static pool
  }
  return null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert any string to a URL-safe slug. */
function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/** Strip HTML tags from a string (used to extract plain title from H1). */
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").trim();
}

/** Validate cron token from Authorization header. */
function isAuthorizedCronRequest(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization") ?? "";
  const cronSecret = process.env.CRON_SECRET_TOKEN;
  return !!cronSecret && authHeader === `Bearer ${cronSecret}`;
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    // -----------------------------------------------------------------------
    // 1. Determine whether this is a cron-job request
    // -----------------------------------------------------------------------
    const isCron = isAuthorizedCronRequest(req);

    // -----------------------------------------------------------------------
    // 2. Parse request body (optional for cron)
    // -----------------------------------------------------------------------
    let keyword = "";
    let topic = "";
    let isManual = false;

    try {
      const body = await req.json();
      keyword = (body.keyword ?? "").trim();
      topic = (body.topic ?? "").trim();
      isManual = !!body.isManual;
    } catch {
      // Empty body is fine for cron requests
    }

    // -----------------------------------------------------------------------
    // 3. Auto-select keyword for cron jobs (Google Trends AU → fallback pool)
    // -----------------------------------------------------------------------
    if (!keyword) {
      if (!isCron) {
        return NextResponse.json(
          { error: "keyword is required" },
          { status: 400 }
        );
      }
      const auTrend = await fetchAuTrendingKeyword();
      keyword =
        auTrend ??
        FALLBACK_KEYWORDS[
          Math.floor(Math.random() * FALLBACK_KEYWORDS.length)
        ];
      topic = keyword;
    }

    if (!topic) topic = keyword;

    const preliminarySlug = toSlug(keyword);

    // -----------------------------------------------------------------------
    // 4. Duplicate check (early – by keyword slug)
    // -----------------------------------------------------------------------
    const mongoClient = await clientPromise;
    const db = mongoClient.db(
      process.env.MONGODB_DB_PRODUCTS || "cs-ecommerce"
    );
    const collection = db.collection("blog_posts");

    const earlyDuplicate = await collection.findOne({
      $or: [{ slug: preliminarySlug }, { keyword }],
    });

    if (earlyDuplicate) {
      return NextResponse.json(
        {
          message:
            "A post with this keyword/slug already exists. Skipping to avoid SEO duplication.",
          slug: preliminarySlug,
        },
        { status: 409 }
      );
    }

    // -----------------------------------------------------------------------
    // 5. Initialise Gemini AI client
    // -----------------------------------------------------------------------
    const genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    // -----------------------------------------------------------------------
    // 6 & 8. Generate SEO blog content AND feature image in PARALLEL
    //         Image uses keyword for the prompt so it doesn't have to wait
    //         for the text result.
    // -----------------------------------------------------------------------

    const contentPrompt = `You are a senior SEO content writer for CS Graphic Meta, a professional Development Agency based in Australia that specialises in Graphic Design, Web Development, and Mobile App Development.

IMPORTANT: The current year is ${CURRENT_YEAR}. Always use ${CURRENT_YEAR} for any year-specific references in titles, headings, and content. Do NOT use any previous years (e.g. 2025 or earlier) in titles or headings.

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

    const imagePromptText =
      `Create a professional, photorealistic 16:9 blog feature image for an article about "${keyword}". ` +
      `Style: modern, clean, corporate, suitable for a development agency website. ` +
      `Incorporate subtle visual metaphors related to graphic design, web development, or mobile app development. ` +
      `No text, watermarks, or overlays in the image.`;

    // Run text generation and image generation concurrently
    const [textResult, imgResult] = await Promise.all([
      genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contentPrompt,
      }),
      genAI.models
        .generateContent({
          model: "gemini-2.0-flash-preview-image-generation",
          contents: imagePromptText,
          config: { responseModalities: ["IMAGE"] },
        })
        .catch((err) => {
          console.error("[generate-blog] Image generation failed:", err);
          return null;
        }),
    ]);

    const rawContent: string = textResult.text ?? "";

    if (!rawContent) {
      throw new Error("Gemini returned empty content.");
    }

    // Extract meta description from leading HTML comment
    const metaMatch = rawContent.match(/<!--\s*META:\s*(.*?)\s*-->/i);
    const metaDescription = metaMatch
      ? metaMatch[1].slice(0, 160)
      : `Learn about ${keyword} with expert insights from CS Graphic Meta, your trusted development agency.`;

    // Extract title text from the first <h1>
    const h1Match = rawContent.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const title = h1Match ? stripHtml(h1Match[1]) : keyword;
    const finalSlug = toSlug(title) || preliminarySlug;

    // Remove the meta comment from the stored HTML
    const contentHtml = rawContent
      .replace(/<!--\s*META:.*?-->/i, "")
      .trim();

    // -----------------------------------------------------------------------
    // 7. Second duplicate check (using title-derived slug)
    // -----------------------------------------------------------------------
    if (finalSlug !== preliminarySlug) {
      const slugDuplicate = await collection.findOne({ slug: finalSlug });
      if (slugDuplicate) {
        return NextResponse.json(
          {
            message:
              "A post with this title slug already exists. Skipping.",
            slug: finalSlug,
          },
          { status: 409 }
        );
      }
    }

    // -----------------------------------------------------------------------
    // 9. Upload image to ImageKit.io (imgResult already resolved in parallel)
    // -----------------------------------------------------------------------
    let imageKitUrl = "";

    try {
      const parts = imgResult?.candidates?.[0]?.content?.parts ?? [];
      let base64Data: string | null = null;
      let mimeType = "image/png";

      for (const part of parts) {
        if (part.inlineData?.data) {
          base64Data = part.inlineData.data;
          mimeType = part.inlineData.mimeType ?? "image/png";
          break;
        }
      }

      // -------------------------------------------------------------------
      // Upload to ImageKit.io with SEO-friendly filename
      //    @imagekit/nodejs v7: constructor only needs privateKey;
      //    upload is accessed via imagekit.files.upload()
      // -------------------------------------------------------------------
      if (base64Data) {
        const imagekit = new ImageKit({
          privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
        });

        // Construct a URL-friendly filename from the blog title (Image SEO)
        const seoFilename =
          toSlug(title).substring(0, 100) +
          (mimeType === "image/jpeg" ? ".jpg" : ".png");

        const uploadResponse = await imagekit.files.upload({
          file: `data:${mimeType};base64,${base64Data}`,
          fileName: seoFilename,
          folder: "/blog/featured-images",
          useUniqueFileName: false,
          overwriteFile: true,
        });

        // Append ImageKit URL transformation parameters:
        //   q-80   → compress to 80% quality
        //   f-auto → serve in best format (WebP/AVIF) per browser
        if (uploadResponse.url) {
          imageKitUrl = `${uploadResponse.url}?tr=q-80,f-auto`;
        }
      }
    } catch (imgError) {
      // Image generation / upload is non-blocking – log and continue
      console.error(
        "[generate-blog] Image generation or ImageKit upload failed:",
        imgError
      );
    }

    // -----------------------------------------------------------------------
    // 10. Save post to MongoDB
    // -----------------------------------------------------------------------
    const postDoc = {
      title,
      slug: finalSlug,
      keyword,
      contentHtml,
      metaDescription,
      imageKitUrl,
      published: true,
      createdAt: new Date(),
    };

    await collection.insertOne(postDoc);

    // -----------------------------------------------------------------------
    // 11. Respond
    //     Manual → return full post data;  Cron → return lightweight message
    // -----------------------------------------------------------------------
    if (isManual) {
      return NextResponse.json(
        { success: true, post: postDoc },
        { status: 201 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Blog post "${title}" generated and saved successfully.`,
      slug: finalSlug,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    console.error("[generate-blog] Fatal error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: message },
      { status: 500 }
    );
  }
}
