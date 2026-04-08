import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(reviews);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch reviews", reviews: [] }, { status: 500 });
  }
}
