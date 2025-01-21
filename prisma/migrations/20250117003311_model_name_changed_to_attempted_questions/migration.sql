/*
  Warnings:

  - You are about to drop the `student_attempted_questions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "student_attempted_questions";

-- CreateTable
CREATE TABLE "attempted_questions" (
    "id" SERIAL NOT NULL,
    "student_id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "attempted_question" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attempted_questions_pkey" PRIMARY KEY ("id")
);
