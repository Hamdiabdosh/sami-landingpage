-- AlterEnum
ALTER TYPE "Category" ADD VALUE 'OTHER';

-- AlterTable
ALTER TABLE "SiteSettings" ADD COLUMN "mapEmbedUrl" TEXT;
