import { Restaurant } from '@prisma/client'
import { Card } from './ui/card'
import { Icon } from './icon'
import { formatCurrency } from '@/helpers/price'

export type DeliveryCardProps = {
  restaurant: Restaurant
}

export function DeliveryCard({ restaurant }: DeliveryCardProps) {
  return (
    <Card className="flex justify-around py-3">
      <div className="flex flex-col items-center gap-1 text-xs">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="block font-semibold">Entrega</span>
          <Icon name="BikeIcon" size={14} />
        </div>
        <span className="font-semibold">
          {Number(restaurant.deliveryFee) === 0
            ? 'Grátis'
            : formatCurrency(Number(restaurant.deliveryFee))}
        </span>
      </div>

      <div className="flex flex-col items-center gap-1 text-xs">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className="block font-semibold">Entrega</span>
          <Icon name="TimerIcon" size={14} />
        </div>

        <span className="font-semibold">
          {restaurant.deliveryTimeMinutes} min
        </span>
      </div>
    </Card>
  )
}
