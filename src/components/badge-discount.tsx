import { ComponentProps } from 'react'
import { Badge } from './ui/badge'
import { Icon } from './icon'
import { cn } from '@/lib/utils'

export type BadgeDiscountProps = ComponentProps<'div'> & {
  label: string | number
}

export function BadgeDiscount({
  className,
  label,
  ...props
}: BadgeDiscountProps) {
  return (
    <Badge className={cn(className)} {...props}>
      <Icon name="ArrowDownIcon" size={12} />
      <span className="text-semibold text-xs">{label}%</span>
    </Badge>
  )
}
