import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  bookId: string;
  title: string;
  price: number;
  quantity: number;
  coverImage: string;
}

interface User {
  id: string;
  _id?: string;
  email: string;
  name: string;
  role: string;
}

interface StoreState {
  user: User | null;
  token: string | null;
  cart: CartItem[];
  wishlist: string[];
  setUser: (user: User | null, token: string | null) => void;
  logout: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (bookId: string) => void;
  removeFromWishlist: (bookId: string) => void;
  getTotalAmount: () => number;
  getTotalItems: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      cart: [],
      wishlist: [],

      setUser: (user, token) => set({ user, token }),
      
      logout: () => set({ user: null, token: null, cart: [], wishlist: [] }),

      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((i) => i.bookId === item.bookId);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.bookId === item.bookId ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }
          return { cart: [...state.cart, item] };
        }),

      removeFromCart: (bookId) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.bookId !== bookId),
        })),

      updateQuantity: (bookId, quantity) =>
        set((state) => ({
          cart: state.cart.map((i) => (i.bookId === bookId ? { ...i, quantity } : i)),
        })),

      clearCart: () => set({ cart: [] }),

      addToWishlist: (bookId) =>
        set((state) => {
          if (state.wishlist.includes(bookId)) {
            return { wishlist: state.wishlist.filter((id) => id !== bookId) };
          }
          return { wishlist: [...state.wishlist, bookId] };
        }),

      removeFromWishlist: (bookId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((id) => id !== bookId),
        })),

      getTotalAmount: () => {
        const state = get();
        return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getTotalItems: () => {
        const state = get();
        return state.cart.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: "bookstore-storage",
      skipHydration: false,
    }
  )
);
