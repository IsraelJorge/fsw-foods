import Image, { ImageProps } from 'next/image'

type PromoBannerProps = ImageProps

export function PromoBanner({ alt, ...props }: PromoBannerProps) {
  return (
    <Image
      width={0}
      height={0}
      className="h-auto w-full"
      sizes="100vw"
      quality={100}
      alt={alt}
      {...props}
    />
  )
}
