import { db } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { RestaurantImage } from './components/restaurant-image'
import { Image } from '@/components/image'
import { BadgeStar } from '@/components/badge-star'
import { DeliveryCard } from '@/components/delivery-card'

export type RestaurantPageProps = {
  params: {
    id: string
  }
}

export default async function RestaurantPage({
  params: { id },
}: RestaurantPageProps) {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
  })

  if (!restaurant) return notFound()

  return (
    <div>
      <RestaurantImage src={restaurant.imageUrl} alt={restaurant.name} />

      <div className="relative z-10 -mt-5 rounded-t-3xl bg-white py-5">
        <div className="flex items-center justify-between px-5">
          <div className="flex items-center gap-[0.375rem]">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              width={32}
              height={32}
              className="size-8 rounded-full object-cover"
            />
            <h1 className="text-xl font-semibold">{restaurant.name}</h1>
          </div>
          <BadgeStar label="5.0" variant="secondary" />
        </div>
      </div>

      <div className="mx-5 mt-6 ">
        <DeliveryCard restaurant={restaurant} />
      </div>
    </div>
  )
}
