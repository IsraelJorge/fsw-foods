'use client'

import { Restaurant } from '@prisma/client'
import { notFound, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { searchRestaurants } from '../_actions/search'
import { Header } from '@/components/header'
import { RestaurantItem } from '@/components/restaurant-item'

export function Restaurants() {
  const searchParams = useSearchParams()

  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  const searchFor = searchParams.get('search')

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return

      const foundRestaurants = await searchRestaurants(searchFor)
      setRestaurants(foundRestaurants)
    }

    fetchRestaurants()
  }, [searchFor])

  if (!searchFor) return notFound()

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Encontrados</h2>

        <div className="flex flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  )
}
