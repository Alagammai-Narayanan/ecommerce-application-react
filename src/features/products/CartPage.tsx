import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  decCartQty,
  incCartQty,
  removeFromCart,
  updateCartQty,
} from "../../store/cartSlice"
import type { RootState } from "../../store/store"
import type { cartItem } from "../../types/productType"

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart)
  console.log("cartItems is;", cartItems)
  const navigate = useNavigate()
  const [totalPrice, setTotalPrice] = useState(0)

  const dispatch = useDispatch()

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id))
  }

  const handleBackFn = () => {
    navigate("/products")
  }

  useEffect(() => {
    setTotalPrice(
      cartItems.reduce((prev, curr) => prev + curr.price * curr.qty, 0),
    )
  }, [cartItems])

  const handleCheckout = () => {
    navigate("/checkout-page")
  }

  return (
    <>
      <h1 className="font-semibold text-lg underline my-4 text-center">
        Cart Items
      </h1>
      {cartItems.map((item: cartItem, index: string | number) => (
        <div className="flex gap-4" key={`${item.id}-${index}`}>
          <div>
            <img src={item.image} alt={item.title} width={100} height={100} />
          </div>
          <div className="w-[50%]">
            <h2>
              <b>{item.title}</b>
            </h2>
            <p className="mb-2 line-clamp-2">{item.description}</p>
            <p className="text-yellow-200">{item.price * item.qty}</p>
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() =>
                dispatch(decCartQty({ id: item.id, qty: Number(item.qty) }))
              }
              className="text-xl bg-gray-600 p-2 rounded-md"
            >
              -
            </button>
            <input
              type="number"
              className="bg-gray-600 p-2 border border-[#ccc]"
              onChange={(e) =>
                dispatch(
                  updateCartQty({ id: item.id, qty: Number(e.target.value) }),
                )
              }
              value={item.qty || 1}
            />

            <button
              onClick={() =>
                dispatch(incCartQty({ id: item.id, qty: Number(item.qty) }))
              }
              className="text-xl bg-gray-600 p-2 rounded-md"
            >
              +
            </button>
          </div>
          <div>
            <button
              onClick={() => handleRemove(item.id)}
              className="bg-red-900 p-2 rounded-[5px] cursor-pointer"
            >
              Remove From Cart
            </button>
          </div>
        </div>
      ))}
      <p>
        <b>
          Total Price:
          <span className="text-yellow-300">{totalPrice.toFixed(2)}</span>
        </b>
      </p>
      <button
        onClick={handleBackFn}
        className="ms-3 text-center bg-purple-950 p-2 rounded-[5px] cursor-pointer mx-auto my-4"
      >
        Add More products
      </button>
      {cartItems.length !== 0 && (
        <div className="my-4 text-center">
          <button
            onClick={handleCheckout}
            className="ms-3 text-center bg-blue-600 p-2 rounded-[5px] cursor-pointer mx-auto my-4"
          >
            Proceed to Checkout
          </button>
        </div>
      )}

      {cartItems.length === 0 && (
        <div className="text-center">
          <p className="text-center">No Items found on cart</p>
          <button
            onClick={handleBackFn}
            className="text-center bg-red-900 p-2 rounded-[5px] cursor-pointer mx-auto my-4"
          >
            Back to products
          </button>
        </div>
      )}
    </>
  )
}

export default CartPage
