import { Category } from '@prisma/client'
import { Image } from './image'

export type CategoryItemProps = {
  category: Category
}

export function CategoryItem({ category }: CategoryItemProps) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md ">
      <Image
        src={category.imageUrl}
        alt={category.name}
        width={30}
        height={30}
        className="size-[30px]"
      />
      <span className="text-sm font-semibold">{category.name}</span>
    </div>
  )
}
