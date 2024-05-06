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

  const juices = await db.product.findMany({
    where: {
      category: {
        name: 'Sucos',
      },
    },
    include: {
      restaurant: true,
    },
    take: 10,
  })

  if (!product) return notFound()

  return (
    <div>
      <ProductImage src={product.imageUrl} alt={product.name} />

      <ProductDetails product={product} complementaryProducts={juices} />
    </div>
  )
}
