import { calculateProductTotalPrice, formatCurrency } from '@/helpers/price'
import { Prisma } from '@prisma/client'

import { Image } from './image'
import Link from 'next/link'
import { Routes } from '@/utils/ui/Routes'
import { BadgeDiscount } from './badge-discount'
import { cn } from '@/lib/utils'

export type ProductItemProps = {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: { name: true }
      }
    }
  }>
  className?: string
}

export function ProductItem({ product, className }: ProductItemProps) {
  const hasProductDiscountPercentage = product.discountPercentage > 0

  return (
    <Link
      className={cn('w-[150px] min-w-[150px]', className)}
      href={Routes.product(product.id)}
    >
      <div className="w-full space-y-2">
        <div className="relative aspect-square">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="h-auto w-auto rounded-lg object-cover"
          />
          {hasProductDiscountPercentage && (
            <BadgeDiscount
              className="absolute left-2 top-2"
              label={product.discountPercentage}
            />
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
    </Link>
  )
}
