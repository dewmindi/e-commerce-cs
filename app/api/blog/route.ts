/**
 * GET /api/blog?page=1&limit=9&source=...
 * Returns paginated list of published blog posts (no content to keep payload small).
 */

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(24, Math.max(1, parseInt(searchParams.get("limit") ?? "9", 10)));
    const skip = (page - 1) * limit;
    const source = searchParams.get("source");

    const where = {
      published: true,
      status: "published" as const,
      ...(source ? { sourceUrl: { contains: source, mode: "insensitive" as const } } : {}),
    };

    const [posts, total] = await prisma.$transaction([
      prisma.blogPost.findMany({
        where,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          seoDescription: true,
          seoKeywords: true,
          keyword: true,
          featuredImageUrl: true,
          featuredImageWidth: true,
          featuredImageHeight: true,
          status: true,
          published: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
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
