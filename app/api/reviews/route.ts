import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGODB_URI; // add your Mongo URI in .env

export async function GET() {
  if (!MONGO_URI) return NextResponse.json({ error: "Mongo URI not set" }, { status: 500 });

  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("cs-graphic-meta-db");
    const reviews = await db.collection("reviewsupdated").find({}).sort({ _id: 1 }).toArray();

    return NextResponse.json(reviews);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  } finally {
    await client.close();
  }
}
