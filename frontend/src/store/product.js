import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "please fill in all fields." };
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const resJSON = await res.json();
    set((state) => ({ products: [...state.products, resJSON.data] }));
    return { success: true, message: "product created successfully" };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const resJSON = await res.json();
    set({ products: resJSON.data });
  },
  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    const resJSON = await res.json();
    if (!resJSON.success) return { success: false, message: resJSON.message };
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    }));
    return { success: true, message: resJSON.message };
  },
  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const resJSON = await res.json();
    if (!resJSON.success) return { success: false, message: resJSON.message };

    set((state) => ({
      products: state.products.map((product) =>
        product._id === id ? resJSON.data : product
      ),
    }));
    return { success: true, message: resJSON.message };
  },
}));
