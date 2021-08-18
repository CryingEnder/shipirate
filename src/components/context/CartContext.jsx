import React, { useState, createContext } from "react";

export const CartContext = createContext();
CartContext.displayName = "CartContext";

export function CartProvider({ children }) {
  const [total, setTotal] = useState(0);

  return (
    <CartContext.Provider value={{ total, setTotal }}>
      {children}
    </CartContext.Provider>
  );
}
