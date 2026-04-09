// "use client";

import QuoteBuilderClient from "./quote-builder-client";
import { Category, PackageFromDB, Subcategory } from "@/types/quoate";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getQuoteData() {
  const [serviceRows, subServiceRows, pkgRows] = await Promise.all([
    prisma.service.findMany({ where: { active: true }, orderBy: { name: "asc" } }),
    prisma.subService.findMany({ where: { active: true }, orderBy: { name: "asc" } }),
    prisma.servicePackage.findMany({ where: { active: true } }),
  ]);

  const categories: Category[] = serviceRows.map((c: { id: string; name: string; description: string | null }) => ({
    _id: c.id,
    name: c.name,
    description: c.description ?? undefined,
  }));

  const subcategories: Subcategory[] = subServiceRows.map((s: { id: string; serviceId: string; name: string; description: string | null }) => ({
    _id: s.id,
    category_id: s.serviceId,
    name: s.name,
    description: s.description ?? undefined,
  }));

  const packages: PackageFromDB[] = pkgRows.map((p) => ({
    _id: p.id,
    subcategory_id: p.subServiceId,
    name: p.name,
    price: Number(p.price),
    overview: p.description ?? undefined,
    features: p.features as any,
    quotation: (p as any).quotationFeatures as any,
    is_active: p.active,
    popular: p.popular,
  }));

  return { categories, subcategories, packages };
}

export default async function Page() {
  const data = await getQuoteData();

  return <QuoteBuilderClient {...data} />;
}