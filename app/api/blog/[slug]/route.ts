/**
 * GET /api/blog/[slug]
 * Returns a single published blog post including its full HTML content.
 */

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb-products";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_PRODUCTS || "cs-ecommerce");
    const post = await db
      .collection("blog_posts")
      .findOne({ slug, published: true });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Internal Server Error", details: message }, { status: 500 });
  }
}
