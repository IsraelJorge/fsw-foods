'use client'

import { Icon } from '@/components/icon'
import { Image } from '@/components/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export type ProductImageProps = {
  src: string
  alt: string
}

export function ProductImage({ src, alt }: ProductImageProps) {
  const router = useRouter()

  const handleBackClick = () => router.back()

  return (
    <div className="relative h-[360px] w-full">
      <Image src={src} alt={alt} fill className="object-cover" />

      <Button
        size="icon"
        className="absolute left-4 top-4 rounded-full bg-white text-foreground hover:text-white"
        onClick={handleBackClick}
      >
        <Icon name="ChevronLeftIcon" />
      </Button>
    </div>
  )
}
