import { db } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { RestaurantImage } from './components/restaurant-image'
import { Image } from '@/components/image'
import { BadgeStar } from '@/components/badge-star'
import { DeliveryCard } from '@/components/delivery-card'
import { ProductList } from '@/components/product-list'

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
    include: {
      categories: {
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          name: true,
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
        take: 10,
      },
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

      <div className="scroll-hidden mt-3 flex gap-4 px-5">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="min-w-[167px] rounded-sm bg-[#F4F4F4] text-center"
          >
            <span className="text-xs font-semibold text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <h2 className="px-5 font-semibold">Mais Pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => (
        <div key={category.id} className="mt-6 space-y-4">
          <h2 className="px-5 font-semibold">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}
    </div>
  )
}
