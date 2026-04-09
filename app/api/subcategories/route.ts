import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("category_id");

  try {
    const where = categoryId ? { categoryId } : {};
    const subcategories = await prisma.subcategory.findMany({
      where,
      orderBy: { order: "asc" },
    });
    return NextResponse.json(subcategories);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
