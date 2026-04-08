
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      include: { subcategories: { orderBy: { order: "asc" } } },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("❌ API Error at /api/categories:", error);
    const details = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Internal Server Error", details }, { status: 500 });
  }
}
