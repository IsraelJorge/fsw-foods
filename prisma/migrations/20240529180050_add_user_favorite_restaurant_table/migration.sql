-- CreateTable
CREATE TABLE "user_favorite_restaurant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "user_favorite_restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_favorite_restaurant_userId_restaurantId_key" ON "user_favorite_restaurant"("userId", "restaurantId");

-- AddForeignKey
ALTER TABLE "user_favorite_restaurant" ADD CONSTRAINT "user_favorite_restaurant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_restaurant" ADD CONSTRAINT "user_favorite_restaurant_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
