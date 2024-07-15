import Image from 'next/image'
import { Container } from './layouts/container'
import { Search } from './search'

export function BannerHome() {
  return (
    <div className="hidden h-[31.25rem] items-center overflow-hidden bg-primary text-white md:flex">
      <Container className="relative flex h-full w-full">
        <div className="flex flex-col justify-center">
          <h2 className="text-5xl font-bold">Está com fome?</h2>
          <p className="text-lg">
            Com apenas alguns cliques, encontre refeições acessíveis perto de
            você.
          </p>

          <div className="mt-8 rounded-md bg-white p-6">
            <Search />
          </div>
        </div>

        <div className="absolute bottom-0 right-0">
          <Image
            src="/images/banner-home.svg"
            width={371}
            height={371}
            alt="Banner Home"
          />
        </div>
      </Container>
    </div>
  )
}
