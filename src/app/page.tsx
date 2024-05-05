import { CategoryList } from '@/components/category-list'
import { Header } from '@/components/header'
import { Icon } from '@/components/icon'
import { ProductList } from '@/components/product-list'
import { Search } from '@/components/search'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/prisma'
import Image from 'next/image'

export default async function Home() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <div>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Image
          src="/images/promo-banner-01.svg"
          alt="Até 30% de desconto em pizzas!"
          width={0}
          height={0}
          className="h-auto w-full"
          sizes="100vw"
          quality={100}
        />
      </div>

      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver todos
            <Icon name="ChevronRightIcon" size={16} />
          </Button>
        </div>
        <ProductList products={products} />
      </div>
    </div>
  )
}
