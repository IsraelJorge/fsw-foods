import { db } from '@/lib/prisma';
import { CategoryItem } from './category-item';

export type CategoryListProps = {};

export async function CategoryList({}: CategoryListProps) {
  const categories = await db.category.findMany();

  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}
