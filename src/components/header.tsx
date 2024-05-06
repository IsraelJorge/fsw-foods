import { Image } from './image'
import { Button } from './ui/button'
import { Icon } from './icon'

export function Header() {
  return (
    <header className="flex justify-between px-5 pt-6">
      <Image
        src="/images/logo.svg"
        alt="FSW Foods"
        width={100}
        height={30}
        className="h-[30px] w-[100px]"
      />
      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <Icon name="MenuIcon" />
      </Button>
    </header>
  )
}
