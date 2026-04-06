/**
 * GET /api/blog?page=1&limit=9
 * Returns paginated list of published blog posts (no contentHtml to keep payload small).
 */

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb-products";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(24, Math.max(1, parseInt(searchParams.get("limit") ?? "9", 10)));
    const skip = (page - 1) * limit;

    const source = searchParams.get("source");

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_PRODUCTS || "cs-ecommerce");
    const col = db.collection("blog_posts");

    const filter: Record<string, unknown> = { published: true };
    if (source) {
      const escaped = source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.sourceUrl = { $regex: escaped, $options: "i" };
    }

    const [posts, total] = await Promise.all([
      col
        .find(filter, { projection: { contentHtml: 0 } }) // exclude heavy content for listing
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      col.countDocuments(filter),
    ]);

    return NextResponse.json({
      posts,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Internal Server Error", details: message }, { status: 500 });
  }
}
