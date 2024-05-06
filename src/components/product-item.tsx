import { calculateProductTotalPrice, formatCurrency } from '@/helpers/price'
import { Prisma } from '@prisma/client'

import { Image } from './image'
import { Icon } from './icon'

export type ProductItemProps = {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: { name: true }
      }
    }
  }>
}

export function ProductItem({ product }: ProductItemProps) {
  const hasProductDiscountPercentage = product.discountPercentage > 0

  return (
    <div className="rou w-[150px] min-w-[150px] space-y-2">
      <div className="relative h-[150px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover"
        />
        {hasProductDiscountPercentage && (
          <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-primary px-2 py-[2px] text-white">
            <Icon name="ArrowDownIcon" size={12} />
            <span className="text-semibold text-xs">
              {product.discountPercentage}%
            </span>
          </div>
        )}
      </div>

      <div>
        <h2 className="truncate text-sm">{product.name}</h2>
        <div className="flex items-center gap-1">
          <h3 className="font-semibold">
            {formatCurrency(calculateProductTotalPrice(product))}
          </h3>
          {hasProductDiscountPercentage && (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>

        <span className="block text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
    </div>
  )
}
