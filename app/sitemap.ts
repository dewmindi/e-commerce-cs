import { MetadataRoute } from "next";
import clientPromise from "@/lib/mongodb-products";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://csgraphicmeta.com.au";

// Static routes with their SEO priority and change frequency
const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
  { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/logo-design`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE_URL}/banner-poster-design`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE_URL}/business-card`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE_URL}/book-magazine-design`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/cooperate-profile-design`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/email-signature-design`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/label-design`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/leaflet-design`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/letter-head-design`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/social-media`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/social-media-growth`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/social-media-management`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  { url: `${BASE_URL}/web-development`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE_URL}/custom-web-development`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE_URL}/e-commerce-websites`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/reviews`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  { url: `${BASE_URL}/quotation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
];

async function getBlogSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_PRODUCTS || "cs-ecommerce");
    const posts = await db
      .collection("blog_posts")
      .find({ published: true }, { projection: { slug: 1, updatedAt: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .toArray();

    return posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? post.createdAt ?? new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // If DB is unavailable during build, return empty list gracefully
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogEntries = await getBlogSitemapEntries();
  return [...staticRoutes, ...blogEntries];
}
