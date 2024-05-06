import { ComponentProps } from 'react'
import { Icon } from './icon'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

export type ButtonLikeProps = ComponentProps<typeof Button>

export function ButtonLike({ className, ...props }: ButtonLikeProps) {
  return (
    <Button
      className={cn(
        'absolute right-2 top-2 size-7 rounded-full bg-muted-foreground/80 p-0',
        className,
      )}
      {...props}
    >
      <Icon name="HeartIcon" size={16} className="fill-white" />
    </Button>
  )
}
