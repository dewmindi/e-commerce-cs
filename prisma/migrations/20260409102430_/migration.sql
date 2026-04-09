/*
  Warnings:

  - You are about to drop the column `deliveryDays` on the `service_packages` table. All the data in the column will be lost.
  - You are about to drop the column `revisions` on the `service_packages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "service_packages" DROP COLUMN "deliveryDays",
DROP COLUMN "revisions",
ADD COLUMN     "quotationFeatures" JSONB;
