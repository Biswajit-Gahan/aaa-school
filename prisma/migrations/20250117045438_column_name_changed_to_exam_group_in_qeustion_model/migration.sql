/*
  Warnings:

  - You are about to drop the column `class_group` on the `questions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[question,exam_group]` on the table `questions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `exam_group` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "questions_question_class_group_key";

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "class_group",
ADD COLUMN     "exam_group" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "questions_question_exam_group_key" ON "questions"("question", "exam_group");
