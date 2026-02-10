import { useNavigate } from "react-router-dom"
import { useWishlist } from "../../context/wishlistContext"

const Wishlist = () => {
  const { wishlist, setWishlist } = useWishlist()

  const navigate = useNavigate()

  const removeWishlist = (id: number | string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id))
  }

  const goToProducts = () => {
    navigate("/products")
  }

  return (
    <>
      <h1 className="text-xl font-bold my-4 underline text-center">
        Wishlisted Items
      </h1>
      <ul className="flex items-center gap-4 h-full p-4 flex-wrap">
        {wishlist.map((item) => (
          <li
            className="bg-gray-800 p-3 rounded-md border border-[#ccc] flex-[0_0_30%] flex-wrap h-full"
            key={item.id}
          >
            <h2 className="font-bold mb-3">{item.title}</h2>
            <p className="line-clamp-2">{item.description}</p>
            <button
              className="bg-violet-600 p-3 rounded-md my-4 font-bold text-center"
              onClick={() => removeWishlist(item.id)}
            >
              Remove from wishlist
            </button>
          </li>
        ))}
        {wishlist.length === 0 && (
          <p className="text-center bg-gray-800 p-2 font-semibold mx-auto">
            No Items found
          </p>
        )}
      </ul>
      <div className="text-center my-4">
        <button
          onClick={goToProducts}
          className="text-center bg-amber-700 p-2 rounded-md cursor-pointer"
        >
          go back to products
        </button>
      </div>
    </>
  )
}

export default Wishlist
