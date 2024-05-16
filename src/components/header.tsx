import { Image } from './image'
import Link from 'next/link'
import { SlideMenu } from './slide-menu'

export function Header() {
  return (
    <header className="flex justify-between px-5 pt-6">
      <Link href="/">
        <Image
          src="/images/logo.svg"
          alt="FSW Foods"
          width={100}
          height={30}
          className="h-[30px] w-[100px]"
        />
      </Link>
      <SlideMenu />
    </header>
  )
}
