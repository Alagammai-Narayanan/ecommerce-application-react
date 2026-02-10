import { useEffect, useState } from "react"
import type { ProductType } from "../types/productType"

const useProducts = () => {
  const [data, setData] = useState<ProductType[]>([])
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products")
        const result = await response.json()
        setData(result)
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong",
        )
      } finally {
        setIsLoading(false)
      }
    }
    getProducts()
  }, [])

  return { data, isLoading, error }
}

export default useProducts
