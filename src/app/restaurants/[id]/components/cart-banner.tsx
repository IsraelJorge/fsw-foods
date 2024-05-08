'use client'

import { Cart } from '@/components/cart'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/cart'
import { formatCurrency } from '@/helpers/price'
import { useState } from 'react'

type CartBannerProps = {
  restaurantId: string
}

export function CartBanner({ restaurantId }: CartBannerProps) {
  const [isOpen, setOpen] = useState(false)
  const { products, totalPrice, totalQuantity } = useCart()

  const restaurantsHasProductOnCart = products.some(
    (product) => product.restaurantId === restaurantId,
  )

  if (!restaurantsHasProductOnCart) return null

  const handleOpenCartClick = () => {
    setOpen(true)
  }

  return (
    <div className="fixed bottom-0 left-0 w-full border-t border-muted bg-white p-5 pt-3 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs text-muted-foreground">
            Total sem entrega
          </span>
          <h3 className="flex items-center gap-1 font-semibold">
            {formatCurrency(totalPrice)}
            <span className="text-xs font-normal text-muted-foreground">
              / {totalQuantity} {totalQuantity > 1 ? 'itens' : 'item'}
            </span>
          </h3>
        </div>

        <Button
          className="text-semibold text-white"
          onClick={handleOpenCartClick}
        >
          Ver sacola
        </Button>
      </div>

      <Cart isOpen={isOpen} onClose={setOpen} />
    </div>
  )
}
