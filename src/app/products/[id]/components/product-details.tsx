'use client'

import { BadgeDiscount } from '@/components/badge-discount'
import { DeliveryCard } from '@/components/delivery-card'
import { Icon } from '@/components/icon'
import { Image } from '@/components/image'
import { ProductList } from '@/components/product-list'
import { Button } from '@/components/ui/button'
import { calculateProductTotalPrice, formatCurrency } from '@/helpers/price'
import { Prisma } from '@prisma/client'
import { useState } from 'react'

export type ProductDetailsProps = {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>[]
}

export function ProductDetails({
  product,
  complementaryProducts,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)

  const handleIncreaseQuantityClick = () =>
    setQuantity((prevState) => prevState + 1)

  const handleDecreaseQuantityClick = () =>
    setQuantity((prevState) => prevState - 1)

  return (
    <div className="relative z-10 -mt-5 rounded-t-3xl bg-white py-5">
      <div className="flex items-center gap-2 px-5">
        <Image
          src={product.restaurant.imageUrl}
          alt={product.restaurant.name}
          width={24}
          height={24}
          className="size-6 rounded-full object-cover"
        />
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">{product.name}</h1>

      <div className="flex justify-between px-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <BadgeDiscount label={product.discountPercentage} />
            )}
          </div>
          {product.discountPercentage > 0 && (
            <span className="block text-xs text-muted-foreground">
              De {formatCurrency(Number(product.price))}
            </span>
          )}
        </div>

        <div className="flex items-center">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-md border border-muted-foreground/60"
            onClick={handleDecreaseQuantityClick}
            disabled={quantity === 1}
          >
            <Icon name="ChevronLeftIcon" />
          </Button>

          <span className="flex size-10 items-center justify-center">
            {quantity}
          </span>

          <Button
            size="icon"
            className="rounded-md border border-muted-foreground/60"
            onClick={handleIncreaseQuantityClick}
          >
            <Icon name="ChevronRightIcon" />
          </Button>
        </div>
      </div>

      <div className="mx-5 mt-6 ">
        <DeliveryCard restaurant={product.restaurant} />
      </div>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="px-5 font-semibold">Sucos</h3>
        <ProductList products={complementaryProducts} />
      </div>

      <div className="mt-6 px-5">
        <Button className="w-full font-semibold">Adicionar à Sacola</Button>
      </div>
    </div>
  )
}
