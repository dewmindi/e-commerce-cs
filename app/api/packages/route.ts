import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subcategoryId = searchParams.get("subcategory_id");

  try {
    const client = await clientPromise;
    const db = client.db("cs-ecommerce");

    const filter = subcategoryId ? { subcategory_id: subcategoryId } : {};

    const packages = await db.collection("packages").find(filter).toArray();

   

    return NextResponse.json(packages);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
