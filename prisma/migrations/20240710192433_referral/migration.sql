/*
  Warnings:

  - You are about to drop the column `referrarEmail` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `referrarName` on the `Referral` table. All the data in the column will be lost.
  - Added the required column `referrerEmail` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referrerName` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Referral" DROP COLUMN "referrarEmail",
DROP COLUMN "referrarName",
ADD COLUMN     "referrerEmail" TEXT NOT NULL,
ADD COLUMN     "referrerName" TEXT NOT NULL;
