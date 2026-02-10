import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../../context/ThemeContext"

const CartHeader = ({ handleSelect }) => {
  const cartItems = useSelector((state) => state.cart)

  const navigate = useNavigate()

  const handleCartPage = () => {
    navigate("/cart-page")
  }

  const handleWishlistItem = () => {
    navigate("/wishlist")
  }

  const { theme, switchTheme } = useTheme()

  return (
    <>
      <div className="text-left">
        <p>
          <b>Sorting:</b>
        </p>
        <div>
          <select onChange={handleSelect}>
            <option value="asc" className="text-black">
              Sort by Asc
            </option>
            <option value="desc" className="text-black">
              Sort by Desc
            </option>
          </select>
        </div>
      </div>
      <div className="flex gap-3 items-center justify-end">
        <p className="text-right m-3 cursor-pointer" onClick={handleCartPage}>
          <b>
            Cart: <sup>{cartItems.length}</sup>
          </b>
        </p>

        <button
          onClick={switchTheme}
          className="cursor-pointer pe-3 bg-blue-950 p-2 rounded-md text-white me-3"
        >
          Switch theme to {theme === "light" ? "dark" : "light"}
        </button>
        <button
          onClick={handleWishlistItem}
          className="cursor-pointer pe-3 bg-orange-400 p-2 rounded-md text-white me-3"
        >
          Go to Wishlist
        </button>
      </div>
    </>
  )
}

export default CartHeader
