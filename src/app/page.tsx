import { Header } from '@/components/header';
import { Search } from '@/components/search';

export default function Home() {
  return (
    <div>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
    </div>
  );
}
