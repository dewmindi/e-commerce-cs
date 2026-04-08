/**
 * Supabase Storage utilities — replaces Cloudinary and ImageKit.
 *
 * Buckets (create these in the Supabase dashboard as PUBLIC buckets):
 *   • portfolio   — portfolio images
 *   • blog-images — blog featured images
 *
 * Server-side only (uses SUPABASE_SERVICE_ROLE_KEY which bypasses RLS).
 */

import { createClient } from "@supabase/supabase-js";

// ─── Supabase admin client (server-side) ─────────────────────────────────────

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY"
    );
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface UploadResult {
  url: string;
  storagePath: string;
}

// ─── Portfolio upload / delete ────────────────────────────────────────────────

const PORTFOLIO_BUCKET = "portfolio";

/**
 * Uploads an image buffer to the portfolio bucket.
 * Returns the public CDN URL and the storage path for future deletion.
 */
export async function uploadPortfolioImage(
  buffer: Buffer,
  originalName: string
): Promise<UploadResult> {
  const supabase = getAdminClient();
  const ext = originalName.split(".").pop()?.toLowerCase() ?? "jpg";
  const safeName = originalName
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .slice(0, 40);
  const storagePath = `${Date.now()}-${safeName}.${ext}`;

  const { error } = await supabase.storage
    .from(PORTFOLIO_BUCKET)
    .upload(storagePath, buffer, {
      contentType: mimeFromExt(ext),
      upsert: false,
    });

  if (error) throw new Error(`Portfolio upload failed: ${error.message}`);

  const { data } = supabase.storage
    .from(PORTFOLIO_BUCKET)
    .getPublicUrl(storagePath);

  return { url: data.publicUrl, storagePath };
}

/**
 * Deletes a portfolio image by its storage path.
 */
export async function deletePortfolioImage(storagePath: string): Promise<void> {
  const supabase = getAdminClient();
  const { error } = await supabase.storage
    .from(PORTFOLIO_BUCKET)
    .remove([storagePath]);
  if (error) throw new Error(`Portfolio delete failed: ${error.message}`);
}

// ─── Blog image upload ────────────────────────────────────────────────────────

const BLOG_BUCKET = "blog-images";

/**
 * Uploads a blog featured image to Supabase Storage.
 * Returns the public CDN URL and storage path.
 *
 * Replaces ImageKit for blog images.
 */
export async function uploadBlogImage(
  buffer: Buffer,
  slug: string,
  contentType = "image/jpeg"
): Promise<UploadResult & { fileId: string; width: number; height: number }> {
  const supabase = getAdminClient();
  const timestamp = Date.now();
  const ext = contentType.split("/")[1] ?? "jpg";
  const storagePath = `${slug}-${timestamp}.${ext}`;

  const { error } = await supabase.storage
    .from(BLOG_BUCKET)
    .upload(storagePath, buffer, {
      contentType,
      upsert: false,
    });

  if (error) throw new Error(`Blog image upload failed: ${error.message}`);

  const { data } = supabase.storage
    .from(BLOG_BUCKET)
    .getPublicUrl(storagePath);

  // Supabase Storage doesn't auto-extract dimensions; default to standard blog size.
  // If you need real dimensions, pipe through sharp before calling this function.
  return {
    url: data.publicUrl,
    storagePath,
    fileId: storagePath, // used as reference ID (replaces ImageKit fileId)
    width: 1200,
    height: 675,
  };
}

/**
 * Deletes a blog image by its storage path.
 */
export async function deleteBlogImage(storagePath: string): Promise<void> {
  const supabase = getAdminClient();
  const { error } = await supabase.storage
    .from(BLOG_BUCKET)
    .remove([storagePath]);
  if (error) throw new Error(`Blog image delete failed: ${error.message}`);
}

// ─── Generic uploader ────────────────────────────────────────────────────────

/**
 * Upload any buffer to any bucket. Returns public URL + storagePath.
 */
export async function uploadFile(
  bucket: string,
  storagePath: string,
  buffer: Buffer,
  contentType: string
): Promise<UploadResult> {
  const supabase = getAdminClient();
  const { error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, buffer, { contentType, upsert: true });

  if (error) throw new Error(`Upload to ${bucket} failed: ${error.message}`);

  const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
  return { url: data.publicUrl, storagePath };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function mimeFromExt(ext: string): string {
  const map: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    svg: "image/svg+xml",
    pdf: "application/pdf",
  };
  return map[ext] ?? "application/octet-stream";
}
