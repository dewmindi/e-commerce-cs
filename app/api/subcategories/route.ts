
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("category_id");

  try {
    const client = await clientPromise;
    const db = client.db("cs-ecommerce");

    const filter = categoryId ? { category_id: categoryId } : {};

    const subcategories = await db.collection("subcategories").find(filter).toArray();

    console.log("SUB",subcategories);
    console.log("CLIENT:", client.constructor.name);

    

    return NextResponse.json(subcategories);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
