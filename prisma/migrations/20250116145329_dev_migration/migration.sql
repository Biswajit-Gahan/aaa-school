/*
  Warnings:

  - Made the column `right_answers` on table `exams` required. This step will fail if there are existing NULL values in that column.
  - Made the column `wrong_answers` on table `exams` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "exams" ALTER COLUMN "exam_mark" SET DEFAULT 0,
ALTER COLUMN "right_answers" SET NOT NULL,
ALTER COLUMN "right_answers" SET DEFAULT 0,
ALTER COLUMN "wrong_answers" SET NOT NULL,
ALTER COLUMN "wrong_answers" SET DEFAULT 0;
