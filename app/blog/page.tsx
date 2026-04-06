import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import FooterNew from "@/components/FooterNew";
import clientPromise from "@/lib/mongodb-products";
import { Calendar, ArrowRight, Tag } from "lucide-react";

// --------------------------------------------------------------------------
// SEO Metadata
// --------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "Blog | CS Graphic Meta – Design & Development Insights",
  description:
    "Expert articles on graphic design, web development, mobile apps, SEO, and digital branding from the CS Graphic Meta team in Australia.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
  },
  openGraph: {
    title: "Blog | CS Graphic Meta",
    description:
      "Expert articles on graphic design, web development, mobile apps, and digital branding.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
    type: "website",
    siteName: "CS Graphic Meta",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | CS Graphic Meta",
    description:
      "Expert articles on graphic design, web development, mobile apps, and digital branding.",
  },
};

// --------------------------------------------------------------------------
// Types
// --------------------------------------------------------------------------
interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  keyword: string;
  sourceUrl?: string;
  contentHtml: string;
  metaDescription: string;
  imageKitUrl: string;
  createdAt: string;
}

// --------------------------------------------------------------------------
// Data fetching (Server Component – direct MongoDB, no extra network hop)
// --------------------------------------------------------------------------
async function getPosts(page: number, limit = 9) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_PRODUCTS || "cs-ecommerce");
    const col = db.collection("blog_posts");

    const skip = (page - 1) * limit;
    const [rawPosts, total] = await Promise.all([
      col
        .find({ published: true }, { projection: { contentHtml: 0 } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      col.countDocuments({ published: true }),
    ]);

    // Serialise ObjectId → string
    const posts = rawPosts.map((p) => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt?.toISOString?.() ?? p.createdAt,
    })) as BlogPost[];

    return { posts, total, totalPages: Math.ceil(total / limit) };
  } catch (err) {
    console.error("[blog] getPosts error:", err);
    return { posts: [] as BlogPost[], total: 0, totalPages: 0 };
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function toTitleCase(str: string) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

// --------------------------------------------------------------------------
// Page component
// --------------------------------------------------------------------------
export default async function BlogListingPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));
  const { posts, total, totalPages } = await getPosts(page);

  console.log(posts);

  return (
    <div className="min-h-screen bg-[#0b0f16] text-gray-300">

      {/* ------------------------------------------------------------------ */}
      {/* Hero Banner */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative py-24 px-4 overflow-hidden border-b border-gray-800">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(187,141,3,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(187,141,3,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="relative max-w-6xl mx-auto text-center">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-widest uppercase text-[#bb8d03] border border-[#bb8d03]/40 rounded-full">
            Our Blog
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Design & Development Insights
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Tips, trends, and expert advice on graphic design, web development, mobile apps,
            and growing your brand online.
          </p>
          {total > 0 && (
            <p className="mt-3 text-sm text-gray-500">
              {total} article{total !== 1 ? "s" : ""} published
            </p>
          )}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Post Grid */}
      {/* ------------------------------------------------------------------ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">No articles published yet. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts
                .filter((post) => post.sourceUrl === undefined)
                .map((post, index) => (
                  <BlogCard key={post._id} post={post} priority={index < 3} />
                ))
              }
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-16">
                {page > 1 && (
                  <Link
                    href={`/blog?page=${page - 1}`}
                    className="px-5 py-2 rounded-full border border-gray-700 text-sm text-gray-300 hover:border-[#bb8d03] hover:text-[#bb8d03] transition-colors"
                  >
                    ← Previous
                  </Link>
                )}
                <span className="text-sm text-gray-500">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <Link
                    href={`/blog?page=${page + 1}`}
                    className="px-5 py-2 rounded-full border border-gray-700 text-sm text-gray-300 hover:border-[#bb8d03] hover:text-[#bb8d03] transition-colors"
                  >
                    Next →
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <FooterNew />
    </div>
  );
}

// --------------------------------------------------------------------------
// Blog Card component
// --------------------------------------------------------------------------
function BlogCard({ post, priority }: { post: BlogPost; priority: boolean }) {
  const imageUrl = post.imageKitUrl || null;

  const tagText =
    post?.keyword && post.keyword.trim().length > 0
      ? toTitleCase(post.keyword.split(" ").slice(0, 3).join(" "))
      : "Uncategorized";

  return (
    <article className="group flex flex-col bg-[#111827] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#bb8d03]/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(187,141,3,0.1)]">
      {/* Feature image */}
      <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/9] overflow-hidden bg-gray-900">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <span className="text-[#bb8d03] text-4xl font-bold opacity-40">
              {post.title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Keyword / tag */}
        <div className="flex items-center gap-1.5 mb-3">
          <Tag className="w-3 h-3 text-[#bb8d03]" />
          <span className="text-xs text-[#bb8d03] font-medium tracking-wide uppercase">
            {tagText}
          </span>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-white font-semibold text-lg leading-snug mb-3 line-clamp-2 group-hover:text-[#bb8d03] transition-colors">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
          {post.metaDescription}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.createdAt)}
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-xs font-medium text-[#bb8d03] hover:gap-2 transition-all"
          >
            Read more <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
