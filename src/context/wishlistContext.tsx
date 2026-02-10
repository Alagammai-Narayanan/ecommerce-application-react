import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
} from "react"
import type { ProductType } from "../types/productType"

interface WishlistType {
  handleWishlist: (product: ProductType) => void
  wishlist: ProductType[]
  setWishlist: Dispatch<React.SetStateAction<ProductType[]>>
}

export const WishlistContext = createContext<WishlistType | undefined>(
  undefined,
)

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [wishlist, setWishlist] = useState<ProductType[]>(() => {
    const stored = localStorage.getItem("wishlistkey")
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem("wishlistkey", JSON.stringify(wishlist))
    console.log("wishlist is:", wishlist)
  }, [wishlist])

  const handleWishlist = (product: ProductType) => {
    setWishlist((prev: ProductType[]) =>
      prev.some((item: ProductType) => item.id === product.id)
        ? prev.filter((item: ProductType) => item.id !== product.id)
        : [...prev, product],
    )
  }
  return (
    <>
      <WishlistContext.Provider
        value={{ handleWishlist, wishlist, setWishlist }}
      >
        {children}
      </WishlistContext.Provider>
    </>
  )
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error("useWishist should inside whishlist context")
  return ctx
}
