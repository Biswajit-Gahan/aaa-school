/*
  Warnings:

  - You are about to drop the column `standard` on the `questions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[question,class_group]` on the table `questions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `class_group` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "questions_question_standard_key";

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "standard",
ADD COLUMN     "class_group" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "questions_question_class_group_key" ON "questions"("question", "class_group");
