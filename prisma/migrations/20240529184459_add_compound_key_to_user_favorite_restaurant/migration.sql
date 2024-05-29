/*
  Warnings:

  - The primary key for the `user_favorite_restaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user_favorite_restaurant` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_favorite_restaurant_userId_restaurantId_key";

-- AlterTable
ALTER TABLE "user_favorite_restaurant" DROP CONSTRAINT "user_favorite_restaurant_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "user_favorite_restaurant_pkey" PRIMARY KEY ("userId", "restaurantId");
