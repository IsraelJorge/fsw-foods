import { ComponentProps } from 'react'
import { Badge } from './ui/badge'
import { Icon } from './icon'
import { cn } from '@/lib/utils'

export type BadgeStarProps = ComponentProps<typeof Badge> & {
  label: string | number
}

export function BadgeStar({ className, label, ...props }: BadgeStarProps) {
  return (
    <Badge className={cn(className)} {...props}>
      <Icon
        name="StarIcon"
        size={12}
        className="fill-yellow-400 text-yellow-400"
      />
      <span className="text-semibold text-xs">{label}%</span>
    </Badge>
  )
}
