'use client'

import { calculateProductTotalPrice } from '@/helpers/price'
import { Prisma } from '@prisma/client'
import { createContext, useContext, useMemo, useState } from 'react'

export type CardProduct = Prisma.ProductGetPayload<{
  include: {
    restaurant: {
      select: {
        id: true
        deliveryFee: true
        deliveryTimeMinutes: true
      }
    }
  }
}> & {
  quantity: number
}

type CartContext = {
  products: CardProduct[]
  subtotalPrice: number
  totalPrice: number
  totalDiscounts: number
  totalQuantity: number
  addProductToCart: ({
    newProduct,
    emptyCart,
  }: {
    newProduct: CardProduct
    emptyCart?: boolean
  }) => void
  increaseProductQuantity: (productId: string) => void
  decreaseProductQuantity: (productId: string) => void
  removeProductFromCart: (productId: string) => void
  clearCart: () => void
}

type CartProviderProps = {
  children: JSX.Element
}

const CartContext = createContext<CartContext>({
  products: [],
  subtotalPrice: 0,
  totalPrice: 0,
  totalDiscounts: 0,
  totalQuantity: 0,
  addProductToCart: () => {},
  increaseProductQuantity: () => {},
  decreaseProductQuantity: () => {},
  removeProductFromCart: () => {},
  clearCart: () => {},
})

export function CartProvider({ children }: CartProviderProps) {
  const [products, setProducts] = useState<CardProduct[]>([])

  const subtotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity
    }, 0)
  }, [products])

  const totalPrice = useMemo(() => {
    return (
      products.reduce((acc, product) => {
        return acc + calculateProductTotalPrice(product) * product.quantity
      }, 0) + Number(products[0]?.restaurant.deliveryFee)
    )
  }, [products])

  const totalQuantity = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.quantity
    }, 0)
  }, [products])

  const totalDiscounts =
    subtotalPrice - (totalPrice - Number(products[0]?.restaurant.deliveryFee))

  const increaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((productCart) => {
        if (productCart.id === productId) {
          return {
            ...productCart,
            quantity: (productCart.quantity += 1),
          }
        }
        return productCart
      })
    })
  }

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((productCart) => {
        if (productCart.id === productId) {
          return {
            ...productCart,
            quantity: (productCart.quantity -= 1),
          }
        }
        return productCart
      })
    })
  }

  const addProductToCart = ({
    newProduct,
    emptyCart,
  }: {
    newProduct: CardProduct
    emptyCart?: boolean
  }) => {
    if (emptyCart) {
      setProducts([])
    }

    const isProductAlreadyOnCart = products.some(
      (productCart) => productCart.id === newProduct.id,
    )

    if (isProductAlreadyOnCart) {
      return setProducts((prevProducts) => {
        return prevProducts.map((product) => {
          if (product.id === newProduct.id) {
            return {
              ...product,
              quantity: (product.quantity += newProduct.quantity),
            }
          }

          return product
        })
      })
    }

    setProducts((prevProducts) => [...prevProducts, newProduct])
  }

  const removeProductFromCart = (productId: string) => {
    setProducts((prevState) => {
      return prevState.filter((productCart) => productCart.id !== productId)
    })
  }

  const clearCart = () => {
    setProducts([])
  }

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        increaseProductQuantity,
        decreaseProductQuantity,
        removeProductFromCart,
        subtotalPrice,
        totalPrice,
        totalDiscounts,
        totalQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context)
    throw new Error('useCart should be used inside of a CartProvider')

  return context
}
