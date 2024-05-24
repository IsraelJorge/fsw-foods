import { Header } from '@/components/header'
import { getAuthServer } from '@/data/getAuthServer'
import { db } from '@/lib/prisma'
import { Routes } from '@/utils/ui/Routes'
import { redirect } from 'next/navigation'
import { OrderItem } from './components/order-item'

export default async function MyOrdersPage() {
  const auth = await getAuthServer()

  if (!auth) return redirect(Routes.home)

  const orders = await db.order.findMany({
    where: {
      userId: auth.id,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
      restaurant: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 font-semibold">Meus pedidos</h2>

        <div className="space-y-3">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </>
  )
}
