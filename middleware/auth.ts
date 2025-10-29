import { NextRequest } from "next/server";
import { verifyToken } from "@/src/lib/auth";

export const authenticate = (req: NextRequest) => {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return null;
  }

  return verifyToken(token);
};

export const requireAuth = (req: NextRequest) => {
  const user = authenticate(req);
  
  if (!user) {
    throw new Error("Unauthorized");
  }
  
  return user;
};

export const requireAdmin = (req: NextRequest) => {
  const user = requireAuth(req);
  
  // Additional admin check would go here
  return user;
};
