import { Header } from '@/components/header'
import { RestaurantItem } from '@/components/restaurant-item'
import { getAuthServer } from '@/data/getAuthServer'
import { db } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function MyFavoriteRestaurantsPage() {
  const auth = await getAuthServer()

  if (!auth) return notFound()

  const useFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: auth.id,
    },
    include: {
      restaurant: true,
    },
  })

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Favoritos</h2>

        <div className="flex w-full flex-col gap-6">
          {useFavoriteRestaurants.length === 0 ? (
            <h3>Você ainda não favoritou nenhum restaurante</h3>
          ) : (
            useFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                userFavoriteRestaurants={useFavoriteRestaurants}
                className="min-w-full max-w-full"
              />
            ))
          )}
        </div>
      </div>
    </>
  )
}
