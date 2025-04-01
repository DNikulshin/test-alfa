import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IProduct } from "../types/types";
import { mockProducts } from "../shared/mock-data";

interface IStoreState {
  products: IProduct[];
  filteredProducts: IProduct[];
  getProducts: () => void;
  removeProductById: (id: number) => void;
  updateProduct: (product: IProduct) => void;
  createProduct: (product: IProduct) => void;
  findByFeldsProducts: (search: string) => void;
}

export const useStore = create<IStoreState>()(
  persist(
    (set, get) => ({
      products: [],
      filteredProducts: [],
      getProducts: () => {
        const storedProducts = get().products;

        if (storedProducts && storedProducts.length > 0) {
          set({ products: storedProducts, filteredProducts: storedProducts });
        } else {
          set({ products: mockProducts, filteredProducts: mockProducts });
        }
      },
      removeProductById: (id: number) => {
        set((state) => {
          const newProducts = state.products.filter((p) => p.id !== id);
          return { products: newProducts, filteredProducts: newProducts };
        });
      },
      updateProduct: (updatedProduct: IProduct) => {
        set((state) => {
          const newProducts = state.products.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          );
          return { products: newProducts, filteredProducts: newProducts };
        });
      },
      createProduct: (newProduct: IProduct) => {
        set((state) => {
          const newProducts = [newProduct, ...state.products];
          return { products: newProducts, filteredProducts: newProducts };
        });
      },
      findByFeldsProducts: (search: string) => {
        const storedProducts = get().products;
        set((state) => {
          if (!search) {
            return { filteredProducts: storedProducts };
          }

          const filteredProducts = state.products.filter((product) => {
            return (
              product.title.toLowerCase().includes(search.toLowerCase()) ||
              (product.description &&
                product.description
                  .toLowerCase()
                  .includes(search.toLowerCase())) ||
              (product.category &&
                product.category
                  .toLowerCase()
                  .includes(search.toLowerCase())) ||
              (product.price &&
                product.price.toLowerCase().includes(search.toLowerCase()))
            );
          });

          return { filteredProducts };
        });
      },
    }),

    {
      name: "product-storage",
    }
  )
);
