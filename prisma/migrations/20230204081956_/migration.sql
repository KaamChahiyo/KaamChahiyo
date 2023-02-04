/*
  Warnings:

  - You are about to drop the column `accessToken` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Session` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Session_accessToken_key` ON `Session`;

-- AlterTable
ALTER TABLE `Account` MODIFY `access_token` TEXT NULL,
    MODIFY `id_token` TEXT NULL,
    MODIFY `refresh_token` TEXT NULL;

-- AlterTable
ALTER TABLE `Session` DROP COLUMN `accessToken`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `deletedAt`,
    DROP COLUMN `updatedAt`;
