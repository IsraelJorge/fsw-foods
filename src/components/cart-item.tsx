import { CardProduct, useCart } from '@/contexts/cart'
import { Image } from './image'
import { calculateProductTotalPrice, formatCurrency } from '@/helpers/price'
import { Button } from './ui/button'
import { Icon } from './icon'

type CartItemProps = {
  cardProduct: CardProduct
}

export function CartItem({ cardProduct }: CartItemProps) {
  const {
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductFromCart,
  } = useCart()

  const handleIncreaseQuantityClick = () => {
    increaseProductQuantity(cardProduct.id)
  }

  const handleDecreaseQuantityClick = () => {
    decreaseProductQuantity(cardProduct.id)
  }

  const handleRemoveProductCartClick = () => {
    removeProductFromCart(cardProduct.id)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative size-20">
          <Image
            src={cardProduct.imageUrl}
            alt={cardProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{cardProduct.name}</h3>

          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cardProduct) * cardProduct.quantity,
              )}
            </h4>
            {cardProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cardProduct.price) * cardProduct.quantity,
                )}
              </span>
            )}
          </div>

          <div className="flex items-center">
            <Button
              size="icon"
              variant="ghost"
              className="size-7 rounded-md border border-muted-foreground/60"
              onClick={handleDecreaseQuantityClick}
              disabled={cardProduct.quantity === 1}
            >
              <Icon name="ChevronLeftIcon" size={16} />
            </Button>

            <span className="flex size-7 items-center justify-center text-sm">
              {cardProduct.quantity}
            </span>

            <Button
              size="icon"
              className="size-7 rounded-md border border-muted-foreground/60"
              onClick={handleIncreaseQuantityClick}
            >
              <Icon name="ChevronRightIcon" size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        className="size-8 border border-muted-foreground p-0"
        onClick={handleRemoveProductCartClick}
      >
        <Icon name="TrashIcon" size={18} />
      </Button>
    </div>
  )
}
