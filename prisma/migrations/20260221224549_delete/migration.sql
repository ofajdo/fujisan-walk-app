/*
  Warnings:

  - You are about to drop the column `nextId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `qr` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `qrId` on the `Location` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_nextId_fkey";

-- DropIndex
DROP INDEX "Location_qrId_key";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "nextId",
DROP COLUMN "qr",
DROP COLUMN "qrId";
