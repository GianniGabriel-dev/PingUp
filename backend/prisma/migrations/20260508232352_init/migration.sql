-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255),
    "avatar_url" VARCHAR(350) NOT NULL DEFAULT 'https://res.cloudinary.com/dssbrks07/image/upload/v1771602464/avatars/d1ozknsuviqhqbjyx1z2.webp',
    "banner_url" VARCHAR(350) NOT NULL DEFAULT 'https://res.cloudinary.com/dssbrks07/image/upload/v1772491422/Captura_de_pantalla_2026-03-02_234003_bsbhb4.webp',
    "language" VARCHAR(5) NOT NULL DEFAULT 'es',
    "bio" VARCHAR(280),
    "auth_provider" VARCHAR(15) NOT NULL DEFAULT 'email',
    "googleId" VARCHAR(30),
    "name" VARCHAR(30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Post" (
    "id" SERIAL NOT NULL,
    "parent_post_id" INTEGER,
    "user_id" INTEGER NOT NULL,
    "content" VARCHAR(280),
    "media_url" VARCHAR(350),
    "sentiment" VARCHAR(20),
    "sentiment_score" DOUBLE PRECISION,
    "language" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Like" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Follow" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "follower_id" INTEGER NOT NULL,
    "following_id" INTEGER NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Translation" (
    "id" SERIAL NOT NULL,
    "content_id" INTEGER NOT NULL,
    "original_text" TEXT NOT NULL,
    "translated_text" TEXT NOT NULL,
    "target_language" VARCHAR(10) NOT NULL,
    "source_language" VARCHAR(10),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" SERIAL NOT NULL,
    "notification_type" VARCHAR(20) NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sender_id" INTEGER NOT NULL,
    "receiver_id" INTEGER NOT NULL,
    "post_id" INTEGER,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "public"."User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_user_id_post_id_key" ON "public"."Like"("user_id", "post_id");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_follower_id_following_id_key" ON "public"."Follow"("follower_id", "following_id");

-- CreateIndex
CREATE UNIQUE INDEX "Translation_content_id_target_language_key" ON "public"."Translation"("content_id", "target_language");

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_parent_post_id_fkey" FOREIGN KEY ("parent_post_id") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Follow" ADD CONSTRAINT "Follow_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Follow" ADD CONSTRAINT "Follow_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Translation" ADD CONSTRAINT "Translation_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
