export interface ProductType {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  qty?: number | undefined
}

export interface cartQty {
  qty: number
}
export type cartItem = ProductType & cartQty
