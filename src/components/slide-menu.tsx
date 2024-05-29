'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Button } from './ui/button'
import { Icon, IconName } from './icon'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { signIn, signOut } from 'next-auth/react'
import { Separator } from './ui/separator'
import { Permission, hasPermission } from '@/data/Permissions'
import { useAuth } from '@/data/hooks/useAuth'
import Link from 'next/link'
import { Routes } from '@/utils/ui/Routes'

const SlideItems: SlideItemProps[] = [
  {
    label: 'Inicio',
    icon: 'HomeIcon',
    href: Routes.home,
    permissions: [Permission.Authenticated, Permission.Unauthenticated],
  },
  {
    label: 'Meus Pedidos',
    icon: 'ScrollTextIcon',
    href: Routes.myOrders,
    permissions: [Permission.Authenticated],
  },
  {
    label: 'Restaurantes Favoritos',
    icon: 'HeartIcon',
    href: Routes.myFavoriteRestaurants,
    permissions: [Permission.Authenticated],
  },
]

// const SlideCategoryItems: SlideItemProps[] = [
//   {
//     label: 'Promoções',
//     icon: 'GiftIcon',
//     permissions: [Permission.Authenticated, Permission.Unauthenticated],
//   },
//   {
//     label: 'Bebidas',
//     icon: 'WineIcon',
//     permissions: [Permission.Authenticated, Permission.Unauthenticated],
//   },
//   {
//     label: 'Sobremesas',
//     icon: 'IceCreamIcon',
//     permissions: [Permission.Authenticated, Permission.Unauthenticated],
//   },
// ]

export function SlideMenu() {
  const { data } = useAuth()

  const handleSignIn = () => signIn()
  const handleSignOut = () => signOut()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="border-none bg-transparent"
        >
          <Icon name="MenuIcon" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="mb-6 flex flex-row items-center justify-between">
          <SheetTitle>Menu</SheetTitle>
          <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <Icon name="X" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>

        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image as string} />
              <AvatarFallback>
                {data?.user?.name?.split(' ')[0][0]}
                {data?.user?.name?.split(' ')[1][0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-semibold">Olá, {data?.user?.name}</h4>
              <p className="text-xs text-muted-foreground">
                {data?.user?.email}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Olá, faça seu login!</h4>
            <Button size="icon" onClick={handleSignIn}>
              <Icon name="LogInIcon" size={20} />
              <span className="sr-only">Login</span>
            </Button>
          </div>
        )}

        <div className="flex-auto">
          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-3">
            {SlideItems.map((item) => (
              <SlideItem key={item.label} {...item} />
            ))}
          </div>

          <div className="py-6">
            <Separator />
          </div>
        </div>

        {data?.user && (
          <SheetFooter>
            <Button
              variant="ghost"
              className="justify-start gap-3 text-muted-foreground"
              onClick={handleSignOut}
            >
              <Icon name="LogOutIcon" size={16} />
              <span>Sair da conta</span>
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

type SlideItemProps = {
  label: string
  icon: IconName
  permissions: Permission[]
  href: string
}

const SlideItem = ({ label, icon, permissions, href }: SlideItemProps) => {
  const { status } = useAuth()

  if (!hasPermission(status, permissions)) return null

  return (
    <Button
      className="w-full justify-start gap-3 rounded-full font-normal"
      asChild
    >
      <Link href={href}>
        <Icon name={icon} size={16} />
        <span>{label}</span>
      </Link>
    </Button>
  )
}
