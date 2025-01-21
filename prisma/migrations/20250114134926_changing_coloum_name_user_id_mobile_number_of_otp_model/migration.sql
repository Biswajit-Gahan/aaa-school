/*
  Warnings:

  - You are about to drop the column `user_id` on the `otp` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mobile_number]` on the table `otp` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mobile_number` to the `otp` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "otp_user_id_otp_number_key";

-- AlterTable
ALTER TABLE "otp" DROP COLUMN "user_id",
ADD COLUMN     "mobile_number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "otp_mobile_number_key" ON "otp"("mobile_number");
