import { Icon } from './icon';
import { Button } from './ui/button';
import { Input } from './ui/input';

export type SearchProps = {};

export function Search({}: SearchProps) {
  return (
    <div className="flex gap-4">
      <Input placeholder="Buscar restaurantes" className="border-none" />
      <Button size="icon" variant="destructive">
        <Icon name="SearchIcon" size={20} />
      </Button>
    </div>
  );
}
