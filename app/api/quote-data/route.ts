import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export const revalidate = 3600; // 1 hour
export const tags = ["quote-data"];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("cs-ecommerce");

    const [categories, subcategories, packages] = await Promise.all([
      db.collection("categories").find({}).toArray(),
      db.collection("subcategories").find({}).toArray(),
      db.collection("packages").find({}).toArray()
    ]);

    return NextResponse.json({
      categories,
      subcategories,
      packages
    });

  } catch (error: any) {
    console.error("QUOTE DATA API ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}