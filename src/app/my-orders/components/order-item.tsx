'use client'

import { Icon } from '@/components/icon'
import { Avatar } from '@/components/ui/avatar'
import { Badge, BadgeVariant } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/contexts/cart'
import { formatCurrency } from '@/helpers/price'
import { Routes } from '@/utils/ui/Routes'
import { OrderStatus, Prisma } from '@prisma/client'
import { AvatarImage } from '@radix-ui/react-avatar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export type OrderItemProps = {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
      restaurant: true
    }
  }>
}

const StatusLabelMap = {
  [OrderStatus.CONFIRMED]: 'Confirmado',
  [OrderStatus.CANCELED]: 'Cancelado',
  [OrderStatus.DELIVERED]: 'Entregue',
  [OrderStatus.PREPARING]: 'Preparando',
}

const VariantStatusMap: { [key: string]: BadgeVariant } = {
  [OrderStatus.CONFIRMED]: 'success',
  [OrderStatus.CANCELED]: 'default',
  [OrderStatus.DELIVERED]: 'disabled',
  [OrderStatus.PREPARING]: 'warning',
}

export function OrderItem({ order }: OrderItemProps) {
  const { addProductToCart } = useCart()
  const router = useRouter()

  const statusLabel = StatusLabelMap[order.status] || 'Desconhecido'
  const statusVariant = VariantStatusMap[order.status] || 'disabled'

  const handleRedoOrderClick = () => {
    for (const orderProduct of order.orderProducts) {
      addProductToCart({
        newProduct: {
          ...orderProduct.product,
          quantity: orderProduct.quantity,
          restaurant: order.restaurant,
        },
      })
    }
    router.push(Routes.restaurant(order.restaurantId))
  }

  return (
    <Card>
      <CardContent className="p-4">
        <Badge variant={statusVariant}>{statusLabel}</Badge>
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="size-6">
              <AvatarImage
                src={order.restaurant.imageUrl}
                alt={order.restaurant.name}
              />
            </Avatar>
            <span className="text-sm font-semibold">
              {order.restaurant.name}
            </span>
          </div>
          <Button variant="ghost" size="icon" className="size-7" asChild>
            <Link href={Routes.restaurant(order.restaurantId)}>
              <Icon name="ChevronRightIcon" />
            </Link>
          </Button>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="space-y-2">
          {order.orderProducts.map((orderProduct) => (
            <div key={orderProduct.id} className="flex items-center gap-2">
              <div className="flex size-5 items-center justify-center rounded-full bg-muted-foreground text-xs font-semibold text-white">
                {orderProduct.quantity}
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {orderProduct.product.name}
              </span>
            </div>
          ))}
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">
            {formatCurrency(Number(order.totalPrice))}
          </p>
          <Button
            variant="ghost"
            className="text-xs text-primary"
            size="sm"
            disabled={order.status !== 'DELIVERED'}
            onClick={handleRedoOrderClick}
          >
            Adicionar à sacola
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
