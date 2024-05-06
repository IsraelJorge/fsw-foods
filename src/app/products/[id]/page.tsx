import { db } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ProductImage } from './components/product-image'
import { ProductDetails } from './components/product-details'

export type ProductsPageProps = {
  params: {
    id: string
  }
}

export default async function ProductsPage({
  params: { id },
}: ProductsPageProps) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  })

  if (!product) return notFound()

  const juices = await db.product.findMany({
    where: {
      category: {
        name: 'Sucos',
      },
      restaurant: {
        id: product.restaurantId,
      },
    },
    include: {
      restaurant: true,
    },
    take: 10,
  })

  return (
    <div>
      <ProductImage src={product.imageUrl} alt={product.name} />

      <ProductDetails product={product} complementaryProducts={juices} />
    </div>
  )
}
