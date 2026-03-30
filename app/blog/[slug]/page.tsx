import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import FooterNew from "@/components/FooterNew";
import clientPromise from "@/lib/mongodb-products";
import { Calendar, Tag, ArrowLeft, Share2 } from "lucide-react";

// --------------------------------------------------------------------------
// Types
// --------------------------------------------------------------------------
interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  keyword: string;
  contentHtml: string;
  metaDescription: string;
  imageKitUrl: string;
  createdAt: string;
  published: boolean;
}

// --------------------------------------------------------------------------
// Data helpers
// --------------------------------------------------------------------------
async function getPost(slug: string): Promise<BlogPost | null> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB_PRODUCTS || "cs-ecommerce");
  const raw = await db.collection("blog_posts").findOne({ slug, published: true });
  if (!raw) return null;
  return {
    ...raw,
    _id: raw._id.toString(),
    createdAt: raw.createdAt?.toISOString?.() ?? raw.createdAt,
  } as BlogPost;
}

interface RelatedPost {
  _id: string;
  title: string;
  slug: string;
  imageKitUrl: string;
  createdAt: string;
}

async function getRelatedPosts(keyword: string, currentSlug: string, limit = 3): Promise<RelatedPost[]> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB_PRODUCTS || "cs-ecommerce");
  const words = keyword.split(" ").slice(0, 2).join("|");
  const rawPosts = await db
    .collection("blog_posts")
    .find(
      {
        published: true,
        slug: { $ne: currentSlug },
        $or: [
          { keyword: { $regex: words, $options: "i" } },
          { title: { $regex: words, $options: "i" } },
        ],
      },
      { projection: { contentHtml: 0 } }
    )
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
  return rawPosts.map((p) => ({
    _id: p._id.toString(),
    title: (p.title as string) ?? "",
    slug: (p.slug as string) ?? "",
    imageKitUrl: (p.imageKitUrl as string) ?? "",
    createdAt: p.createdAt?.toISOString?.() ?? p.createdAt,
  }));
}

// --------------------------------------------------------------------------
// generateStaticParams – pre-build known slugs at build time
// --------------------------------------------------------------------------
export async function generateStaticParams() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_PRODUCTS || "cs-ecommerce");
    const posts = await db
      .collection("blog_posts")
      .find({ published: true }, { projection: { slug: 1 } })
      .toArray();
    return posts.map((p) => ({ slug: p.slug as string }));
  } catch {
    return [];
  }
}

// --------------------------------------------------------------------------
// generateMetadata – dynamic SEO per post
// --------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | CS Graphic Meta",
      description: "This article could not be found.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://csgraphicmeta.com.au";
  const canonical = `${baseUrl}/blog/${post.slug}`;
  const ogImage = post.imageKitUrl || `${baseUrl}/og-default.jpg`;

  return {
    title: `${post.title} | CS Graphic Meta Blog`,
    description: post.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: canonical,
      type: "article",
      publishedTime: post.createdAt,
      authors: ["CS Graphic Meta"],
      siteName: "CS Graphic Meta",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function estimateReadTime(html: string) {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function toTitleCase(str: string) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

// --------------------------------------------------------------------------
// Page
// --------------------------------------------------------------------------
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const related = await getRelatedPosts(post.keyword, post.slug);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://csgraphicmeta.com.au";
  const canonical = `${baseUrl}/blog/${post.slug}`;
  const readTime = estimateReadTime(post.contentHtml);

  // JSON-LD: Article schema (FAQ is already embedded in contentHtml by AI)
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: post.imageKitUrl || undefined,
    datePublished: post.createdAt,
    dateModified: post.createdAt,
    author: {
      "@type": "Organization",
      name: "CS Graphic Meta",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "CS Graphic Meta",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/cs-logo.png`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  // JSON-LD: BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0b0f16] text-gray-300">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />


      {/* ------------------------------------------------------------------ */}
      {/* Hero / Feature image */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] bg-gray-900 overflow-hidden">
        {post.imageKitUrl ? (
          <Image
            src={post.imageKitUrl}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 via-[#111827] to-black" />
        )}
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f16] via-[#0b0f16]/60 to-transparent" />

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-10 sm:pb-14 max-w-4xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-[#bb8d03] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#bb8d03] transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-gray-1-00 line-clamp-1">{post.title}</span>
          </nav>

          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-3.5 h-3.5 text-[#bb8d03]" />
            <span className="text-xs font-semibold text-[#bb8d03] uppercase tracking-widest">
              {toTitleCase(post.keyword.split(" ").slice(0, 3).join(" "))}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
            {post.title}
          </h1>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Article layout */}
      {/* ------------------------------------------------------------------ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
          {/* Main content */}
          <div>
            {/* Meta bar */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-800 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.createdAt)}
              </span>
              <span className="text-gray-600">·</span>
              <span>{readTime} min read</span>
              <span className="text-gray-600">·</span>
              <span>By CS Graphic Meta</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(canonical)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto flex items-center gap-1.5 text-gray-400 hover:text-[#bb8d03] transition-colors"
                aria-label="Share on Twitter"
              >
                <Share2 className="w-4 h-4" /> Share
              </a>
            </div>

            {/* Meta description lead */}
            <p className="text-lg text-gray-300 leading-relaxed mb-8 border-l-4 border-[#bb8d03] pl-5 italic">
              {post.metaDescription}
            </p>

            {/* Article HTML – safe: generated by our own AI + stored to our DB */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {/* Back to blog */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#bb8d03] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 space-y-8">
            {/* About box */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">
              <img src="/cs-logo.png" alt="CS Graphic Meta" className="h-10 mb-4" />
              <h3 className="text-white font-semibold mb-2">CS Graphic Meta</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Australia's trusted partner for Graphic Design, Web Development, and Mobile App solutions
                that grow your brand online.
              </p>
              <a
                href="/#contact"
                className="inline-block w-full text-center bg-[#bb8d03] hover:bg-[#a07a02] text-black font-semibold text-sm py-2.5 rounded-xl transition-colors"
              >
                Get a Free Quote
              </a>
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
                  Related Articles
                </h3>
                <ul className="space-y-4">
                  {related.map((r) => (
                    <li key={r._id as string}>
                      <Link
                        href={`/blog/${r.slug}`}
                        className="group flex gap-3 items-start"
                      >
                        {r.imageKitUrl && (
                          <div className="relative w-16 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                            <Image
                              src={r.imageKitUrl as string}
                              alt={r.title as string}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <span className="text-sm text-gray-400 group-hover:text-[#bb8d03] transition-colors leading-snug line-clamp-2">
                          {r.title as string}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Share box */}
            <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
                Share This Article
              </h3>
              <div className="flex gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonical)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs font-semibold py-2 rounded-lg bg-[#1877f2]/10 text-[#1877f2] hover:bg-[#1877f2]/20 transition-colors"
                >
                  Facebook
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonical)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs font-semibold py-2 rounded-lg bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5]/20 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(canonical)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs font-semibold py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  Twitter
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <FooterNew />
    </div>
  );
}

// Enable ISR – revalidate post pages every 6 hours
export const revalidate = 21600;
