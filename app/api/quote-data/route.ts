import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const revalidate = 3600; // 1 hour
export const tags = ["quote-data"];

export async function GET() {
  try {
    const [categories, subcategories, packages] = await Promise.all([
      prisma.category.findMany({ orderBy: { order: "asc" } }),
      prisma.subcategory.findMany({ orderBy: { order: "asc" } }),
      prisma.package.findMany({ where: { active: true } }),
    ]);

    return NextResponse.json({
      categories,
      subcategories,
      packages,
    });
  } catch (error: any) {
    console.error("QUOTE DATA API ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}