'use client'

import { ButtonLike } from '@/components/button-like'
import { Icon } from '@/components/icon'
import { Image } from '@/components/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export type RestaurantImageProps = {
  src: string
  alt: string
}

export function RestaurantImage({ src, alt }: RestaurantImageProps) {
  const router = useRouter()

  const handleBackClick = () => router.back()

  return (
    <div className="relative h-[215px] w-full">
      <Image
        src={src}
        alt={alt}
        priority
        fill
        className="h-auto w-auto object-cover"
      />

      <Button
        size="icon"
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        onClick={handleBackClick}
      >
        <Icon name="ChevronLeftIcon" />
      </Button>

      <ButtonLike
        size="icon"
        sizeIcon="md"
        className="absolute right-4 top-4"
      />
    </div>
  )
}
