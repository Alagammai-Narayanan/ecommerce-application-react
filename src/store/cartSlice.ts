import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cart")) || [],
  reducers: {
    addToCart: (state, { payload }) => {
      const existingItem = state.find((item) => item.id === payload.id)
      if (existingItem) return
      state.push({ ...payload, qty: 1 })
    },
    removeFromCart: (state, { payload }) => {
      return state.filter((item) => item.id !== payload)
    },

    incCartQty: (state, { payload }) => {
      const itemFound = state.find((item) => item.id === payload.id)
      console.log("prodItem is:", { ...itemFound })
      console.log("payload.qty is:", payload.qty)
      if (itemFound) {
        itemFound.qty += 1
      }
    },
    decCartQty: (state, { payload }) => {
      const itemFound = state.find((item) => item.id === payload.id)
      if (itemFound && itemFound.qty > 1) {
        itemFound.qty -= 1
      }
    },
    updateCartQty: (state, { payload }) => {
      const itemFound = state.find((item) => item.id === payload.id)
      if (itemFound) {
        itemFound.qty = payload.qty
      }
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  incCartQty,
  decCartQty,
  updateCartQty,
} = cartSlice.actions

export default cartSlice
