import { ProductItem } from './product-item'
import { Prisma } from '@prisma/client'

export type ProductListProps = {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: { name: true }
      }
    }
  }>[]
}

export function ProductList({ products = [] }: ProductListProps) {
  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  )
}
