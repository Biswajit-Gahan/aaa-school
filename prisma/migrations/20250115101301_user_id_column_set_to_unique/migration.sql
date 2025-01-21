/*
  Warnings:

  - A unique constraint covering the columns `[session_ids]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "sessions_session_ids_user_id_key";

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "session_ids" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_ids_key" ON "sessions"("session_ids");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_user_id_key" ON "sessions"("user_id");
