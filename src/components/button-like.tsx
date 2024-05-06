import { ComponentProps } from 'react'
import { Icon } from './icon'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

export type ButtonLikeProps = ComponentProps<typeof Button> & {
  sizeIcon?: 'sm' | 'md' | 'lg'
}

const sizeIconMap = {
  sm: 16,
  md: 20,
  lg: 24,
}

export function ButtonLike({
  className,
  sizeIcon = 'sm',
  ...props
}: ButtonLikeProps) {
  return (
    <Button
      className={cn('rounded-full bg-muted-foreground/80 p-0', className)}
      {...props}
    >
      <Icon
        name="HeartIcon"
        size={sizeIconMap[sizeIcon]}
        className="fill-white"
      />
    </Button>
  )
}
