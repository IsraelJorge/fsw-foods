import { CategoryList } from '@/components/category-list';
import { Header } from '@/components/header';
import { Search } from '@/components/search';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Image
          src="/images/promo-banner-01.svg"
          alt="Até 30% de desconto em pizzas!"
          width={0}
          height={0}
          className="h-auto w-full"
          sizes="100vw"
          quality={100}
        />
      </div>
    </div>
  );
}
