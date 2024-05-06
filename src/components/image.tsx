import ImageNext, { ImageProps as ImageNextProps } from 'next/image'

export type ImageProps = ImageNextProps

export function Image({ ...props }: ImageProps) {
  return <ImageNext {...props} />
}
