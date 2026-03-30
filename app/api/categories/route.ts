
// import clientPromise from "@/lib/mongodb";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("cs-ecommerce");

//     const categories = await db.collection("categories").find().toArray();
    


//     return NextResponse.json(categories);
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    console.log("🔍 Connecting to Mongo…");
    const client = await clientPromise;

    console.log("🔍 Selecting DB…");
    const db = client.db(process.env.MONGODB_DB_PRODUCTS || "cs-ecommerce");

    console.log("🔍 Fetching categories collection…");
    const categories = await db.collection("categories").find({}).toArray();

    console.log("✅ Categories fetched:", categories.length);

    return NextResponse.json(categories);
  } catch (error) {
    console.error("❌ API Error at /api/categories:", error);
    const details = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Internal Server Error", details }, { status: 500 });
  }
}
