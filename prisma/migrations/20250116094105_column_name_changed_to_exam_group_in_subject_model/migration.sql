/*
  Warnings:

  - You are about to drop the column `standard` on the `all-subjects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subject_name,exam_group]` on the table `all-subjects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `exam_group` to the `all-subjects` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "subjects_subject_name_standard_key";

-- AlterTable
ALTER TABLE "subjects" DROP COLUMN "standard",
ADD COLUMN     "exam_group" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "subjects_subject_name_exam_group_key" ON "subjects"("subject_name", "exam_group");
