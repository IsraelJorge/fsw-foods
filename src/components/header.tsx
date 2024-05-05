import Image from 'next/image';
import { Button } from './ui/button';
import { Icon } from './icon';

export type HeaderProps = {};

export function Header({}: HeaderProps) {
  return (
    <header className="flex justify-between px-5 pt-6">
      <Image src="/images/logo.svg" alt="FSW Foods" width={100} height={30} />
      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <Icon name="MenuIcon" />
      </Button>
    </header>
  );
}
