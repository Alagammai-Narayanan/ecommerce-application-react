import { useQuery } from "@tanstack/react-query"

import { useEffect, useMemo, useState } from "react"
import { fetchProducts } from "../../api/productsApi"
import { useWishlist } from "../../context/wishlistContext"
import CartHeader from "./CartHeader"
import ProductCard from "./ProductCard"

const ProductPage = () => {
  // const { data, isLoading } = useProducts()
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })

  const [search, setSearch] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const { handleWishlist } = useWishlist()
  const [sort, setSort] = useState("asc")

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 1000)

    return () => clearTimeout(timer)
  }, [search])

  const filteredProducts = useMemo(() => {
    if (!data) return []

    let result = data.filter((item) =>
      item.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
    )

    if (sort === "asc") {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sort === "desc") {
      result = [...result].sort((a, b) => b.price - a.price)
    }

    return result
  }, [data, debouncedSearch, sort])

  // const { cart } = useCart()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading products</p>

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value)
    const currVal = e.target.value
    setSort(currVal)
  }

  //setSuggestions
  const suggestions =
    data.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    ) ?? []

  return (
    <>
      <div className="text-center my-4 relative">
        <input
          type="text"
          placeholder="Search products..."
          onChange={handleSearch}
          className="border border-[#ccc] h-10 p-2 rounded-md dark:text-white dark:placeholder:text-white placeholder:text-black"
          value={search}
        />
        {search.length > 0 && suggestions.length > 0 && (
          <ul className="absolute bg-gray-600 p-3 rounded-md top-[50px] right-0 left-0 max-w-lg mx-auto">
            {suggestions.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        )}
        {suggestions.length === 0 && <p>No product found</p>}
      </div>
      <CartHeader handleSelect={handleSelect} />
      <div className="card flex gap-3 flex-wrap">
        {filteredProducts?.map((x) => (
          <ProductCard key={x.id} prod={x} handleWishlist={handleWishlist} />
        ))}
      </div>
    </>
  )
}

export default ProductPage
