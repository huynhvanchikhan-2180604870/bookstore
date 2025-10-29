import { useContext } from "react";
import { useAuth as useAuthContext } from "@/src/contexts/AuthContext";

export const useAuth = () => {
  return useAuthContext();
};
