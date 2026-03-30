// "use client";

import QuoteBuilderClient from "./quote-builder-client";
import { Category, PackageFromDB, Subcategory } from "@/types/quoate";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

async function getQuoteData() {
  const client = await clientPromise;
  const db = client.db("cs-ecommerce");

  const [categories, subcategories, packages] = await Promise.all([
    db.collection("categories").find({}).toArray() as unknown as Promise<Category[]>,
    db.collection("subcategories").find({}).toArray() as unknown as Promise<Subcategory[]>,
    db.collection("packages").find({}).toArray() as unknown as Promise<PackageFromDB[]>,
  ]);

  return { categories, subcategories, packages };
}

export default async function Page() {
  const data = await getQuoteData();

  return <QuoteBuilderClient {...data} />;
}