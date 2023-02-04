/*
  Warnings:

  - You are about to drop the column `emailVerifiedOn` on the `User` table. All the data in the column will be lost.
  - The `emailVerified` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `emailVerifiedOn`,
    MODIFY `password` VARCHAR(191) NULL,
    DROP COLUMN `emailVerified`,
    ADD COLUMN `emailVerified` DATETIME(3) NULL;
