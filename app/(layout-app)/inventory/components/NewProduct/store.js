import { create } from 'zustand'

const useProductFormStore = create((set) => ({
  name: null,
  barcode: null,
  image: null,
  cost_price: null,
  net_price: null,
  category_id: null,
  stock_type_id: null,
  stock: null,
  stock_min: null,
  setName: (value) => set({ name: value }),
  setBarcode: (value) => set({ barcode: value }),
  setImage: (value) => set({ image: value }),
  setCostPrice: (value) => set({ cost_price: value }),
  setNetPrice: (value) => set({ net_price: value }),
  setCategoryId: (value) => set({ category_id: value }),
  setStockTypeId: (value) => set({ stock_type_id: value }),
  setStock: (value) => set({ stock: value }),
  setStockMin: (value) => set({ stock_min: value }),
  clearStore: () => set({
    name: null,
    barcode: null,
    image: null,
    cost_price: null,
    net_price: null,
    category_id: null,
    stock_type_id: null,
    stock: null,
    stock_min: null
  })
}))

export default useProductFormStore
