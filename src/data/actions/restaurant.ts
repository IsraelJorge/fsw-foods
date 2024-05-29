'use server'

import { db } from '@/lib/prisma'
import { Routes } from '@/utils/ui/Routes'
import { UserFavoriteRestaurant } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const favoriteRestaurant = async (data: UserFavoriteRestaurant) => {
  await db.userFavoriteRestaurant.create({
    data,
  })
  revalidatePath(Routes.home)
}

export const unfavoriteRestaurant = async (data: UserFavoriteRestaurant) => {
  await db.userFavoriteRestaurant.delete({
    where: {
      userId_restaurantId: {
        userId: data.userId,
        restaurantId: data.restaurantId,
      },
    },
  })
  revalidatePath(Routes.home)
}

export const toggleFavoriteRestaurant = async (
  data: UserFavoriteRestaurant,
) => {
  const isFavorited = await db.userFavoriteRestaurant.findUnique({
    where: {
      userId_restaurantId: {
        userId: data.userId,
        restaurantId: data.restaurantId,
      },
    },
  })

  if (isFavorited) {
    await unfavoriteRestaurant(data)
  } else {
    await favoriteRestaurant(data)
  }
}
