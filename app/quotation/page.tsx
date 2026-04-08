// "use client";

import QuoteBuilderClient from "./quote-builder-client";
import { Category, PackageFromDB, Subcategory } from "@/types/quoate";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getQuoteData() {
  const [catRows, subRows, pkgRows] = await Promise.all([
    prisma.category.findMany({ orderBy: { order: "asc" } }),
    prisma.subcategory.findMany({ orderBy: { order: "asc" } }),
    prisma.package.findMany({ where: { active: true } }),
  ]);

  const categories: Category[] = catRows.map((c) => ({
    _id: c.id,
    name: c.name,
    description: c.description ?? undefined,
  }));

  const subcategories: Subcategory[] = subRows.map((s) => ({
    _id: s.id,
    category_id: s.categoryId,
    name: s.name,
    description: s.description ?? undefined,
  }));

  const packages: PackageFromDB[] = pkgRows.map((p) => ({
    _id: p.id,
    subcategory_id: p.subcategoryId,
    name: p.name,
    price: Number(p.price),
    overview: p.overview ?? undefined,
    features: p.features as any,
    is_active: p.active,
    popular: false,
  }));

  return { categories, subcategories, packages };
}

export default async function Page() {
  const data = await getQuoteData();

  return <QuoteBuilderClient {...data} />;
}