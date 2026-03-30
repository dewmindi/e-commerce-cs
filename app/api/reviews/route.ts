import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const MONGO_URI =
  process.env.MONGODB_URI_FOR_REVIEWS ||
  process.env.MONGODB_URI ||
  process.env.MONGODB_URI_FALLBACK;
const MONGO_DB = process.env.MONGODB_DB_FOR_REVIEWS || process.env.MONGODB_DB;

export async function GET() {
  if (!MONGO_URI || !MONGO_DB) {
    return NextResponse.json(
      { error: "Reviews DB env vars are not set", reviews: [] },
      { status: 500 }
    );
  }

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db(MONGO_DB);
    const reviews = await db.collection("reviewsupdated").find({}).sort({ _id: 1 }).toArray();

    return NextResponse.json(reviews);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch reviews", reviews: [] }, { status: 500 });
  } finally {
    await client.close();
  }
}
