/*
  Warnings:

  - You are about to drop the column `featuredImageFileId` on the `blog_posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blog_posts" DROP COLUMN "featuredImageFileId",
ADD COLUMN     "featuredImageAvifPath" TEXT,
ADD COLUMN     "featuredImagePath" TEXT,
ADD COLUMN     "featuredImageWebpPath" TEXT;
