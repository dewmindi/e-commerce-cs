-- CreateTable
CREATE TABLE "managed_sites" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "niche" TEXT NOT NULL,
    "geoTarget" TEXT NOT NULL DEFAULT 'US',
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "publishEndpoint" TEXT,
    "publishSecret" TEXT,
    "gscKeywords" JSONB NOT NULL DEFAULT '[]',
    "competitorKeywords" JSONB NOT NULL DEFAULT '[]',
    "scenarios" JSONB NOT NULL DEFAULT '[]',
    "postsPerDay" INTEGER NOT NULL DEFAULT 3,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "managed_sites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "managed_blog_posts" (
    "id" TEXT NOT NULL,
    "siteId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT[],
    "imageUrl" TEXT,
    "imagePath" TEXT,
    "status" TEXT NOT NULL DEFAULT 'published',
    "delivered" BOOLEAN NOT NULL DEFAULT false,
    "deliveryStatus" INTEGER,
    "revalidated" BOOLEAN NOT NULL DEFAULT false,
    "scenarioId" TEXT,
    "sourceHash" TEXT,
    "category" TEXT,
    "tags" JSONB NOT NULL DEFAULT '[]',
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "managed_blog_posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "managed_sites_domain_key" ON "managed_sites"("domain");

-- CreateIndex
CREATE INDEX "managed_sites_status_idx" ON "managed_sites"("status");

-- CreateIndex
CREATE INDEX "managed_blog_posts_siteId_status_idx" ON "managed_blog_posts"("siteId", "status");

-- CreateIndex
CREATE INDEX "managed_blog_posts_siteId_publishedAt_idx" ON "managed_blog_posts"("siteId", "publishedAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "managed_blog_posts_siteId_slug_key" ON "managed_blog_posts"("siteId", "slug");

-- AddForeignKey
ALTER TABLE "managed_blog_posts" ADD CONSTRAINT "managed_blog_posts_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "managed_sites"("id") ON DELETE CASCADE ON UPDATE CASCADE;
