import { useCart } from '@/contexts/cart'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from './ui/sheet'
import { Icon } from './icon'
import { CartItem } from './cart-item'
import { Card, CardContent } from './ui/card'
import { formatCurrency } from '@/helpers/price'
import { Separator } from './ui/separator'
import { Button } from './ui/button'

type CartProps = {
  isOpen: boolean
  onClose: (open: boolean) => void
}

export function Cart({ isOpen, onClose }: CartProps) {
  const { products, subtotalPrice, totalPrice, totalDiscounts } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[90vw]">
        <div className="flex h-full flex-col">
          <SheetHeader className="mb-6 flex flex-row items-center justify-between">
            <SheetTitle>Sacola</SheetTitle>
            <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <Icon name="X" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </SheetHeader>

          {!products.length && (
            <div className="mt-6 flex items-center justify-center rounded-md border border-dashed border-muted-foreground p-5 text-center text-sm text-muted-foreground">
              <span>Você ainda não adicionou nenhum produto à sacola.</span>
            </div>
          )}

          <div className="flex flex-auto flex-col space-y-4">
            {products.map((product) => (
              <CartItem key={product.id} cardProduct={product} />
            ))}
          </div>

          {!!products.length && (
            <SheetFooter className="mt-6">
              <Card>
                <CardContent className="space-y-2 p-5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(subtotalPrice)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Entrega</span>
                    <span>
                      {Number(products[0].restaurant.deliveryFee) === 0 ? (
                        <span className="uppercase text-primary">Grátis</span>
                      ) : (
                        formatCurrency(
                          Number(products[0].restaurant.deliveryFee),
                        )
                      )}
                    </span>
                  </div>
                  <Separator className="h-[0.5px]" />
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Desconto</span>
                    <span>- {formatCurrency(totalDiscounts)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                </CardContent>
              </Card>

              <SheetClose asChild>
                <Button className="mt-6 w-full font-semibold">
                  Finalizar Pedido
                </Button>
              </SheetClose>
            </SheetFooter>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
