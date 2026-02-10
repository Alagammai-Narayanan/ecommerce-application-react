import { useState } from "react"
import { useToast } from "../context/ToastContext"

interface FormDataType {
  email: string
  password: string
}

const EditProfile = () => {
  const [formData, setFormData] = useState<FormDataType>(() => {
    const stored = localStorage.getItem("user")
    return stored ? JSON.parse(stored) : {}
  })

  const { showToast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("formData is:", formData)
    localStorage.setItem("user", JSON.stringify(formData))
    showToast("Profile updated successfully", "blue")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  return (
    <>
      <h1 className="text-semibold my-4 text-center text-white text-lg">
        EditProfile
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            name="email"
            className="border border-[#ccc] h-10 p-2"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            value={formData.password}
            name="password"
            className="border border-[#ccc] h-10 p-2"
            onChange={handleChange}
          />
        </div>
        <div className="my-4">
          <button className="p-2 bg-green-800 text-white rounded-md">
            Update
          </button>
        </div>
      </form>
    </>
  )
}

export default EditProfile
