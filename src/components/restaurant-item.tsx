import { Restaurant } from '@prisma/client'

import { Image } from './image'
import { Icon } from './icon'
import { formatCurrency } from '@/helpers/price'
import { Button } from './ui/button'

export type RestaurantItemProps = {
  restaurant: Restaurant
}

export function RestaurantItem({ restaurant }: RestaurantItemProps) {
  return (
    <div className="min-w-[266px] max-w-[266px] space-y-3">
      <div className="relative h-[136px] w-full">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="rounded-lg object-cover"
        />
        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white px-2 py-[2px]">
          <Icon
            name="StarIcon"
            size={12}
            className="fill-yellow-400 text-yellow-400"
          />
          <span className="text-semibold text-xs">5.0</span>
        </div>

        <Button className="absolute right-2 top-2 size-7 rounded-full bg-muted-foreground/80 p-0">
          <Icon name="HeartIcon" size={16} className="fill-white" />
        </Button>
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
  )
}
