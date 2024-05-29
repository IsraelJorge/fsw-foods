import { db } from '@/lib/prisma'
import { RestaurantItem } from './restaurant-item'
import { getAuthServer } from '@/data/getAuthServer'

export async function RestaurantList() {
  const auth = await getAuthServer()

  const restaurants = await db.restaurant.findMany({
    take: 10,
  })
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: auth?.id,
    },
  })

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
          userFavoriteRestaurants={userFavoriteRestaurants}
        />
      ))}
    </div>
  )
}
