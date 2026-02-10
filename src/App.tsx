import "./App.css"

import { CircleUser } from "lucide-react"
import { lazy, Suspense, useEffect, useState } from "react"
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom"
import EditProfile from "./components/EditProfile"
import ErrorBoundary from "./components/ErrorBoundary"
import NotFound from "./components/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import Virtualization from "./components/Virtualization"
import { useAuth } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import { ThemeProvider } from "./context/ThemeContext"
import { ToastProvider } from "./context/ToastContext"
import { WishlistProvider } from "./context/wishlistContext"
import CheckoutPage from "./features/products/CheckoutPage"
import ProductPage from "./features/products/ProductPage"
import Wishlist from "./features/products/Wishlist"
import Login from "./pages/Login"
import Register from "./pages/Register"

const ProductDetail = lazy(() => import("./features/products/ProductDetail"))
const CartPage = lazy(() => import("./features/products/CartPage"))

const App = () => {
  const [profile] = useState(() => {
    const stored = localStorage.getItem("user")
    return stored ? JSON.parse(stored) : ""
  })
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { logout, user } = useAuth()

  const handleProfile = () => {
    setOpen((prev) => !prev)
  }

  const handleEditProfile = () => {
    navigate("/edit-profile")
  }
  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  useEffect(() => {
    if (location.pathname === "/") {
      document.title = "products"
    } else if (location.pathname === "/wishlist") {
      document.title = "Wishlist"
    } else if (location.pathname === "/products") {
      document.title = "Products"
    } else {
      document.title = "My Website"
    }
  }, [location.pathname])

  return (
    <>
      <ThemeProvider>
        <ToastProvider>
          <WishlistProvider>
            <CartProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <header className="text-end p-4">
                  <nav className="text-end ">
                    <div className="flex items-center gap-3 justify-end relative">
                      Welcome,{" "}
                      <b className="text-amber-500">{profile.email} </b>
                      <span className="cursor-pointer" onClick={handleProfile}>
                        <CircleUser />
                      </span>
                      {open && (
                        <div className="absolute top-[50px] right-0  bg-amber-100 p-3 rounded-md text-left z-10">
                          <button
                            onClick={handleEditProfile}
                            className="  text-black cursor-pointer font-semibold block"
                          >
                            Edit Profile
                          </button>
                          <button
                            onClick={handleLogout}
                            className=" text-black cursor-pointer font-semibold block"
                          >
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </nav>
                </header>

                <Routes>
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  <Route path="/virtualization" element={<Virtualization />} />
                  <Route path="/register" element={<Register />} />

                  <Route
                    path="/login"
                    element={
                      user ? <Navigate to="/products" replace /> : <Login />
                    }
                  />

                  <Route
                    path="/products"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <ProductPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ProductDetail/:id"
                    element={<ProductDetail />}
                  />
                  <Route path="*" element={<NotFound />} />
                  {/* <Route path="/file-explorer" element={<FileExplorer />} /> */}
                  <Route path="/checkout-page" element={<CheckoutPage />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/edit-profile" element={<EditProfile />} />

                  <Route
                    path="/cart-page"
                    element={
                      <ErrorBoundary>
                        <CartPage />
                      </ErrorBoundary>
                    }
                  />
                </Routes>
              </Suspense>
            </CartProvider>
          </WishlistProvider>
        </ToastProvider>
      </ThemeProvider>
    </>
  )
}

export default App
