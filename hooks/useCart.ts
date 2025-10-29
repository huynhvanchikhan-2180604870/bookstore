import { useContext } from "react";
import { useCart as useCartContext } from "@/src/contexts/CartContext";

export const useCart = () => {
  return useCartContext();
};
