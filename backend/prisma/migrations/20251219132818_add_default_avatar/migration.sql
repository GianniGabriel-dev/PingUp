/*
  Warnings:

  - You are about to drop the column `comment_id` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `content_type` on the `Translation` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[content_id,target_language]` on the table `Translation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `language` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `avatar_url` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_parent_comment_id_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_user_id_fkey`;

-- DropIndex
DROP INDEX `Translation_content_type_content_id_target_language_key` ON `Translation`;

-- AlterTable
ALTER TABLE `Notification` DROP COLUMN `comment_id`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `image_url`,
    ADD COLUMN `language` VARCHAR(50) NOT NULL,
    ADD COLUMN `media_url` VARCHAR(350) NULL,
    ADD COLUMN `parent_post_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `Translation` DROP COLUMN `content_type`;

-- AlterTable
ALTER TABLE `User` MODIFY `avatar_url` VARCHAR(350) NOT NULL DEFAULT 'https://res.cloudinary.com/dssbrks07/image/upload/v1766150505/user1_wznohf.svg';

-- DropTable
DROP TABLE `Comment`;

-- CreateIndex
CREATE UNIQUE INDEX `Translation_content_id_target_language_key` ON `Translation`(`content_id`, `target_language`);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_parent_post_id_fkey` FOREIGN KEY (`parent_post_id`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Translation` ADD CONSTRAINT `Translation_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
