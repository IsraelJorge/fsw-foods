import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { CartProvider } from '@/contexts/cart'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FSW Foods',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: JSX.Element
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
