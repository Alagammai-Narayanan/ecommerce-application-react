import { createContext, useContext, useState } from "react"
import type { ProductType } from "../types/productType"
import { useToast } from "./ToastContext"

interface cartType {
  addToCart: (product: ProductType) => void
  cart: ProductType[]
}

export const CartContext = createContext<cartType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<ProductType[]>([])
  const { showToast } = useToast()

  const addToCart = (product: ProductType) => {
    setCart((c) => [...c, product])
    showToast("Added to cart successfully")
  }
  return <CartContext value={{ cart, addToCart }}>{children}</CartContext>
}

export const useCart = () => useContext(CartContext)
