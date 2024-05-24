'use server'

import { db } from '@/lib/prisma'
import { Routes } from '@/utils/ui/Routes'
import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  await db.order.create({
    data,
  })
  revalidatePath(Routes.myOrders)
}
