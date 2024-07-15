import { BannerHome } from '@/components/banner-home'
import { CategoryList } from '@/components/category-list'
import { Header } from '@/components/header'
import { Icon } from '@/components/icon'
import { Container } from '@/components/layouts/container'
import { ProductList } from '@/components/product-list'
import { PromoBanner } from '@/components/promo-banner'
import { RestaurantList } from '@/components/restaurant-list'
import { Search } from '@/components/search'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/prisma'
import { Routes } from '@/utils/ui/Routes'
import Link from 'next/link'

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

      <BannerHome />

      <div className="pt-6 md:hidden">
        <Search />
      </div>

      <div className="pt-6">
        <CategoryList />
      </div>

      <Container className="pt-6">
        <PromoBanner
          src="/images/promo-banner-01.svg"
          alt="Até 30% de desconto em pizzas!"
          priority
        />
      </Container>

      <Container className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href={Routes.productsRecommended}>
              Ver todos
              <Icon name="ChevronRightIcon" size={16} />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </Container>

      <Container className="pt-6">
        <PromoBanner
          src="/images/promo-banner-02.svg"
          alt="A partir de R$17,90 em lanches!"
        />
      </Container>

      <Container className="space-y-4 py-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href={Routes.restaurantsRecommended}>
              Ver todos
              <Icon name="ChevronRightIcon" size={16} />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </Container>
    </div>
  )
}
