import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subcategoryId = searchParams.get("subcategory_id");

  try {
    const where = subcategoryId
      ? { subcategoryId, active: true }
      : { active: true };

    const packages = await prisma.package.findMany({
      where,
      include: { subcategory: { include: { category: true } } },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(packages);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
