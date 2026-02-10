import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface FormError {
  username?: string
  email?: string
  password?: string
}
const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const navigate = useNavigate()
  const [error, setError] = useState<FormError | null>(null)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const validateFn = () => {
    const newError: FormError = {}
    if (!formData.username) {
      newError.username = "name is required"
    }
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
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    if (validateFn()) {
      console.log("form submitted successfully")
      navigate("/login")
    }
  }

  return (
    <>
      <h1 className="text-xl font-bold text-blue-900 my-4">Register Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Username</label>
          <input
            id=""
            type="text"
            placeholder="Enter username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            className="border border-[#ccc] p-2 h-10 my-3"
          />
          {error?.username && <p>{error?.username}</p>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            className="border border-[#ccc] p-2 h-10 my-3"
          />
          {error?.email && <p>{error?.email}</p>}
        </div>
        <div>
          <label>Password</label>
          <input
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
            aria-label="Register button"
            className="bg-orange-400 p-3 rounded-md my-4 cursor-pointer"
          >
            Register
          </button>
        </div>
      </form>
    </>
  )
}

export default Register
