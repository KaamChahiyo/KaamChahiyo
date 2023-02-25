/*
  Warnings:

  - Made the column `title` on table `Job` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Job` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `Job` required. This step will fail if there are existing NULL values in that column.
  - Made the column `locationId` on table `Job` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Location` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Job` DROP FOREIGN KEY `Job_locationId_fkey`;

-- AlterTable
ALTER TABLE `Job` MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `price` DOUBLE NOT NULL,
    MODIFY `status` ENUM('approved', 'pendingApproval', 'rejected', 'completed', 'cancelled', 'inProgress') NOT NULL DEFAULT 'pendingApproval',
    MODIFY `assignedOn` DATETIME(3) NULL,
    MODIFY `locationId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Location` MODIFY `name` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Job` ADD CONSTRAINT `Job_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
