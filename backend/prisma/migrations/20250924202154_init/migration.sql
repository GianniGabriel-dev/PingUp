-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(30) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NULL,
    `avatar_url` VARCHAR(350) NULL,
    `bio` VARCHAR(280) NULL,
    `auth_provider` VARCHAR(15) NOT NULL DEFAULT 'email',
    `googleId` VARCHAR(30) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_googleId_key`(`googleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `content` VARCHAR(280) NOT NULL,
    `image_url` VARCHAR(350) NULL,
    `sentiment` VARCHAR(20) NULL,
    `sentiment_score` DOUBLE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(280) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` INTEGER NOT NULL,
    `post_id` INTEGER NOT NULL,
    `parent_comment_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Like` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_id` INTEGER NOT NULL,
    `post_id` INTEGER NOT NULL,

    UNIQUE INDEX `Like_user_id_post_id_key`(`user_id`, `post_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Follow` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `follower_id` INTEGER NOT NULL,
    `following_id` INTEGER NOT NULL,

    UNIQUE INDEX `Follow_follower_id_following_id_key`(`follower_id`, `following_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Translation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content_type` ENUM('post', 'comment') NOT NULL,
    `content_id` INTEGER NOT NULL,
    `original_text` TEXT NOT NULL,
    `translated_text` TEXT NOT NULL,
    `target_language` VARCHAR(10) NOT NULL,
    `source_language` VARCHAR(10) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Translation_content_type_content_id_target_language_key`(`content_type`, `content_id`, `target_language`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `notification_type` VARCHAR(20) NOT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sender_id` INTEGER NOT NULL,
    `receiver_id` INTEGER NOT NULL,
    `post_id` INTEGER NULL,
    `comment_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_parent_comment_id_fkey` FOREIGN KEY (`parent_comment_id`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `Follow_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `Follow_following_id_fkey` FOREIGN KEY (`following_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_receiver_id_fkey` FOREIGN KEY (`receiver_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
