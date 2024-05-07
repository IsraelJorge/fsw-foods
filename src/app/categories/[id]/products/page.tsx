import { Header } from '@/components/header'
import { ProductItem } from '@/components/product-item'
import { db } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export type CategoriesPageProps = {
  params: {
    id: string
  }
}

export default async function CategoriesPage({
  params: { id },
}: CategoriesPageProps) {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })

  if (!category) return notFound()

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">{category.name}</h2>

        <div className="grid grid-cols-2 gap-6">
          {category.products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-h-fit w-full"
            />
          ))}
        </div>
      </div>
    </>
  )
}
