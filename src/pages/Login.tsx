import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

interface FormError {
  email?: string
  password?: string | number
}
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState<FormError | null>(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const validateFn = () => {
    const newError: FormError = {}
    if (!formData.email) {
      newError.email = "name is email"
    } else if (!formData.email.includes("@")) {
      newError.email = "email must have @ symbol"
    }
    if (!formData.password) {
      newError.password = "password is required"
    } else if (formData.password.length <= 6) {
      newError.password = "password length must be more than 6 characters"
    }
    setError(newError)

    return Object.keys(newError).length === 0
  }
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateFn()) return

    const userData = {
      ...formData,
      role: "admin",
    }

    login(userData)
    navigate("/products")
  }

  return (
    <>
      <h1 className="text-xl font-bold text-blue-900 my-4">Login Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            name="email"
            aria-required="true"
            onChange={handleChange}
            className="border border-[#ccc] p-2 h-10 my-3"
          />
          {error?.email && <p>{error?.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter Password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            className="border border-[#ccc] p-2 h-10 my-3"
          />
          {error?.password && <p>{error?.password}</p>}
        </div>
        <div>
          <button
            type="submit"
            aria-label="Login button"
            className="bg-orange-400 p-3 rounded-md my-4 cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    </>
  )
}

export default Login
