import { db } from '@/lib/prisma'
import { CategoryItem } from './category-item'
import { Container } from './layouts/container'

export async function CategoryList() {
  const categories = await db.category.findMany()

  return (
    <Container className="grid grid-cols-2 items-center justify-center gap-3 md:flex">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </Container>
  )
}
