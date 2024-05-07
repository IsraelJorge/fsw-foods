import { Header } from '@/components/header'
import { ProductItem } from '@/components/product-item'

import { db } from '@/lib/prisma'

export default async function RecommendedProductsPage() {
  const products = await db.product.findMany({
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Produtos Recomendados</h2>

        <div className="grid grid-cols-2 gap-6">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="w-full"
            />
          ))}
        </div>
      </div>
    </>
  )
}
