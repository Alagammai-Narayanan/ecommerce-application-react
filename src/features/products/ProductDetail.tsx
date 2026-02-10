import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useToast } from "../../context/ToastContext"
import useProducts from "../../hooks/useProducts"
import { addToCart } from "../../store/cartSlice"
import type { ProductType } from "../../types/productType"
import CartHeader from "./CartHeader"

const ProductDetail = () => {
  const { id } = useParams()
  const { data, isLoading } = useProducts()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const cartItems = useSelector((state) => state.cart)

  const { showToast } = useToast()

  const product = data.find((item) => String(item.id) === id)
  if (isLoading) {
    return <p>Loading...</p>
  }
  if (!product) {
    return <p>Product not found!</p>
  }
  const handleCart = (prod: ProductType) => {
    const isProdExist = cartItems.some((x) => x.id === prod.id)
    if (isProdExist) {
      showToast("Already added to cart", "red")
    } else {
      dispatch(addToCart(prod))
      showToast("Added to cart successfully", "green")
    }
  }
  const handleBackFn = () => {
    navigate("/products")
  }

  return (
    <>
      <CartHeader />
      <h1>Detail Page</h1>
      <h3>{product.title}</h3>
      <h3>{product.price}</h3>
      <div style={{ width: 300 }}>
        <img src={product.image} alt={product.title} />
        {/* <ReactImageMagnify
          smallImage={{
            alt: product.title,
            isFluidWidth: true,
            src: product.image,
          }}
          largeImage={{
            src: product.image,
            width: 1200,
            height: 1800,
          }}
        /> */}
      </div>
      <button
        onClick={() => handleCart(product)}
        className="p-2 mt-2 bg-amber-700 rounded-md cursor-pointer"
      >
        Add to cart
      </button>
      <button
        onClick={handleBackFn}
        className="ms-3 text-center bg-red-900 p-2 rounded-[5px] cursor-pointer mx-auto my-4"
      >
        Back to products
      </button>
    </>
  )
}

export default ProductDetail
