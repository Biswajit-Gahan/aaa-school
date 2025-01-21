/*
  Warnings:

  - You are about to drop the column `standard` on the `exams` table. All the data in the column will be lost.
  - Added the required column `examGroup` to the `exams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "exams" DROP COLUMN "standard",
ADD COLUMN     "examGroup" TEXT NOT NULL;
