-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "public"."Repost" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Repost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Repost_user_id_post_id_key" ON "public"."Repost"("user_id", "post_id");

-- AddForeignKey
ALTER TABLE "public"."Repost" ADD CONSTRAINT "Repost_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Repost" ADD CONSTRAINT "Repost_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
