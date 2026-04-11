/**
 * POST /api/blog/generate-image
 *
 * Generates a blog header image with Gemini Imagen 4 and stores it in
 * Supabase Storage (blog-images bucket).
 *
 * Body:
 *   title    string   – post title (used to build the image prompt)
 *   content? string   – post HTML/markdown (optional context)
 *   prompt?  string   – custom image prompt (overrides auto generation)
 *   postId?  string   – if provided, updates BlogPost.featuredImageUrl in DB
 *
 * Response: { url: string, storagePath: string }
 */

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import prisma from "@/lib/prisma";

// Allow up to 5 minutes for AI image generation
export const maxDuration = 300;

// ── helpers ──────────────────────────────────────────────────────────────────

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

// ── Build an image prompt with Gemini text when none is provided ─────────────

async function buildImagePrompt(
  genAI: GoogleGenAI,
  title: string,
  content?: string
): Promise<string> {
  const snippet = content ? stripHtml(content).slice(0, 600) : "";
  const contextBlock = snippet
    ? `\n\nPost excerpt:\n"${snippet}"`
    : "";

  const systemPrompt = `You are an art director writing image prompts for an AI image generator.
Given a blog post title and optional content, write a single, highly detailed image generation prompt.

Rules:
- Photorealistic style, 16:9 landscape orientation
- NO text, NO logos, NO watermarks
- Vivid natural lighting, professional photography quality
- The scene must directly represent the blog topic
- Describe: subject, setting, mood, colours, camera angle
- Return ONLY the image prompt — nothing else, no quotes

Blog title: "${title}"${contextBlock}`;

  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: systemPrompt,
    config: { temperature: 0.7, maxOutputTokens: 256 },
  });
  return response.text?.trim() ?? `Photorealistic professional photograph related to: ${title}`;
}

// ── Imagen 4 generation → base64 ────────────────────────────────────────────

async function generateImageBase64(
  genAI: GoogleGenAI,
  prompt: string
): Promise<string> {
  const models = ["imagen-4.0-generate-001", "imagen-4.0-fast-generate-001"];

  for (const model of models) {
    try {
      console.log(`[generate-image] Trying ${model}…`);
      const response = await genAI.models.generateImages({
        model,
        prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: "image/jpeg",
          aspectRatio: "16:9",
        },
      });
      const imageBytes = response.generatedImages?.[0]?.image?.imageBytes;
      if (!imageBytes) continue;

      if (typeof imageBytes === "string") return imageBytes;
      return Buffer.from(imageBytes as Uint8Array).toString("base64");
    } catch (err) {
      console.warn(
        `[generate-image] ${model} failed:`,
        err instanceof Error ? err.message.slice(0, 120) : err
      );
    }
  }

  // Pollinations AI fallback — free, no API key needed
  try {
    console.log("[generate-image] Trying Pollinations fallback…");
    const encoded = encodeURIComponent(prompt.slice(0, 300));
    const r = await fetch(
      `https://image.pollinations.ai/prompt/${encoded}?width=1200&height=675&nologo=true&seed=${Date.now()}`,
      { signal: AbortSignal.timeout(90_000) }
    );
    if (r.ok) {
      console.log("[generate-image] Image via Pollinations fallback");
      return Buffer.from(await r.arrayBuffer()).toString("base64");
    }
    console.warn(`[generate-image] Pollinations returned HTTP ${r.status}`);
  } catch (pollErr) {
    console.warn("[generate-image] Pollinations fallback failed:", pollErr);
  }

  throw new Error("All image generation methods failed");
}

// ── Upload to Supabase Storage ───────────────────────────────────────────────

async function uploadToSupabase(
  base64: string,
  slug: string
): Promise<{ url: string; storagePath: string }> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    throw new Error("Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY");
  }

  const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
  const buffer = Buffer.from(base64, "base64");
  const storagePath = `${slug}-${Date.now()}.jpg`;

  const { error } = await supabase.storage
    .from("blog-images")
    .upload(storagePath, buffer, { contentType: "image/jpeg", upsert: false });

  if (error) throw new Error(`Supabase upload failed: ${error.message}`);

  const { data } = supabase.storage.from("blog-images").getPublicUrl(storagePath);
  return { url: data.publicUrl, storagePath };
}

// ── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const {
      title,
      content,
      prompt: customPrompt,
      postId,
    } = body as {
      title?: string;
      content?: string;
      prompt?: string;
      postId?: string;
    };

    if (!title?.trim() && !customPrompt?.trim()) {
      return NextResponse.json(
        { error: "Either title or prompt is required" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenAI({ apiKey });

    // Build or use the image prompt
    const imagePrompt = customPrompt?.trim()
      || (await buildImagePrompt(genAI, title!.trim(), content));

    console.log(`[generate-image] Prompt: "${imagePrompt.slice(0, 120)}…"`);

    // Generate image
    const base64 = await generateImageBase64(genAI, imagePrompt);

    // Upload to Supabase
    const slug = toSlug(title?.trim() ?? "blog-image");
    const result = await uploadToSupabase(base64, slug);

    // Update the blog post in DB if postId is provided
    if (postId?.trim()) {
      try {
        await prisma.blogPost.update({
          where: { id: postId },
          data: { featuredImageUrl: result.url, featuredImagePath: result.storagePath },
        });
        console.log(`[generate-image] DB updated for post ${postId}`);
      } catch (dbErr) {
        console.warn(
          `[generate-image] DB update failed (non-fatal):`,
          dbErr instanceof Error ? dbErr.message : dbErr
        );
      }
    }

    console.log(`[generate-image] Done → ${result.url}`);
    return NextResponse.json({ url: result.url, storagePath: result.storagePath });
  } catch (error) {
    console.error("[generate-image] Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Image generation failed", details: message }, { status: 500 });
  }
}
