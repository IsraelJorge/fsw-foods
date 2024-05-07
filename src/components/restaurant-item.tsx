import { Restaurant } from '@prisma/client'

import { Image } from './image'
import { Icon } from './icon'
import { formatCurrency } from '@/helpers/price'
import Link from 'next/link'
import { Routes } from '@/utils/ui/Routes'
import { ButtonLike } from './button-like'
import { BadgeStar } from './badge-star'
import { cn } from '@/lib/utils'

export type RestaurantItemProps = {
  restaurant: Restaurant
  className?: string
}

export function RestaurantItem({ restaurant, className }: RestaurantItemProps) {
  return (
    <Link
      className={cn('min-w-[266px] max-w-[266px]', className)}
      href={Routes.restaurant(restaurant.id)}
    >
      <div className="h-full w-full space-y-3">
        <div className="relative h-[136px] w-full">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-lg object-cover"
          />
          <BadgeStar
            label="5.0"
            variant="flat"
            className="absolute left-2 top-2"
          />

          <ButtonLike className="absolute right-2 top-2 size-7" />
        </div>
        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>
          <div className="flex gap-3">
            <div className="flex items-center gap-1">
              <Icon name="BikeIcon" className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? 'Entrega grátis'
                  : formatCurrency(Number(restaurant.deliveryFee))}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Icon name="TimerIcon" className="text-primary" size={14} />
              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
