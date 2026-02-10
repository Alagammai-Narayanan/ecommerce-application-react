import { Heart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useWishlist } from "../../context/wishlistContext"
import type { ProductType } from "../../types/productType"

interface ProductCardProps {
  prod: ProductType
  handleWishlist: (product: ProductType) => void
  wishlist?: ProductType[]
}
const ProductCard = ({ prod, handleWishlist }: ProductCardProps) => {
  // const { addToCart } = useCart()
  const navigate = useNavigate()

  const { wishlist } = useWishlist()

  const handleProductDetail = (id) => {
    navigate(`/ProductDetail/${id}`)
  }

  const isWishlisted = wishlist.some((item) => item.id == prod.id)

  return (
    <div className="card-item flex-[0_0_30%] text-center p-3 bg-gray-50 dark:bg-gray-800">
      <div className="flex justify-end">
        {isWishlisted ? (
          <Heart
            className="text-end fill-red-500 text-red-500"
            onClick={() => handleWishlist(prod)}
          />
        ) : (
          <Heart className="text-end" onClick={() => handleWishlist(prod)} />
        )}
      </div>
      <h2>{prod.title}</h2>
      <img src={prod.image} alt={prod.title} className="w-40 mx-auto" />
      <p className="line-clamp-2">{prod.description}</p>
      <p>{prod.price}</p>

      <button
        onClick={() => handleProductDetail(prod.id)}
        className="ms-3 p-2 mt-2 bg-blue-500 rounded-md cursor-pointer"
      >
        View Product
      </button>
    </div>
  )
}

export default ProductCard
