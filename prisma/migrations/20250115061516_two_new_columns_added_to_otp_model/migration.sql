-- AlterTable
ALTER TABLE "otp" ADD COLUMN     "otp_validity_end" TIMESTAMP(3),
ADD COLUMN     "otp_validity_start" TIMESTAMP(3),
ALTER COLUMN "otp_number" DROP NOT NULL;
