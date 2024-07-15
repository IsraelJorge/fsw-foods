import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { ComponentProps } from 'react'

const containerVariants = cva('mx-auto px-5', {
  variants: {
    size: {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
    },
  },
  defaultVariants: {
    size: 'xl',
  },
})

export type ContainerProps = ComponentProps<'div'> &
  VariantProps<typeof containerVariants> & {
    as?: 'div' | 'section' | 'aside' | 'footer' | 'header' | 'main'
  }

export function Container({
  as: Element = 'div',
  size,
  className,
  ...props
}: ContainerProps) {
  return (
    <Element
      className={cn(containerVariants({ size, className }))}
      {...props}
    />
  )
}
